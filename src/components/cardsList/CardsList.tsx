import "./cardsList.sass";

import { useHttp } from "../../hooks/http.hook";

import Card from "../card/Card";
import { useState, useEffect } from "react";

import { CardProps } from "../card/card.props";

// помилку обробити
// request робити в слайсі
const CardsList = (): JSX.Element => {
    const { request } = useHttp();

    const [news, setNews] = useState<CardProps[] | []>([]);

    useEffect(() => {
        request("https://api.spaceflightnewsapi.net/v3/articles").then(data => setNews(data));
    }, []);

    const showNews =
        news && news.length > 0
            ? news.map((item: CardProps) => {
                  return (
                      <Card
                          id={item.id}
                          title={item.title}
                          imageUrl={item.imageUrl}
                          summary={item.summary}
                          publishedAt={item.publishedAt}
                      />
                  );
              })
            : null;

    return <ul className='cardsList'>{showNews}</ul>;
};

export default CardsList;
