import { useState } from 'react';
import './form.styles.css';
import InputField from '../input-field/input-field.component';
import MyButton from '../../button/button.component';
import InputArea from '../input-text-area/input-text-area.component';

function Form(props){

    const [state, setState] = useState({
        todoId:props.todoJson._id,
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
        // Valid todo
        if(state.todoDesc && state.todoTitle &&
            state.todoDesc.length > 0 && state.todoTitle.length > 0) {
            let todoJson = {_id:props.todoJson._id, title:state.todoTitle, description:state.todoDesc};
            props.onAddClick(todoJson);
        }
        else {
            alert("Invalid Todo!");
        }
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
                        buttonText={props.okayBtnText}
                    />
                </div>
            </div>
        </div>

    );
}

export default Form;