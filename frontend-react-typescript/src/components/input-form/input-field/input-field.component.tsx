import '../input-field.styles.css';

type InputFieldProps = {
    label: string,
    type?: string,
    placeHolder?: string,
    value?: string,
    onValueChange: (value: string) => void
}

function InputField(props: InputFieldProps) {


    function handleTitleChange(event : React.ChangeEvent<HTMLInputElement>) {
        props.onValueChange(event.target.value);
    }

    return (
        <div>
            
            {/* Title */}
            <label className='modal-input-label'>{props.label}</label><br></br>
            
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