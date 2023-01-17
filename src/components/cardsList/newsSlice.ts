import { CardProps } from "../card/card.props";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    news: <CardProps[]>[], // початковий список всіх новин із серверу, які відразу відображаються на сторінці
    newsLoading: false,
    newsError: false,
    filteredNews: <CardProps[] | null>null, // відфільтровані новини відповідно до даних, які ввів користувач
    searchInpValue: '' // дані, які ввів користувач для пошуку 
};

export const fetchNews: any = createAsyncThunk("news/fetchNews", () => {
    const { request } = useHttp();
    return request(`https://api.spaceflightnewsapi.net/v3/articles`);
});

// ф-ія проходить по тайтлу і деску і шукає кусок через індексОф з цими словами і підсвідчує їх. 
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        // не забути про динамічний роутинг 
        news_filterNews: (state, action) => {
            let copyNewsArr = [...state.news]
            let filteredArr: any = []; 

            let str = action.payload
            // забираємо пробіли не тільки на початку і в кінці, але й забираємо зайві пробіли всередині між словами (якщо вони є) 
            let j = str.replace(/\s+/g, ' ').trim()
            console.log(j)

            let inputWordsArr: string[] = j.split(' ')
            
            inputWordsArr.map((wordInInput: any) => {
                // console.log(wordInInput )
                copyNewsArr.map(item => {
                    // приводимо до нижнього регістру 
                    let lowerCasedTitle = item.title.toLowerCase().split(' ')
                    let lowerCasedDesc = item.summary.toLowerCase().split(' ');

                    lowerCasedTitle.map(wordInTitle => {
                        // якщо інпут пустий, показуємо всі новини 
                        if (wordInInput === '') {
                            filteredArr = [...state.news]
                        } // якщо знайдено підрядок в заголовку - додаємо новину на початок масиву і якщо цього об'єкту ще не додано
                        else if (wordInTitle === wordInInput && filteredArr.indexOf(item) === -1) {
                            filteredArr.unshift(item)
                        } 
                    })
                    lowerCasedDesc.map(wordInDesc => {
                        // якщо інпут пустий, показуємо всі новини 
                        if (wordInInput === '') {
                            filteredArr = [...state.news]
                        } // якщо знайдено підрядок в заголовку - додаємо новину на початок масиву і якщо цього об'єкту ще не додано
                        else if (wordInDesc === wordInInput && filteredArr.indexOf(item) === -1) {
                            filteredArr.push(item)
                        } 
                    })
                })
                state.filteredNews = filteredArr;
            })
        },
        news_getSearchInpValue: (state, action) => {
            state.searchInpValue = action.payload
        },
    },
    extraReducers: builder => {
        builder 
            .addCase(fetchNews.pending, state => {
                state.newsLoading = true;
                state.newsError = false;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.news = action.payload;
                state.newsLoading = false;
                state.newsError = false;
            })
            .addCase(fetchNews.rejected, state => {
                state.newsError = true;
                state.newsLoading = false;
            });
        }

});

const { actions, reducer } = newsSlice;

export default reducer;

export const {
    news_filterNews,
    news_getSearchInpValue
} = actions;