import '../input-field.styles.css';

function InputArea(props) {

    function handleOnChange(event) {
        props.onValueChange(event.target.value);
    }

    return (
        <div>
            {/* Title */}
            <label className='modal-input-label' for="todoTitle">{props.label}</label><br></br>
            <textarea
                placeholder={props.placeHolder}
                onChange={handleOnChange}
                className='modal-input-text text-area'
                value={props.value}
                rows={3}
            />
        </div>
    );
}

export default InputArea;