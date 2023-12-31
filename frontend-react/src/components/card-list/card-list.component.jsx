import TodoCard from "../todo-card/todo-card.component";

function CardList(props) {

    const {toDoList} = props;
    
    function handleDelete(id) {
        props.onDeleteClick(id);
    }

    function handleEdit(todoJson) {
        props.onEditClick(todoJson);
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toDoList.map((todoJson, index) => {
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