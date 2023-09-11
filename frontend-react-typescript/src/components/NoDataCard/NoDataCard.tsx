import MyButton from '../button/button.component';
import { getLottieDefaultOptions } from '../../utils';
import NoDataLottie from '../../assets/no-data.json';
import Lottie from 'react-lottie';
import { AddTodoCardProps } from './types';


const NoDataCard = ({addTodoClick}: AddTodoCardProps) => {
  
  const lottieOptions = getLottieDefaultOptions(NoDataLottie);
  
  return (
    <div className='div-error-cont'>
        <div className="max-w-xs">
            <Lottie 
                options={lottieOptions}
            />
        </div>

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