import "./cardsList.sass";

import { useHttp } from "../../hooks/http.hook";

import Card from "../card/Card";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CardProps } from "../card/card.props";

import { news_getNews } from "./newsSlice";

// помилку обробити
// request робити в слайсі
const CardsList = (): JSX.Element => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    const allNewsFromServer = useSelector((state: any) => state.newsSlice.news);
    const filteredNews = useSelector((state: any) => state.newsSlice.filteredNews);

    useEffect(() => {
        request("https://api.spaceflightnewsapi.net/v3/articles").then(data => dispatch(news_getNews(data)));
    }, []);

    // якщо користувач ще не вводив дані для фільтру, показуються всі новини, завантажені з серверу. Якщо вводив дані, то показуються лише відфільтровані новини
    const news = !filteredNews ? allNewsFromServer : filteredNews;
    const content = news.map((item: CardProps) => {
        return (
            <Card
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                summary={item.summary}
                publishedAt={item.publishedAt}
            />
        );
    });

    return <ul className='cardsList'>{allNewsFromServer && allNewsFromServer.length > 0 ? content : "...Loading"}</ul>;
};

export default CardsList;
