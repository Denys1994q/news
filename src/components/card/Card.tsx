import "./card.sass";

import { useSelector } from "react-redux/";

import { CardProps } from "./card.props";

import NavBtn from "../btns/NavBtn";

// тут міняти тайтл, не лізти до фільтрованих щоб не редакс
const Card = ({ id, imageUrl, title, summary, publishedAt }: CardProps): JSX.Element => {
    const slicedTitle = title.length > 100 ? title.slice(0, 100) + "..." : title;
    const slicedSummary = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    const filteredNews = useSelector((state: any) => state.newsSlice.filteredNews);
    const searchInpValue = useSelector((state: any) => state.newsSlice.searchInpValue);

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

    return (
        <li className='card' key={id}>
            <img className='card__image' src={imageUrl} alt='news-card-image' />
            <div className='card__text'>
                <p className='card__date'>{publishedAt}</p>
                <h1 className='card__title'>{!filteredNews ? slicedTitle : highlightLetters(slicedTitle)}</h1>
                <p className='card__desc'>{!filteredNews ? slicedSummary : highlightLetters(slicedSummary)}</p>
                <NavBtn path={id} text={"Read more"} arrow={"after"} />
            </div>
        </li>
    );
};

export default Card;
