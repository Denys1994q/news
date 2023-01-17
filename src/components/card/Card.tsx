import "./card.sass";

import { useSelector } from "react-redux/";

import { CardProps } from "./card.props";
import NavBtn from "../btns/NavBtn";
import { useEffect } from "react";

// тут міняти тайтл, не лізти до фільтрованих щоб не редакс
const Card = ({ id, imageUrl, title, summary, publishedAt }: CardProps): JSX.Element => {
    const slicedTitle = title.length > 100 ? title.slice(0, 100) + "..." : title;
    const slicedSummary = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    const filteredNews = useSelector((state: any) => state.newsSlice.filteredNews);
    const searchInpValue = useSelector((state: any) => state.newsSlice.searchInpValue);

    // підсвічує підстроку з пошуку в карточках
    // не тільки для тайтла, а і субтайтл. І не забути, щоб не тільки перше знайдене, а всі.
    // шукає в повному варіанті саммері, а треба тільки в обрізоному (чи ні?)/ ОПИСАТИ як зробив, поянсити.

    // 2 однакові якщо два слова... probl lunar

    // не може підсвічувати два в одному слові, бо не так вирізає тоді...
    // може дійсно треба лише регулярка ...

    // to begin

    // неправильно, якщо додати слово. launch security

    // якщо 1 слово то працює, якщо 2 то не працює, бо searchInpValue - тоді масив

    // якщо масив слів більше одного то виділяє ок, якщо одне слово - то не виділяє взагалі
    // треба до цього просто умову по ленгс зробити
    // виділяє тільки останнє
    // const highlightLetters = (title: any) => {
    //     const ar = searchInpValue.trim().split(" ");
    //     let newTitle;
    //     // саме ок працює, все виділяє, але повертає неправильну кількість (подвоює, потроює)
    //     ar.map((item: any) => {
    //         let lowerCasedTitle = title.toLowerCase();

    //         if (lowerCasedTitle.indexOf(item) > -1) {
    //             const pos = lowerCasedTitle.indexOf(item);
    //             let s = pos + item.length;
    //             newTitle = (
    //                 <p>
    //                     <span>{title.slice(0, pos)}</span>
    //                     <span className='card__highlighted'>{title.slice(pos, s)}</span>
    //                     <span>{title.slice(s)}</span>
    //                 </p>
    //             );
    //         }
    //         // else {
    //         //     return title;
    //         // }
    //     });

    //     if (newTitle) {
    //         return newTitle;
    //     } else {
    //         return title;
    //     }
    // };

    const highlightLetters = (data: string): any => {
        let numbers: any = [];
        // масив слів з інпута
        const inputWordsArr = searchInpValue.trim().split(" ");
        // масив слів із вхідних даних
        const titleWordsArr = data.trim().split(" ");
        // перебираємо кожне слово із масиву даних
        titleWordsArr.map((dataWord: string, index: number) => {
            inputWordsArr.map((inpWord: string) => {
                // видаляємо зі слів з масиву даних крапки, коми, дужки
                dataWord = dataWord.replace(/[.,\()]/g, "");
                // якщо слово із вхідних даних є в списку слів із інпута - додаємо індекс такого слова у спецмасив
                if (dataWord.toLowerCase() === inpWord.toLowerCase()) {
                    numbers.push(index);
                }
            });
        });
        return data
            .trim()
            .split(" ")
            .map((word: any, index: number) => {
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
