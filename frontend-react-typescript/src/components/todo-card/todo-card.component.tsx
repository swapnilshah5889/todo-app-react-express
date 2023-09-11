import './todo-card.styles.css';
import deleteImg from '../../assets/delete.svg';
import editImg from '../../assets/edit.png';
import Lottie from 'react-lottie';
import LoaderLottie from '../../assets/blue-spinner.json';


const CheckBox = ({isChecked=false, onCheckBoxChange , isLoading}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderLottie,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            {isLoading?
                <div className='w-4 h-4'>
                    <Lottie 
                        options={defaultOptions}
                    />
                </div>
                :
                <input 
                    checked={isChecked} 
                    onChange={onCheckBoxChange}
                    type="checkbox" 
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                    dark:border-gray-600">
                </input>
            }
        </div>
    );

}

function TodoCard({todoData, onDeleteClick, onEditClick, onStatusChange}) {

    function handleDeleteTodo() {
        onDeleteClick(todoData._id);
    }

    function handleEditTodo() {
        onEditClick(todoData);
    }

    function onCheckBoxChange() {
        todoData.isDone = !todoData.isDone;
        onStatusChange(todoData);
    }

    return (
        <div 
            key={todoData._id}
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

            <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-10'>
                    <p className='todo-description'>{todoData.description}</p>
                </div>

                {/* Completed Status */}
                <div className='flex col-span-2 justify-center items-center'>
                    
                    <CheckBox 
                        isChecked={todoData.isDone}
                        onCheckBoxChange={onCheckBoxChange}
                        isLoading={todoData.isLoading}
                    />
                </div>
            </div>

            

        </div>
    );
}

export default TodoCard;