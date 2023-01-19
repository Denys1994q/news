import FilterPanel from "../../components/filter-panel/filter-panel";
import CardsList from "../../components/cardsList/CardsList";

const HomePage = (): JSX.Element => {
    const input = "orange";
    // 1 4 for
    // і там, і там
    const obj = [
        {
            id: 100,
            title: "title",
            summary: "desc1",
        },
        {
            id: 101,
            title: "title",
            summary: "orange",
        },
        {
            id: 102,
            title: "orange",
            summary: "desc3 ",
        },
        {
            id: 103,
            title: "title4 orange",
            summary: "desc4 orange",
        },
    ];

    const f = (input: any, obj: any) => {
        let str = input;
        // забираємо коми. Щоб, наприклад, введене слово Wednesday знаходило всі новини, де є або Wednesday, або Wednesday,
        let strWithoutCommas = str.replace(/,/g, "");
        // забираємо пробіли не тільки на початку і в кінці, але й забираємо зайві пробіли всередині між словами (якщо вони є)
        let newStr = strWithoutCommas.replace(/\s+/g, " ").trim();
        let inputWordsArr: string[] = newStr.toLowerCase().split(" ");
        // якщо інпут пустий, показуємо всі новини

        let j: any = [];

        let titlesArr: any = [];
        let summaryArr: any = [];
        let nums: number[] = [];

        inputWordsArr.map((wordInInput: string) => {
            obj.map((item: any, index: number) => {
                let newTitle: string = item.title.replace(/[\s+,]/g, " ");
                let lowerCasedTitle: string[] = newTitle.toLowerCase().split(" ");

                lowerCasedTitle.map((wordInTitle: string) => {
                    if (wordInTitle === wordInInput && titlesArr.indexOf(item) === -1) {
                        titlesArr.push(item);
                        nums.push(item.id);
                    }
                });
            });
        });

        let filteredArr = obj.filter((item: any) => {
            if (!nums.includes(item.id)) {
                return item;
            }
        });

        inputWordsArr.map((wordInInput: string) => {
            filteredArr.map((item: any) => {
                let newDesc: string = item.summary.replace(/[\s+,]/g, " ");
                let lowerCasedDesc: string[] = newDesc.toLowerCase().split(" ");
                lowerCasedDesc.map((wordInDesc: string) => {
                    if (wordInDesc === wordInInput && titlesArr.indexOf(item) === -1) {
                        titlesArr.push(item);
                    }
                });
            });
        });

        // console.log(titlesArr);
        // console.log(summaryArr);
        j = [...titlesArr, ...summaryArr];
        // console.log(j)

        return (
            <ul>
                {j.map((it: any) => {
                    return (
                        <>
                            <li>
                                <p>{it.title}</p>
                                <p>{it.summary}</p>
                            </li>
                            <br />
                        </>
                    );
                })}
            </ul>
        );
    };
    const res = f(input, obj);

    return (
        <>
            <FilterPanel />
            <CardsList />
            {/* {input} */}
            {/* {res} */}
        </>
    );
};

export default HomePage;
