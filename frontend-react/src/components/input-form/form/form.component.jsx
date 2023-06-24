import './form.styles.css';

function Form(props){
    return(
        <div className={`modal ${props.isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                
                {/* Title */}
                <label id='modal-content' for="todoTitle">To-Do title</label><br></br>
                <input type="text" id="todoTitle" placeholder="Title"></input>
                <br /><br />
                
                {/* Description */}
                <label id='modal-content' for="todoDesc">To-Do Description</label><br/>
                <input type="text" id="todoDesc" placeholder="Description" />
                <br /><br />

                <div className='button-container'>
                    <button className='modal-content-button cancel' onClick={props.onClose}>Close</button>
                    <button className='modal-content-button save' onClick={props.onClose}>Add Todo</button>
                </div>
            </div>
        </div>

    );
}

export default Form;