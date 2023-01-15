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

    // підсвічує підстроку з пошуку в карточках
    // не тільки для тайтла, а і субтайтл. І не забути, щоб не тільки перше знайдене, а всі.
    // шукає в повному варіанті саммері, а треба тільки в обрізоному (чи ні?)
    const highlightLetters = (title: any) => {
        let lowerCasedTitle = title.toLowerCase();
        if (lowerCasedTitle.indexOf(searchInpValue) > -1) {
            const pos = lowerCasedTitle.indexOf(searchInpValue);
            let s = pos + searchInpValue.length;
            return (
                <p>
                    <span>{title.slice(0, pos)}</span>
                    <span className='card__highlited'>{title.slice(pos, s)}</span>
                    <span>{title.slice(s)}</span>
                </p>
            );
        } else {
            return title
        }
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
