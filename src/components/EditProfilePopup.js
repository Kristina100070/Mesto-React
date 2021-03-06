import React from 'react';
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from './contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
    const [name , setName] = React.useState(currentUser.name);
    const [description , setDescription ] = React.useState(currentUser.about);

    const [validForm, setValidForm] = React.useState({
      validName: true,
      validDescription: true
    });



React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser]); 

function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  // Передаём значения управляемых компонентов во внешний обработчик
  props.onUpdateUser({
    name,
    about: description,
  });
} 

function handleName(e) {
 setValidForm({...validForm, validName: e.target.checkValidity()});
  setName(e.target.value);
  props.formValidation(e);
  
}
function handleDescription(e) {
  setValidForm({...validForm, validDescription: e.target.checkValidity()});
  setDescription(e.target.value);
  props.formValidation(e);

}

    return(
<PopupWithForm 
validForm={validForm}
onSubmit={handleSubmit}
  isOpen={props.isOpen ? "" : "popup_is-opened" } 
  onClose={props.onClose} 
  name="edit" 
  title="Редактировать профиль" 
  button="Сохранить" 
  children={
        <div>
          <div>
          <input onChange={handleName} id="nameinfo" 
         type="text"
          name="userName" 
          className="popup__input popup__input_type_nameinfo" 
          placeholder="Имя"
          defaultValue={name}
          required 
          minLength="2" 
          />
          <span id="error" className="error"></span></div>

          <div>
          <input id="job" 
          onChange={handleDescription}
          type="text" 
          name="job" 
          className="popup__input popup__input_type_job"
          defaultValue={description}
          placeholder="Профессия"
          required 
          minLength="2" 
          />
          <span id="error" className="error"></span></div>
        
        </div>} />
    )
}
export default EditProfilePopup;