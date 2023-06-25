import './todo-card.styles.css'
import deleteImg from '../../assests/delete.svg'
import editImg from '../../assests/edit.png'

function TodoCard(props) {

    const {todoData} = props;

    return (
        <div 
            key={todoData.id}
            className="todo-card-ctn">

            <div className='card-title-ctn'>
                <h3 className='card-title-text'>{todoData.title}</h3>
                <img src={editImg} alt="Image" width={20} height={20}/>
                <img src={deleteImg} alt="Image" width={20} height={20}/>
            </div>
            <p>{todoData.description}</p>

        </div>
    );
}

export default TodoCard;