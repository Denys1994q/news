import "./searchInput.sass";

import { useSelector, useDispatch } from "react-redux";
import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";

import { news_filterNews, news_getSearchInpValue } from "../../slices/newsSlice";
import { SearchInputProps } from "./searchInput.props";

const SearchInput = ({ label, placeholder }: SearchInputProps): JSX.Element => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>("");

    const newsError = useSelector((state: any) => state.newsSlice.newsError);

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
                <TextField
                    placeholder={placeholder}
                    id='filter-input'
                    color={"info"}
                    type={"text"}
                    value={inputValue}
                    disabled={newsError}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeData(e)}
                    className={"searchInput__input"}
                    autoFocus={true}
                    inputProps={{ style: { fontSize: 16, paddingLeft: 60 } }}
                />
            </div>
        </>
    );
};

export default SearchInput;
