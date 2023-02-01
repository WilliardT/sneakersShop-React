import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";

function Favorites({ onAddtoFavorite }) {
  const state = React.useContext(AppContext);


  return (
    <div className="content">
      <div className="searchBlockWrapper">
        <h1>Мои закладки</h1>
      </div>
      <div className="sneakers">
        {items.map((items, index) => (
          <Card
            key={index} //лучше key или более уникальные значения из перебора массива
            favorited={true}
            onClickFavoriteItems={onAddtoFavorite}
            {...items}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
