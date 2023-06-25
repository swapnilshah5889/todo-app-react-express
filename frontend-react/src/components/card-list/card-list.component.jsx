import TodoCard from "../todo-card/todo-card.component";
import './card-list.styles.css';

function CardList(props) {

    const {toDoList} = props;
    
    function handleDelete(id) {
        props.onDeleteClick(id);
    }

    function handleEdit(todoJson) {
        props.onEditClick(todoJson);
    }

    return (
        <div className="todo-card-list">
            {toDoList.map((todoJson) => (
                <TodoCard 
                    todoData={todoJson}
                    onDeleteClick={handleDelete}
                    onEditClick={handleEdit}
                />
            ))}
        </div>
    );
}

export default CardList;