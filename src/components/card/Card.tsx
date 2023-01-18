import "./card.sass";

import { useAppSelector } from "../../hooks/reduxTypes";

import { CardProps } from "./card.props";

import NavBtn from "../btns/NavBtn";

import { Card, CardContent, CardMedia, CardActions, Typography } from "@mui/material";

const NewsCard = ({ id, imageUrl, title, summary, publishedAt }: CardProps): JSX.Element => {
    const slicedTitle = title.length > 100 ? title.slice(0, 100) + "..." : title;
    const slicedSummary = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    const filteredNews = useAppSelector(state => state.newsSlice.filteredNews);
    const searchInpValue = useAppSelector(state => state.newsSlice.searchInpValue);

    // відображаємо дату в потрібному форматі
    const getDate = (publishedDate: any) => {
        let newDate = new Date(publishedDate);
        const year = newDate.getFullYear();

        const date = newDate.toDateString().slice(3, 10) + ", " + year;

        return date;
    };

    // виділяє знайдені слова в тексті
    const highlightLetters = (data: string): any => {
        // масив чисел, які означають індекси слів, які потрібно виділити
        let numbers: number[] = [];
        // масив слів з інпута
        const inputWordsArr = searchInpValue.trim().split(" ");
        // масив слів із вхідних даних
        const dataWordsArr = data.trim().split(" ");
        // перебираємо кожне слово із масиву даних
        dataWordsArr.map((dataWord: string, index: number) => {
            inputWordsArr.map((inpWord: string) => {
                // видаляємо зі слів з масиву даних крапки, коми, дужки
                dataWord = dataWord.replace(/[.,\()]/g, "");
                // якщо слово із вхідних даних є в списку слів із інпута - додаємо індекс такого слова у спецмасив
                if (dataWord.toLowerCase() === inpWord.toLowerCase()) {
                    numbers.push(index);
                }
            });
        });
        // перебираємо слова з вхідного масиву, виділяємо ті, що співпадають з інпутом
        return data
            .trim()
            .split(" ")
            .map((word: string, index: number) => {
                if (numbers.includes(index)) {
                    return <span className='card__highlighted'> {word}</span>;
                } else {
                    return <span> {word} </span>;
                }
            });
    };

    const dateStyles = {
        fontSize: "14px",
        position: "relative",
        opacity: "0.6",
        marginBottom: "25px",
        paddingLeft: "22px",
        "&::before": {
            content: "''",
            background: `url(${require("../../imgs/date.png")}) no-repeat`,
            position: "absolute",
            top: "1px",
            left: 0,
            width: "23px",
            height: "23px",
            opacity: 1,
        },
    };

    return (
        <li className='card'>
            <Card sx={{ width: 400 }}>
                <CardMedia
                    sx={{ height: "217px", borderRadius: "5px 5px 0px 0px" }}
                    image={imageUrl}
                    title='news-card-image'
                />
                <CardContent sx={{ padding: "25px" }}>
                    <div className='content-block'>
                        <div className='content-block__text'>
                            <Typography sx={dateStyles} component='div'>
                                {getDate(publishedAt)}
                            </Typography>
                            <Typography
                                sx={{ fontSize: "24px", lineHeight: "29px", marginBottom: "20px" }}
                                component='div'>
                                {!filteredNews ? slicedTitle : highlightLetters(slicedTitle)}
                            </Typography>
                            <Typography sx={{ fontSize: "16px", lineHeight: "150%", marginBottom: "20px" }}>
                                {!filteredNews ? slicedSummary : highlightLetters(slicedSummary)}
                            </Typography>
                        </div>
                        <div className='content-block__btns'>
                            <CardActions sx={{ padding: "0px" }}>
                                <NavBtn path={id} text={"Read more"} arrow={"after"} />
                            </CardActions>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
};

export default NewsCard;
