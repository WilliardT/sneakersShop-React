import React from 'react'
import { Link } from 'react-router-dom';


function Header (props) {

   return (
      <header>
         <Link to="/">
         <div className='headerLeft'>
            <img width={40} height={40} src='/img/logo.png' alt='logotype'/>
            <div className='headerInfo'>
               <h3>sneakers shop</h3>
               <p>магазин наилучших кроссовок</p>
            </div>
         </div>
         </Link>
         <ul className='headerRight'>
            <li onClick={props.onClickCart}>
               <img width={20} height={20} src='/img/cart.svg' alt='корзина'/>
               <span>1205руб.</span>
            </li>
            <li>
               <Link to="/favorites">
                  <img width={20} height={20} src='/img/likeFavorites.svg' alt='закладки'/>
               </Link>
            </li>
            <li>
               <img width={20} height={20} src='/img/user.svg' alt='пользователь'/>
            </li>
         </ul>
      </header>
   );
};

export default Header;