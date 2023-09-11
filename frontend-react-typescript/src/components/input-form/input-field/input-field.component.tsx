import '../input-field.styles.css';

function InputField(props) {


    function handleTitleChange(event) {
        props.onValueChange(event.target.value);
    }

    return (
        <div>
            
            {/* Title */}
            <label className='modal-input-label' for="todoTitle">{props.label}</label><br></br>
            
            {/* Input */}
            <input 
                className='modal-input-text'
                type={props.type? props.type : "text"}  
                placeholder={props.placeHolder}
                onChange={handleTitleChange}
                value={props.value}
            />

        </div>
    );
}

export default InputField;