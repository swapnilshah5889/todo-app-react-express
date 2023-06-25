function TodoCard(props) {

    const {todoData} = props;

    return (
        <div className="todo-card-ctn">
            <h3>{todoData.title}</h3>
            <p>{todoData.description}</p>
        </div>
    );
}

export default TodoCard;