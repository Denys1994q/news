import "./cardsList.sass";

import Card from "../card/Card";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypes";
import ClipLoader from "react-spinners/ClipLoader";

import { CardProps } from "../card/card.props";

import { fetchNews } from "../../slices/newsSlice";

const CardsList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const allNewsFromServer = useAppSelector(state => state.newsSlice.news);
    const filteredNews = useAppSelector(state => state.newsSlice.filteredNews);
    const newsLoading = useAppSelector(state => state.newsSlice.newsLoading);
    const newsError = useAppSelector(state => state.newsSlice.newsError);

    useEffect(() => {
        dispatch(fetchNews());
    }, []);

    // якщо користувач ще не вводив дані для фільтру, показуються всі новини, завантажені з серверу. Якщо вводив дані, то показуються лише відфільтровані новини
    const news = !filteredNews ? allNewsFromServer : filteredNews;
    const newsCardContent = news.map((item: CardProps) => {
        return (
            <li key={item.id}>
                <Card
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    summary={item.summary}
                    publishedAt={item.publishedAt}
                />
            </li>
        );
    });

    const pageContent = (
        <>
            {!newsError ? (
                <ul className='cardsList'>
                    {allNewsFromServer && allNewsFromServer.length > 0 ? newsCardContent : null}
                </ul>
            ) : (
                <h4>Sorry, something goes wrong... </h4>
            )}
        </>
    );

    return (
        <>
            {newsLoading ? (
                <ClipLoader
                    color={"#ddd"}
                    loading={newsLoading}
                    size={30}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />
            ) : (
                <>{pageContent}</>
            )}
        </>
    );
};

export default CardsList;
