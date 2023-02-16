import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { HeartFilled, UserOutlined } from "@ant-design/icons/lib/icons";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img
            width={50}
            height={70}
            src="https://www.tsum.ru/static/media/logo.047b4fb0.svg"
            alt="logotype"
          />
          <div className="headerInfo">
            <h3>sneakers shop</h3>
            <p>магазин наилучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <ShoppingCartOutlined
            alt="корзина"
          />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorite">
            <HeartFilled alt="закладки"/>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <UserOutlined alt="Пользователь"/>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
