import './button.styles.css';

function MyButton(props) {

    function handleButtonClick() {
        props.onHandleClick();
    }
    return (
        <div className="app-title-button-ctn">
            <button className={props.btnClassName} onClick={handleButtonClick}>{props.buttonText}</button>
        </div>
    )
}

export default MyButton;