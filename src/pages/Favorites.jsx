import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

function Favorites() {
  const { favorites, onAddtoFavorite } = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="searchBlockWrapper">
        <h1>Мои закладки</h1>
      </div>
      <div className="sneakers">
        {favorites.map((items, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddtoFavorite}
            {...items}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
