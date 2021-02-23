import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
   
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 


    return(  
<PopupWithForm 
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
          minLength="2" />
          <span id="error" className="error"></span></div>
       } />
)
}
export default EditAvatarPopup;