import "./article.sass";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxTypes";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { fetchArticle } from "../../slices/articleSlice";

import NavBtn from "../../components/btns/NavBtn";

import { CardProps } from "../../components/card/card.props";

const ArticlePage = (): JSX.Element => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const article: CardProps | null = useAppSelector(state => state.articleSlice.article);
    const articleLoading = useAppSelector(state => state.articleSlice.articleLoading);
    const articleError = useAppSelector(state => state.articleSlice.articleError);

    useEffect(() => {
        dispatch(fetchArticle(id));
    }, []);

    const pageContent = (
        <>
            {!articleError && article ? (
                <>
                    {article && article.imageUrl ? (
                        <img src={article.imageUrl} className='img-for-article' alt='article-background-image' />
                    ) : null}
                    <div className='article'>
                        <h1 className='article__title'>{article.title}</h1>
                        <p className='article__text'>{article.summary}</p>
                    </div>
                </>
            ) : (
                <h4>Sorry, something goes wrong... </h4>
            )}
            <NavBtn path={"./"} text={"Back to homepage"} arrow={"before"} />
        </>
    );

    return (
        <>
            {articleLoading ? (
                <ClipLoader
                    color={"#ddd"}
                    loading={articleLoading}
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

export default ArticlePage;
