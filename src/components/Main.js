import React from 'react';
import Card from './Card';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CardListContext } from './contexts/CardListContext';

function Main(props) {
const currentUser = React.useContext(CurrentUserContext);
const cardList = React.useContext(CardListContext);
console.log(cardList);

    return(
      <>
<div className="profile root__section">
<div className="user-info">
  <div className="user-info__photo" style={{ backgroundImage: `url(${currentUser.avatar})` }}  onClick={props.onEditAvatar}></div>
  <div className="user-info__data">
    <h1 className="user-info__name">{currentUser.name}</h1>
    <p className="user-info__job">{currentUser.about}</p>
    <button className="button__edit" onClick={props.onEditProfile}>Edit</button>
  </div>
  <button className="button user-info__button" onClick={props.onAddPlace}>+</button>
</div>
</div>

<div className="places-list root__section">

{cardList.map((card, i) => 
      <Card key={i} card={card} onCardLike={props.handleCardLike} onCardDelete={props.onCardDelete} />
)}
</div>
  </>
    );
}
export default Main;





