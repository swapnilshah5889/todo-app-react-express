import './todo-card.styles.css'
import deleteImg from '../../assests/delete.svg'
import editImg from '../../assests/edit.png'

function TodoCard(props) {

    const {todoData} = props;


    function handleDeleteTodo() {
        props.onDeleteClick(todoData.id);
    }

    function handleEditTodo() {
        props.onEditClick(todoData);
    }

    return (
        <div 
            key={todoData.id}
            className="todo-card-ctn">

            {/* Card title bar */}
            <div className='card-title-ctn'>
                
                {/* Title */}
                <h3 className='card-title-text'>{todoData.title}</h3>
                
                {/* Edit Button */}
                <img src={editImg} alt="Edit" width={20} height={20}
                    onClick={handleEditTodo}
                />
                
                {/* Delete Button */}
                <img src={deleteImg} alt="Delete" width={20} height={20}
                    onClick={handleDeleteTodo}
                />
            
            </div>

            {/* Description */}
            <p className='todo-description'>{todoData.description}</p>

        </div>
    );
}

export default TodoCard;