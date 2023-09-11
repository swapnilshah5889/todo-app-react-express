import { useState } from 'react';
import './form.styles.css';
import InputField from '../input-field/input-field.component';
import MyButton from '../../button/button.component';
import InputArea from '../input-text-area/input-text-area.component';

function Form({todoJson, isLoading, onAddClick, isOpen, formTitle, onClose, okayBtnText}){

    const [state, setState] = useState({
        todoId:todoJson._id,
        todoTitle:todoJson.title,
        todoDesc:todoJson.description,
        todoIsDone : todoJson.isDone
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
            let newTodoJson = {_id:todoJson._id, title:state.todoTitle, 
                description:state.todoDesc, isDone:state.todoIsDone};
            onAddClick(newTodoJson);
        }
        else {
            alert("Invalid Todo!");
        }
    }

    return(
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                
                <h3 className='modal-title'>{formTitle}</h3>

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
                        onHandleClick={onClose}
                        buttonText="Close"
                        isLoading={isLoading}
                        showLoader={false}
                    />
                    <MyButton 
                        btnClassName="form-button okay-btn"
                        onHandleClick={handleAddTodo}
                        buttonText={okayBtnText}
                        isLoading={isLoading}
                        loadingText="Adding todo..."
                    />
                </div>
            </div>
        </div>

    );
}

export default Form;