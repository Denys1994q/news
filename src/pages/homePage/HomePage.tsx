import FilterPanel from "../../components/filter-panel/filter-panel";
import CardsList from "../../components/cardsList/CardsList";

const HomePage = (): JSX.Element => {
    return (
        <>
            <FilterPanel />
            <CardsList />
        </>
    );
};

export default HomePage;
