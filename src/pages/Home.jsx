import React from "react";

import Card from "../components/Card/Card";

import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddtoFavorite,
  onAddtoCard,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddtoFavorite(obj)}
        onPlus={(obj) => onAddtoCard(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div className="searchBlockWrapper">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="searchBlock">
          {
            !searchValue && <SearchOutlined />
          }
          {searchValue && (
            <CloseOutlined onClick={() => setSearchValue("")} />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="поиск..."
          />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
