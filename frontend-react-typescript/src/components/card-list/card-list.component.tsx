import TodoCard from "../todo-card/todo-card.component";
import { Todo } from "../../types";

type CardListProps = {
    toDoList: Todo[],
    onDeleteClick: (id: string) => void,
    onEditClick: (todoJson: Todo) => void,
    onStatusChange: (todoJson: Todo) => void,
}

function CardList(props: CardListProps) {

    const {toDoList} = props;
    
    function handleDelete(id: string) {
        props.onDeleteClick(id);
    }

    function handleEdit(todoJson: Todo) {
        props.onEditClick(todoJson);
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toDoList.map((todoJson: Todo) => {
                return (
                <TodoCard 
                    key={todoJson._id}
                    todoData={todoJson}
                    onDeleteClick={handleDelete}
                    onEditClick={handleEdit}
                    onStatusChange={props.onStatusChange}
                />
            );})}
        </div>
    );
}

export default CardList;