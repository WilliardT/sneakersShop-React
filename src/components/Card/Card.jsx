import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import cssCard from "./Card.module.scss";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleTwoTone,
} from "@ant-design/icons/lib/icons";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cssCard.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
          <rect x="0" y="168" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="196" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="230" rx="5" ry="5" width="80" height="25" />
          <rect x="110" y="230" rx="50" ry="50" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={cssCard.favorite} onClick={onClickFavorite}>
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </div>
          )}
          <img className="cardImage" src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className={cssCard.cardButtom}>
            <div className={cssCard.cardButtomText}>
              <span>цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <PlusCircleTwoTone
                twoToneColor={isItemAdded(id) ? "#eb2f96" : "#b8b8b8"}
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
