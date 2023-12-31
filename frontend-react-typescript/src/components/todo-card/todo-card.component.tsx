import './todo-card.styles.css';
import deleteImg from '../../assets/delete.svg';
import editImg from '../../assets/edit.png';
import Lottie from 'react-lottie';
import LoaderLottie from '../../assets/blue-spinner.json';
import { Todo } from '../../types';

type CheckBoxProps = {
    isChecked?: boolean,
    onCheckBoxChange?: () => void,
    isLoading?: boolean
}

const CheckBox = ({isChecked=false, onCheckBoxChange , isLoading}: CheckBoxProps) => {
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                    dark:border-gray-600">
                </input>
            }
        </div>
    );

}

type TodoCardProps = {
    todoData: Todo,
    onDeleteClick: (todoId: string) => void,
    onEditClick: (todoData: Todo) => void,
    onStatusChange: (todoData: Todo) => void
}

type CardButtonProps = {
    btnImage: string,
    handleClick: () => void
}

const CardButton = ({btnImage, handleClick}: CardButtonProps) => {
    return (
        <div className='flex justify-center mt-3'>
            <img className='max-w-5 max-h-5' src={btnImage} alt="Edit" 
                onClick={handleClick}
            />
        </div>
    );
}

function TodoCard({todoData, onDeleteClick, onEditClick, onStatusChange}: TodoCardProps) {

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
                <div className='grid grid-cols-12'>
                    
                    {/* Title */}   
                    <div className='col-span-9 px-5 py-3'>
                        <p className='card-title-text'>{todoData.title}</p>
                    </div>
                    
                    <div className='col-span-3 flex justify-evenly'>
                        {/* Edit Button */}
                        <CardButton 
                            btnImage={editImg}
                            handleClick={handleEditTodo}
                        />
                        
                        {/* Delete Button */}
                        <CardButton 
                            btnImage={deleteImg}
                            handleClick={handleDeleteTodo}
                        />
                    
                    </div>
                
                </div>
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