import "./App.sass";

import HomePage from "../../pages/homePage/HomePage";
import ArticlePage from "../../pages/articlePage/ArticlePage";

import { Routes, Route } from "react-router-dom";

// обробити помилки, якщо немає інтернету 
function App() {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/:id' element={<ArticlePage />} />
            </Routes>
        </div>
    );
}

export default App;
