import NoDataImg from '../../assests/no-data.jpg';
import MyButton from '../button/button.component';

const NoDataCard = ({addTodoClick}) => {
  return (
    <div className='div-error-cont'>
        <img src={NoDataImg} className='max-w-xs h-60 object-contain m-3' alt="Error" />

        <p className='text-gray-600 font-bold text-lg'>Start Your Day Right!</p>
        <p className='max-w-sm text-gray-500 text-md mt-2 mb-3 font-semibold'>No todos? No problem! Begin your productive journey by adding your first task. Your success story begins here.</p>
        <MyButton 
            btnClassName="error-button"
            buttonText="Add Todo"
            onHandleClick={addTodoClick}
        />
    </div>
  )
}

export default NoDataCard;