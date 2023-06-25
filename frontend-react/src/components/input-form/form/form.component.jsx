import { useState } from 'react';
import './form.styles.css';
import InputField from '../input-field/input-field.component';

function Form(props){

    const [state, setState] = useState({
        todoTitle:'',
        todoDesc:''
    });

    function handleTitleChange(title) {
        setState(prevState => ({ ...prevState, todoTitle: title }))
    }

    function handleDescChange(desc) {
        setState(prevState => ({ ...prevState, todoDesc: desc }))
    }

    function handleAddTodo() {
        let todoJson = {title:state.todoTitle, description:state.todoDesc};
        props.onAddClick(todoJson);
    }

    return(
        <div className={`modal ${props.isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                
                <h3 className='modal-title'>Add Todo</h3>

                {/* Title */}
                <InputField 
                    id="todoTitle"
                    placeHolder="Title"
                    onValueChange={handleTitleChange}
                    value={state.todoTitle}
                    label="Title"
                />
                
                {/* Description */}
                <InputField 
                    id="todoDesc"
                    placeHolder="Description"
                    onValueChange={handleDescChange}
                    value={state.todoDesc}
                    label="Description"
                />

                <br />
                
                <div className='button-container'>
                    <button className='modal-content-button cancel' onClick={props.onClose}>Close</button>
                    <button className='modal-content-button save' onClick={handleAddTodo}>Add Todo</button>
                </div>
            </div>
        </div>

    );
}

export default Form;