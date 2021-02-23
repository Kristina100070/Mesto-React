import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function Card(props) {
const currentUser = React.useContext(CurrentUserContext);
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(i => i._id === currentUser._id);
const isOwn = props.card.owner._id === currentUser._id;

function handleLikeClick () {
  props.onCardLike(props.card);
}
function handleDeleteClick () {
  props.onCardDelete(props.card);
}
    return(
<div key={props.i} className="place-card"> 
      <div className="place-card__image" style={{ backgroundImage: `url(${props.card.link})` }}> 
        <button onClick={handleDeleteClick} className={isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}></button>
      </div>
      <div className="place-card__description">
        <h3 className="place-card__name">{props.card.name}</h3>
        <div className="place-card__like">
        <button onClick={handleLikeClick} className= {isLiked ? "place-card__like-icon_liked" : "place-card__like-icon"}  ></button>
        <p className="place-card__like-sum">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
    )
}
export default Card;