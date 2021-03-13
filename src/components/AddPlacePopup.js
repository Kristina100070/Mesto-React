import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
   
        const [cardName, setCardName] = React.useState("");
        const [cardLink, setCardLink ] = React.useState("");
        const [validForm, setValidForm] = React.useState({
          validName: false,
          validLink: false
        });

    function handleSubmit(e) {
      e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
      props.onAddPlace({
        name: cardName,
        link: cardLink,
      });
    } 
    
    function handleName(e) {
        setCardName(e.target.value);
        props.formValidation(e);
        setValidForm({...validForm, validName: e.target.checkValidity()});
    }
    function handleLink(e) {
        setCardLink(e.target.value);
        props.formValidation(e);
        setValidForm({...validForm, validLink: e.target.checkValidity()});
    }
    return (
        <PopupWithForm validForm={validForm} onSubmit={handleSubmit} isOpen={!props.isOpen ? "popup_is-opened" : "" } onClose={props.onClose} name="card" title="Новое место" button="+" children={
            <div>
              <input id="name"
              onChange={handleName} 
              type="text" 
              name="cardName"
              className="popup__input popup__input_type_name popup__card_name"
              placeholder="Имя карточки" 
              value={cardName}
              required 
              minLength="2" 
              maxLength="30"
              />
              <span id="error" className="error"></span>

              <input id="link" 
              onChange={handleLink}
              type="url"
              name="link"
              className="popup__input popup__input_type_link-url popup__card_link" 
              placeholder="Ссылка" 
              value={cardLink}
              required 
              minLength="2" 
              />
              <span id="error" className="error"></span>
            </div>} />
  )
}
export default AddPlacePopup;