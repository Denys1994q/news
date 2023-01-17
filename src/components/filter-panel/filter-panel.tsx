import { useSelector } from "react-redux";

import SearchInput from "../inputs/SearchInput";
import "./filter-panel.sass";

const FilterPanel = (): JSX.Element => {
    const news = useSelector((state: any) => state.newsSlice.news);
    const filteredNews = useSelector((state: any) => state.newsSlice.filteredNews);

    return (
        <div className='filter-panel'>
            <SearchInput label={"Filter by keywords"} />
            <p className='filter-panel__results'>Results: {!filteredNews ? news.length : filteredNews.length}</p>
        </div>
    );
};

export default FilterPanel;
