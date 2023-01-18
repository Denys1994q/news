import { CardProps } from "../components/card/card.props";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

type ArticleState = {
    article: CardProps | null, 
    articleLoading: boolean, 
    articleError: boolean
}

const initialState: ArticleState = {
    article: null, // новина 
    articleLoading: false, // новина завантажується
    articleError: false // помилки при завантаженні новини
};

export const fetchArticle: any = createAsyncThunk("news/fetchArticle", id => {
    const { request } = useHttp();
    return request(`https://api.spaceflightnewsapi.net/v3/articles/${id}`);
});

const newsSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder 
            .addCase(fetchArticle.pending, state => {
                state.articleLoading = true;
                state.articleError = false;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.article = action.payload;
                state.articleLoading = false;
                state.articleError = false;
            })
            .addCase(fetchArticle.rejected, state => {
                state.articleError = true;
                state.articleLoading = false;
            });
        }

});

const { actions, reducer } = newsSlice;

export default reducer;

export const {
} = actions;