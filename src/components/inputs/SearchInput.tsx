import "./searchInput.sass";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxTypes";
import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";

import { news_filterNews, news_getSearchInpValue } from "../../slices/newsSlice";
import { SearchInputProps } from "./searchInput.props";

const SearchInput = ({ label, placeholder }: SearchInputProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>("");

    const newsError = useAppSelector(state => state.newsSlice.newsError);

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
                <div className='searchInput__input'>
                    <TextField
                        placeholder={placeholder}
                        id='filter-input'
                        color={"info"}
                        type={"text"}
                        value={inputValue}
                        disabled={newsError}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeData(e)}
                        autoFocus={true}
                        inputProps={{
                            style: {
                                fontSize: 16,
                                paddingLeft: 60,
                                border: "1px solid #EAEAEA",
                                boxShadow: "0px 8px 4px rgba(0, 0, 0, 0.05)",
                                borderRadius: "5px",
                                fontWeight: 400,
                                display: "block",
                                position: "relative",
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default SearchInput;
