import React from 'react';
import Card from '../components/Card/Card';

function Home (
  {
   items,
   cartItems,
   searchValue,
   setSearchValue,
   onChangeSearchInput,
   onAddtoFavorite,
   onAddtoCard,
   isLoading,
  }) {

    const renderItems = () => {
      const filtredItems = items.filter((items) => items.title.toLowerCase().includes(searchValue.toLowerCase()));
      return (
        isLoading 
        ? [...Array(8)] 
        : filtredItems)
        .map((items, index) => (
          <Card
            key={index} //лучше key или более уникальные значения из перебора массива 
            onAddtoFavorite = {(obj) => onAddtoFavorite(obj)}
            onClickPlus={(obj) => onAddtoCard(obj)}
            added={isItemAdded(items && items.id)}
            {...items}
            loading={isLoading}
          />
        ));
    };

   return (
      <div className='content'>
        <div className='searchBlockWrapper'>
          <h1>{searchValue ? `Поиск: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className='searchBlock'>
            <img src='/img/search.svg' alt='search' />
            {searchValue && (
              <img 
                onClick={() => setSearchValue('')} 
                className='clearInput' 
                src='/img/btn-remove.svg' 
                alt='clearInput'
              />)
            }
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="найти..." />
          </div>
        </div>
        <div className='sneakers'>
         {renderItems()}
        </div>
      </div>
   );
};

export default Home;