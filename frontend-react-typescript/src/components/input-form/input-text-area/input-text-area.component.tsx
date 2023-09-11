import '../input-field.styles.css';

type InputAreaProps = {
    label: string,
    placeHolder?: string,
    value?: string,
    onValueChange: (value: string) => void
}

function InputArea(props: InputAreaProps) {

    function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        props.onValueChange(event.target.value);
    }

    return (
        <div>
            {/* Title */}
            <label className='modal-input-label'>{props.label}</label><br></br>
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