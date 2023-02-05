import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img className="element" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="elementP">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow" />
        назад
      </button>
    </div>
  );
};

export default Info;