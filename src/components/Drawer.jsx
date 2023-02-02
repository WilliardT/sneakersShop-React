import React from "react";
import axios from 'axios';


function Drawer({ onClose, items = [], onRemove }) {
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
            <ul className="cartTotalBlock">
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
            </ul>
            <button className="greenButton">Оформить заказ</button>
          </div>
        ) : (
          <div className="cartEmpty">
            <img src="/img/emptyCart.png" alt="emptyCart" />
            <h2>Корзина пустая</h2>
            <p>добавьте товар</p>
            <button onClick={onClose} className="greenButton">
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
