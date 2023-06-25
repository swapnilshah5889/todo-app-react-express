import TodoCard from "../todo-card/todo-card.component";
import './card-list.styles.css';

function CardList(props) {

    const {toDoList} = props;
    return (
        <div className="todo-card-list">
            {toDoList.map((todoJson) => (
                <TodoCard 
                    todoData={todoJson}
                />
            ))}
        </div>
    );
}

export default CardList;