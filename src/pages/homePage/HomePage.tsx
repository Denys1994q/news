import FilterPanel from "../../components/filter-panel/filter-panel";
import CardsList from "../../components/cardsList/CardsList";

import { useEffect } from "react";

const HomePage = () => {
    // якщо останній символ не буква - видалити
    const searchInpValue = "finish imagery";

    let numbers: any = [];

    const highlightLetters = (data: string): any => {
        // масив слів з інпута
        const inputWordsArr = searchInpValue.trim().split(" ");
        // масив слів із вхідних даних
        const titleWordsArr = data.trim().split(" ");
        // перебираємо кожне слово із масиву даних
        titleWordsArr.map((dataWord: string, index: number) => {
            inputWordsArr.map(inpWord => {
                // видаляємо зі слів з масиву даних крапки і коми, якщо вони є
                dataWord = dataWord.replace(/[.,]/g, "");
                if (dataWord.toLowerCase() === inpWord.toLowerCase()) {
                    numbers.push(index);
                }
            });
        });
        let result;
        return (result = st
            .trim()
            .split(" ")
            .map((word: any, index: number) => {
                // if () {

                // }
                console.log(word);
                if (numbers.includes(index)) {
                    return <span className='hi'> {word}</span>;
                } else {
                    return <span> {word} </span>;
                }
            }));
    };

    const st = "From start to finish, Sunday’s Falcon Heavy launch delivered spectacular imagery.";

    return (
        <>
            <FilterPanel />
            <CardsList />
            {/* <div>{highlightLetters(st)}</div> */}
        </>
    );
};

export default HomePage;
