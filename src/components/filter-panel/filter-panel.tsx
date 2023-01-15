import "./filter-panel.sass";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { news_filterNews, news_getSearchInpValue } from "../cardsList/newsSlice";

// на онЧейндж робити

// якщо немає нічого показувати, що не знайдено

// як підсвітити
// як сортувати по заголовку і опису

// trim
const FilterPanel = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");

    const news = useSelector((state: any) => state.newsSlice.news);
    const filteredNews = useSelector((state: any) => state.newsSlice.filteredNews);

    // фільтр працює по кліку на значок в інпуті
    const filterNews = () => {
        dispatch(news_filterNews(inputValue.toLowerCase()));
        dispatch(news_getSearchInpValue(inputValue.toLowerCase()));
    };

    const onChangeData = (e: any) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='filter-panel'>
            <label htmlFor='filter-input' className='filter-panel__label'>
                Filter by keywords
            </label>
            <div className='filter-panel__inputWrapper'>
                <img
                    src={require("../../imgs/filter-icon.png")}
                    onClick={() => filterNews()}
                    alt='filter-icon'
                    className='filter-panel__icon'
                />
                <input
                    type='text'
                    value={inputValue}
                    onChange={e => onChangeData(e)}
                    id='filter-input'
                    className='filter-panel__input'
                    placeholder=''
                />
            </div>
            <p className='filter-panel__results'>Results: {!filteredNews ? news.length : filteredNews.length}</p>
        </div>
    );
};

export default FilterPanel;
