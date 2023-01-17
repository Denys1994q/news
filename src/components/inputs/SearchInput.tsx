import "./searchInput.sass";

import { useDispatch } from "react-redux";
import { useState } from "react";

import { news_filterNews, news_getSearchInpValue } from "../../slices/newsSlice";
import { SearchInputProps } from "./searchInput.props";

const SearchInput = ({ label, placeholder }: SearchInputProps): JSX.Element => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>("");

    // фільтр працює по кліку на значок в інпуті
    const filterNews = () => {
        dispatch(news_filterNews(inputValue.toLowerCase()));
        dispatch(news_getSearchInpValue(inputValue.toLowerCase()));
    };

    const onChangeData = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <label htmlFor='filter-input' className='searchInput__label'>
                {label}
            </label>
            <div className='searchInput__inputWrapper'>
                <img
                    src={require("../../imgs/filter-icon.png")}
                    onClick={() => filterNews()}
                    className='searchInput__icon'
                    alt='filter-icon'
                />
                <input
                    type='text'
                    value={inputValue}
                    onChange={e => onChangeData(e)}
                    id='filter-input'
                    className='searchInput__input'
                    placeholder={placeholder}
                />
            </div>
        </>
    );
};

export default SearchInput;
