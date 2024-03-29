import React, { useState } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
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
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="rightMenuHead">
          Корзина:
          <img
            className="removeBtn"
            src="/snshop/public/img/btn-remove.svg"
            alt="закрыть"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="itemsWrapper">
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                  <img
                    className="cartItemImg"
                    src={obj.imageUrl}
                    alt="sneakers"
                  />
                  <div className="picInfo">
                    <p>{obj.title}</p>
                    <b>{obj.price}руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="https://img.icons8.com/ios/256/close-window.png"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "в Корзине пусто"}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской службе`
                : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"
            }
            image={
              isOrderComplete ? "https://img.icons8.com/external-itim2101-flat-itim2101/256/external-delivery-box-shopping-and-ecommerce-itim2101-flat-itim2101.png" : "https://img.icons8.com/color-glass/256/open-delivered-box.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
