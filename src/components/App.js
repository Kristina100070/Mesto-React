import React from 'react';
import Header from "./Header";
import Main from "./Main";
import { Api } from './Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CardListContext } from './contexts/CardListContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";

function App() {
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState([false]);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState([false]);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState([false]);
   const [currentUser, setСurrentUser] = React.useState({});
   const [cardList, setCardList] = React.useState([]);

React.useEffect(() => {
      Api.getUserInfo()
      .then((data) => {
        setСurrentUser(data);
        
      });
});

React.useEffect(() => {
    Api.getInitialCards()
  .then((data) => {
    setCardList(data);
    });
});

function handleEditAvatarClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen); 
}
function handleEditProfileClick() {
  setIsAddPlacePopupOpen(!isAddPlacePopupOpen)   
}
function handleAddPlaceClick() {
  setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen) 
}
function closeAllPopups() {
  document.querySelector('.popup_is-opened').classList.remove("popup_is-opened");
}
function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    const newCards = cardList.map((c) => c._id === card._id ? newCard : c);
    setCardList(newCards);
  });
} 
function handleCardDelete (card) {
  Api.deleteCard(card._id)
    .then(() => {
      const newCards = cardList.filter((i) => (i._id !== card._id));
      setCardList(newCards);
    })
}
function handleUpdateUser(user) {
  Api.updateProfile(user.name, user.about)
  .then((data) => 
  setСurrentUser(data)
  );
  setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
}
function handleUpdateAvatar(data) {
  Api.updateAvatar(data.avatar)
  .then((res) => {
    
   document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`
  })
  
}
function handleAddPlaceSubmit(data) {
  Api.setCard(data.name, data.link)
  .then((newCard) => {
    setCardList([...cardList, newCard]); 
    console.log(newCard);
  })
  setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
}
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <CardListContext.Provider value={cardList}>
      <Header />
      <Main handleCardLike={handleCardLike} 
      onCardDelete={handleCardDelete} 
      onEditProfile={handleEditAvatarClick} 
      onAddPlace={handleEditProfileClick} 
      onEditAvatar={handleAddPlaceClick} />  
     
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}></EditProfilePopup>
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      
      </CardListContext.Provider>        
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
