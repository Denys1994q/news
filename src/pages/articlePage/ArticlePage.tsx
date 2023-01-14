import "./article.sass";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import NavBtn from "../../components/btns/NavBtn";

import { CardProps } from "../../components/card/card.props";

const ArticlePage = (): JSX.Element => {
    const { id } = useParams();
    const { request } = useHttp();

    // типізувати
    const [article, setArticle] = useState<CardProps | null>(null);

    useEffect(() => {
        request(`https://api.spaceflightnewsapi.net/v3/articles/${id}`).then(data => setArticle(data));
    }, []);

    // це не просто картинка, це зображення з новини
    return (
        <>
            {article && article.imageUrl ? (
                <img src={article.imageUrl} className='img-for-article' alt='article-background-image' />
            ) : null}
            <div className='article'>
                <h1 className='article__title'>The 2020 World's Most Valuable Brands</h1>
                <p className='article__text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum ornare convallis non etiam
                    tincidunt tincidunt. Non dolor vel purus id. Blandit habitasse volutpat id dolor pretium, sem
                    iaculis. Faucibus commodo mauris enim, turpis blandit. Porttitor facilisi viverra mi lacus lacinia
                    accumsan. Pellentesque gravida ligula bibendum aliquet nulla massa elit. Ac faucibus donec sit morbi
                    pharetra urna. Vel facilisis amet placerat ultrices lobortis proin nulla. Molestie tellus sed
                    pellentesque tortor vitae eu cras nisl. Sem facilisi amet vitae ultrices nullam tellus. Pellentesque
                    eget iaculis morbi at quis eget lacus, aliquam etiam. Neque ipsum, placerat vel convallis nulla
                    orci, nunc etiam.
                </p>
            </div>
            <NavBtn path={"./"} text={"Back to homepage"} arrow={"before"} />
        </>
    );
};

export default ArticlePage;
