import closeIcon from "../images/close.svg";

function PopupWithForm(props) {
  //className={`button popup__button popup__button_info ${props.activButton}`}
  console.log(props.formValid);
    return(

<div className={`popup popup__${props.name} ${props.isOpen}`} >
  <div className="popup__content">
    <img src={closeIcon} alt="" className="popup__close" onClick={props.onClose} />
    <h3 className="popup__title">{props.title}</h3>
    <form className="popup__form_info" onSubmit={props.onSubmit} name={props.name} noValidate>
      <div>{props.children}</div>
        <button type="submit" className={!props.formValid ? "button popup__button popup__button_info" : "button popup__button popup__button_info popup__button_activ"}>{props.button}</button>
    </form>
  </div>
</div>
    )
}
export default PopupWithForm;