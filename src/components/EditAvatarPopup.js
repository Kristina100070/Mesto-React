import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const [validForm, setValidForm] = React.useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

      function handleAvatar(e) {
        setValidForm(e.target.checkValidity());
         props.formValidation(e);
         
       }
    return(  
<PopupWithForm 
validForm={validForm}
onSubmit={handleSubmit}
isOpen={!props.isOpen ? "popup_is-opened" : "" } 
onClose={props.onClose} 
name="avatar" 
title="Обновить аватар" 
button="+" 
children={
          <div>
          <input id="link"
          type="url"
          name="link" 
          className="popup__input popup__input_type_link-url"
          ref={avatarRef}
          required 
          minLength="2"
          
          onChange={handleAvatar} />
          <span id="error" className="error"></span></div>
       } />
)
}
export default EditAvatarPopup;