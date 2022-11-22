import React, {useState} from 'react';
import cssCard from './Card.module.scss';
import ContentLoader from "react-content-loader"


function Card ({
   id, 
   imageUrl, 
   title, 
   price, 
   onClickPlus, 
   onClickFavorite, 
   favorited = false,
   added = false,
   loading = false,
}) {

   const [isAdded, setIsAdded] = useState(added);
   const [isFavorite, setIsFavorite] = useState(favorited);

   const handleOnClick = () => {
      onClickPlus({id, imageUrl, title, price});
      setIsAdded(!isAdded);
   }

   const onClickFavoriteItems = () => {
      onClickFavorite({id, imageUrl, title, price});
      setIsFavorite(!isFavorite);
   }

   return(
      <div className={cssCard.card}>
         {
            loading ? (
            <ContentLoader 
               speed={2}
               width={150}
               height={265}
               viewBox="0 0 150 265"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
               {...props}
            >
               <rect x="0" y="0" rx="10" ry="10" width="150" height="155" /> 
               <rect x="0" y="168" rx="5" ry="5" width="150" height="15" /> 
               <rect x="0" y="196" rx="5" ry="5" width="100" height="15" /> 
               <rect x="0" y="230" rx="5" ry="5" width="80" height="25" /> 
               <rect x="110" y="230" rx="50" ry="50" width="32" height="32" />
             </ContentLoader>
            ) : (
            <>
            <div className={cssCard.favorite} onClick={onClickFavoriteItems} >
               <img 
                  src={isFavorite
                  ? '/img/heart-liked.svg'
                  : '/img/heart-unliked.svg'}  
                  alt='unliked' 
               />
            </div>
            <img width="100%" height={135} src={imageUrl} alt='sneakers'/>
            <h5>{title}</h5>
            <div className={cssCard.cardButtom}>
               <div className={cssCard.cardButtomText}>
                  <span>цена:</span>
                  <b>{price}руб.</b>
               </div>
               <button className={cssCard.button} >
               <img src={isAdded 
                  ? '/img/btn-chaked.svg' 
                  : '/img/plus.svg'} alt='plus' 
                  onClick={handleOnClick}
               />
               </button>
            </div>
            </>
            )
         }
      </div>
   );
};

export default Card;