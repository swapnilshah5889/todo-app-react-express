import MyButton from '../button/button.component';
import { LottieDefaultOptions } from '../../utils';
import NoDataLottie from '../../assets/no-data.json';
import Lottie from 'react-lottie';

const NoDataCard = ({addTodoClick}) => {
  
  LottieDefaultOptions['animationData'] = NoDataLottie;

  return (
    <div className='div-error-cont'>
        <div className="max-w-xs">
            <Lottie 
                options={LottieDefaultOptions}
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