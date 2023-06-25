import { useState } from 'react';
import './form.styles.css';

function Form(props){

    const [state, setState] = useState({
        todoTitle:'',
        todoDesc:''
    });

    function handleTitleChange(event) {
        setState(prevState => ({ ...prevState, todoTitle: event.target.value }))
    }

    function handleDescChange(event) {
        setState(prevState => ({ ...prevState, todoDesc: event.target.value }))
    }

    function handleAddTodo() {
        let todoJson = {title:state.todoTitle, description:state.todoDesc};
        props.onAddClick(todoJson);
    }

    return(
        <div className={`modal ${props.isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                
                {/* Title */}
                <label id='modal-content' for="todoTitle">To-Do title</label><br></br>
                <input 
                    type="text" 
                    id="todoTitle" 
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={state.todoTitle}
                />
                <br /><br />
                
                {/* Description */}
                <label id='modal-content' for="todoDesc">To-Do Description</label><br/>
                <input 
                    type="text" 
                    id="todoDesc" 
                    placeholder="Description" 
                    onChange={handleDescChange}
                    value={state.todoDesc}
                />
                <br /><br />

                <div className='button-container'>
                    <button className='modal-content-button cancel' onClick={props.onClose}>Close</button>
                    <button className='modal-content-button save' onClick={handleAddTodo}>Add Todo</button>
                </div>
            </div>
        </div>

    );
}

export default Form;