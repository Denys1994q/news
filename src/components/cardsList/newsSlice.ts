import { CardProps } from "../card/card.props";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    news: <CardProps[]>[], // початковий список всіх новин із серверу, які відразу відображаються на сторінці
    filteredNews: <CardProps[] | null>null, // відфільтровані новини відповідно до даних, які ввів користувач
    searchInpValue: '' // дані, які ввів користувач для пошуку 
};

let arr: CardProps[] = [];

// ф-ія проходить по тайтлу і деску і шукає кусок через індексОф з цими словами і підсвідчує їх. 
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        news_getNews: (state, action) => {
            arr.push(...action.payload)
            state.news = arr
        },
        news_filterNews: (state, action) => {
            let copyNewsArr = [...state.news]
            let filteredArr: any = []; 
            // filteredArr = copyNewsArr.filter(item => {
            //     let lowerCasedTitle = item.title.toLowerCase();
            //     let lowerCasedDesc = item.summary.toLowerCase();
            //     if (lowerCasedTitle.indexOf(action.payload) > -1 || lowerCasedDesc.indexOf(action.payload) > -1) {
            //         return item
            //     } else {
            //         filteredArr = null
            //     }
            // })
            // state.filteredNews = filteredArr;

            // фільтрація елементів. Якщо 

            // при кліку на пустий не коректно 

            copyNewsArr.map(item => {
                // приводимо до нижнього регістру 
                let lowerCasedTitle = item.title.toLowerCase();
                let lowerCasedDesc = item.summary.toLowerCase();
                // якщо знайдено підрядок в рядку заголовку - додаємо на початок масиву 
                if (action.payload === '') {
                    filteredArr = [...state.news]
                }
                else if (lowerCasedTitle.indexOf(action.payload) > -1) {
                    filteredArr.unshift(item)
                } 
                // якщо знайдено підрядок в рядку опису новини - додаємо в кінець масиву
                else if (lowerCasedDesc.indexOf(action.payload) > -1) {
                    filteredArr.push(item)
                }
            })
            state.filteredNews = filteredArr;
        },
        news_getSearchInpValue: (state, action) => {
            state.searchInpValue = action.payload
        },
    },
});

const { actions, reducer } = newsSlice;

export default reducer;

export const {
    news_getNews,
    news_filterNews,
    news_getSearchInpValue
} = actions;