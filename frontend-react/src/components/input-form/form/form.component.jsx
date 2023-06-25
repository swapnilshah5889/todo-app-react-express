import { useState } from 'react';
import './form.styles.css';
import InputField from '../input-field/input-field.component';
import MyButton from '../../button/button.component';
import InputArea from '../input-text-area/input-text-area.component';

function Form(props){

    const [state, setState] = useState({
        todoTitle:props.todoJson.title,
        todoDesc:props.todoJson.description
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
                
                <h3 className='modal-title'>{props.formTitle}</h3>

                {/* Title */}
                <InputField 
                    id="todoTitle"
                    placeHolder="Title"
                    onValueChange={handleTitleChange}
                    value={state.todoTitle}
                    label="Title"
                />
                
                {/* Description */}
                <InputArea 
                    id="todoDesc"
                    placeHolder="Description"
                    onValueChange={handleDescChange}
                    value={state.todoDesc}
                    label="Description"
                />

                <br />
                
                <div className='button-container'>
                    <MyButton 
                        btnClassName="form-button cancel-btn"
                        onHandleClick={props.onClose}
                        buttonText="Close"
                    />
                    <MyButton 
                        btnClassName="form-button okay-btn"
                        onHandleClick={handleAddTodo}
                        buttonText="Add Todo"
                    />
                </div>
            </div>
        </div>

    );
}

export default Form;