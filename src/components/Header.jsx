import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="img/logo.png" alt="logotype" />
          <div className="headerInfo">
            <h3>sneakers shop</h3>
            <p>магазин наилучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src="img/cart.svg" alt="корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorite">
            <img
              width={18}
              height={18}
              src="img/likeFavorites.svg"
              alt="закладки"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
