import { CardProps } from "../components/card/card.props";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

type NewsState = {
    news: CardProps[],
    newsLoading: boolean,
    newsError: boolean,
    filteredNews: CardProps[] | null,
    searchInpValue: string
}

const initialState: NewsState = {
    news: [], // початковий список всіх новин із серверу, які відразу відображаються на сторінці
    newsLoading: false, // новини завантажуються
    newsError: false, // помилка при завантаженні новин
    filteredNews: null, // відфільтровані новини відповідно до даних, які ввів користувач
    searchInpValue: '', // дані, які ввів користувач для пошуку 
};

export const fetchNews = createAsyncThunk<CardProps[], undefined, {rejectValue: string}>("news/fetchNews", () => {
    const { request } = useHttp();
    return request(`https://api.spaceflightnewsapi.net/v3/articles`);
});

// ф-ія проходить по тайтлу і деску і шукає кусок через індексОф з цими словами і підсвідчує їх. 
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        news_filterNews: (state, action: PayloadAction<string>) => {
            let copyNewsArr: CardProps[] = [...state.news]
            let filteredSortedArr: CardProps[] = [];

            let str: string = action.payload;
            // забираємо коми. Щоб, наприклад, введене слово Wednesday знаходило всі новини, де є або Wednesday, або Wednesday,
            let strWithoutCommas: string = str.replace(/,/g, "");
            // забираємо пробіли не тільки на початку і в кінці, але й забираємо зайві пробіли всередині між словами (якщо вони є)
            let newStr: string = strWithoutCommas.replace(/\s+/g, " ").trim();
            let inputWordsArr: string[] = newStr.toLowerCase().split(" ");
            
            // якщо інпут пустий, показуємо всі новини
            if (str === '') {
                filteredSortedArr = [...state.news] 
            }

            // масив з id новин, в яких в titles знайдено keywords (для відображення таких новин першими в списку)
            let nums: number[] = [];

            inputWordsArr.map((wordInInput: string) => {
                copyNewsArr.map((item: CardProps) => {
                    let newTitle: string = item.title.replace(/[\s+,]/g, " ");
                    let lowerCasedTitle: string[] = newTitle.toLowerCase().split(" ");
    
                    lowerCasedTitle.map((wordInTitle: string) => {
                        // якщо keywords є в title і якщо таку новину ще не було додано в кінцевий масив
                        if (wordInTitle === wordInInput && filteredSortedArr.indexOf(item) === -1) {
                            filteredSortedArr.push(item);
                            nums.push(item.id);
                        }
                    });
                });
            });
            // фільтруємо cписок новин, залишаємо тільки ті новини, в яких в заголовку не було keywords
            let restOfNews: CardProps[] = copyNewsArr.filter((item: any) => {
                if (!nums.includes(item.id)) {
                    return item;
                }
            });
            // знаходимо keywords у summary, додаємо в кінцевий масив (в кінець масиву після новин, де keywords у title)
            inputWordsArr.map((wordInInput: string) => {
                restOfNews.map((item: any) => {
                    let newDesc: string = item.summary.replace(/[\s+,]/g, " ");
                    let lowerCasedDesc: string[] = newDesc.toLowerCase().split(" ");
                    lowerCasedDesc.map((wordInDesc: string) => {
                        if (wordInDesc === wordInInput && filteredSortedArr.indexOf(item) === -1) {
                            filteredSortedArr.push(item);
                        }
                    });
                });
            });
    
            state.filteredNews = [...filteredSortedArr]


            // let copyNewsArr = [...state.news]
            // let filteredArr: any = []; 

            // let str = action.payload
            // // забираємо коми. Щоб, наприклад, введене слово Wednesday знаходило всі новини, де є або Wednesday, або Wednesday,
            // let strWithoutCommas = str.replace(/,/g, '')
            // // забираємо пробіли не тільки на початку і в кінці, але й забираємо зайві пробіли всередині між словами (якщо вони є)
            // let newStr = strWithoutCommas.replace(/\s+/g, ' ').trim()
            // let inputWordsArr: string[] = newStr.toLowerCase().split(' ')
            // // якщо інпут пустий, показуємо всі новини 
            // if (str === '') {
            //     filteredArr = [...state.news] 
            // }
            
            // let nums: number[] = []
            // let nums2: number[] = []
            // inputWordsArr.map((wordInInput: string) => {
            //     copyNewsArr.map((item: CardProps, index: number) => {
            //         let newTitle: string = item.title.replace(/[\s+,]/g, ' ')
            //         let newDesc: string = item.summary.replace(/[\s+,]/g, ' ')
            //         let lowerCasedTitle: string[] = newTitle.toLowerCase().split(' ')
            //         let lowerCasedDesc: string[] = newDesc.toLowerCase().split(' ');
            //         lowerCasedTitle.map((wordInTitle: string) => {
            //             if (wordInTitle === wordInInput && filteredArr.indexOf(item) === -1) {
            //                 nums.push(index)
            //                 filteredArr.push(item)
            //             } 
            //         })
            //         lowerCasedDesc.map((wordInDesc: string) => {
            //             if (wordInDesc === wordInInput && lowerCasedTitle.indexOf(wordInInput) === -1  && filteredArr.indexOf(item) === -1) {
            //                 nums2.push(index)
            //                 filteredArr.push(item)
            //             } 
            //         })                   
 

            //         // // якщо не знайшло в тайтлі, тільки тоді шукати в описі 
            //         // lowerCasedTitle.map((wordInTitle: string) => {
            //         //     // якщо знайдено підрядок в заголовку - додаємо новину на початок масиву і якщо цього об'єкту ще не додано
            //         //     if (wordInTitle === wordInInput && filteredArr.indexOf(item) === -1) {
            //         //         filteredArr.unshift(item)
            //         //     } 
            //         // })
            //         // lowerCasedDesc.map((wordInDesc: string) => {
            //         //     // якщо знайдено підрядок в описі - додаємо новину в кінець масиву і якщо цього об'єкту ще не додано
            //         //     if (wordInDesc === wordInInput && filteredArr.indexOf(item) === -1) {
            //         //         filteredArr.push(item)
            //         //     } 
            //         // })
            //     })
            // })
            // let k: any = [];
            // let s: any = [];
            // copyNewsArr.map((item: any, index: number) => {
            //     nums.map(num => {
            //         if (index === num) {
            //             k.push(item)
            //         } 
            //     }) 
            // })

            // copyNewsArr.map((item: any, index: number) => {
            //     nums2.map(num => {
            //         if (index === num) {
            //             s.push(item)
            //         } 
            //     }) 
            // })
 
            // console.log(k.length)
            // console.log(s.length)

            // let j = [...k, ...s]

            // // хочеться добавити свойтсво в об'кт таки де є в тайтлі і тоді легко відсортується по цьому свойству, але проблема там перевірка йде 
            // // let p = filteredArr.sort((a: any, b: any) => {
            // //     console.log(a)

            // //     return b.title.indexOf('mission') - a.title.indexOf('mission')
            // // })
            // // console.log(p)
            // // може після цього зробити сорт і там прописати умови, що, якщо є в тайтлі, то спочатку
            // state.filteredNews = j;
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