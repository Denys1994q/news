import HomePage from "../pages/homePage/HomePage";
import "./App.sass";


// тут тільки роути, один на HomePage, інший на динамічні роути
function App() {
    return (
        <div className='container'>
            <HomePage />
        </div>
    );
}

export default App;
