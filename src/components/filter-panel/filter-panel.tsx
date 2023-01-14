import "./filter-panel.sass";

const FilterPanel = () => {
    return (
        <div className='filter-panel'>
            <label htmlFor='filter-input' className='filter-panel__label'>
                Filter by keywords
            </label>
            <div className='filter-panel__inputWrapper'>
                <img src={require("../../imgs/filter-icon.png")} alt='filter-icon' className='filter-panel__icon' />
                <input
                    type='text'
                    id='filter-input'
                    className='filter-panel__input'
                    placeholder='The most successful IT companies in 2020'
                />
            </div>
            <p className="filter-panel__results">Results: 6</p>
        </div>
    );
};

export default FilterPanel;
