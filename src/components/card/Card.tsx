import "./card.sass";

import { CardProps } from "./card.props";

const Card = ({ id, imageUrl, title, summary, publishedAt }: CardProps): JSX.Element => {
    const slicedTitle = title.length > 100 ? title.slice(0, 100) + "..." : title;
    const slicedSummary = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;

    return (
        <li className='card' key={id}>
            <img className='card__image' src={imageUrl} alt='news-card-image' />
            <div className='card__text'>
                <p className='card__date'>{publishedAt}</p>
                <h1 className='card__title'>{slicedTitle}</h1>
                <p className='card__desc'>{slicedSummary}</p>
                <p className='card__readMore'>Read more</p>
            </div>
        </li>
    );
};

export default Card;
