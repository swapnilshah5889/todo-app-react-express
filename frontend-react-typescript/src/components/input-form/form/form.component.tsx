import { useState } from 'react';
import './form.styles.css';
import InputField from '../input-field/input-field.component';
import MyButton from '../../button/button.component';
import InputArea from '../input-text-area/input-text-area.component';
import { Todo, NewTodo } from '../../../types';

type FormProps = {
    todoJson: Partial<Todo>, 
    isLoading: boolean,
    isAdd: boolean,
    onAddClick?: (newTodoJson: NewTodo) => void,
    onUpdateClick?: (newTodoJson: Todo) => void,
    isOpen: boolean,
    formTitle: string,
    onClose: () => void,
    okayBtnText: string,
}

function Form({todoJson, isLoading, onAddClick, onUpdateClick, isAdd, isOpen, formTitle, onClose, okayBtnText}: FormProps){

    const [state, setState] = useState<{todoId?:string, todoTitle?: string, todoDesc?: string, todoIsDone?:boolean}>({
        todoId:todoJson._id,
        todoTitle:todoJson.title,
        todoDesc:todoJson.description,
        todoIsDone : todoJson.isDone
    });

    function handleTitleChange(title: string) {
        setState(prevState => ({ ...prevState, todoTitle: title }))
    }

    function handleDescChange(desc: string) {
        setState(prevState => ({ ...prevState, todoDesc: desc }))
    }

    function handleAddTodo() {
        // Valid todo
        if(state.todoDesc && state.todoTitle &&
            state.todoDesc.length > 0 && state.todoTitle.length > 0) {
            if(isAdd && onAddClick) {
                const newTodoJson: NewTodo = {title:state.todoTitle, 
                    description:state.todoDesc, isDone:state.todoIsDone};
                onAddClick(newTodoJson);
            }
            else if(!isAdd && onUpdateClick && state.todoId) {
                const newTodoJson: Todo = {_id:state.todoId, title:state.todoTitle, 
                    description:state.todoDesc, isDone:state.todoIsDone};
                onUpdateClick(newTodoJson)
            }
            else {
                onClose();
                alert("Something Went Wrong");
            }
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
                    placeHolder="Title"
                    onValueChange={handleTitleChange}
                    value={state.todoTitle}
                    label="Title"
                />
                
                {/* Description */}
                <InputArea 
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