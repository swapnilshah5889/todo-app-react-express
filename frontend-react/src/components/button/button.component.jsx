import './button.styles.css';

function MyButton(props) {

    function handleButtonClick() {
        props.onHandleClick();
    }
    return (
        <div className='app-title-container'> 
            <h1 className='h1-title'>{props.buttonText}</h1>
            <div className='app-title-button-ctn'>
                <button className='app-title-button' onClick={handleButtonClick}>Add New Todo</button>
            </div>
        </div>
    )
}

export default MyButton;