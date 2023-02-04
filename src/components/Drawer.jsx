import React, { useContext, useState } from "react";
import axios from "axios";

import Info from "./Info";
import AppContext from "../context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/", cartItems);
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="rightMenuHead">
          Корзина:
          <img
            className="removeBtn"
            src="/img/btn-remove.svg"
            alt="Close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="items">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem">
                <img className="pic" src={obj.imageUrl} alt="sneakers" />
                <div className="picInfo">
                  <p>{obj.title}</p>
                  <b>{obj.price}руб.</b>
                </div>
                <img
                  onClick={() => onRemove(obj.id)}
                  className="removeBtn"
                  src="/img/btn-remove.svg"
                  alt="remove"
                />
              </div>
            ))}
            <div className="cartTotalBlock">
              <li className="total">
                <span>Итого:</span>
                <div></div>
                <b>21 489 руб.</b>
              </li>
              <li className="total">
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
              </li>
            </div>
            <button
              disabled={isLoading}
              className="greenButton"
              onClick={onClickOrder}
            >
              Оформить заказ
            </button>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской службе`
                : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
