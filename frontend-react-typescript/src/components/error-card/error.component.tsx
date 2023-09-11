import ErrorLottie from '../../assets/error.json';
import './error.styles.scss';
import MyButton from '../button/button.component';
import Lottie from 'react-lottie';

type ErrorCardProps = {
  errorButtonClick: () => void
}

const ErrorCard = ({errorButtonClick}: ErrorCardProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ErrorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (

    <div className='div-error-cont'>

        <div className="max-w-sm">
            <Lottie 
                options={defaultOptions}
            />
        </div>
        <p className='error-title'>Something Went Wrong</p>
        <p className='error-text'>An unknow error occurred. Please try again after a while. If the problem persists then contact technical support</p>
        <MyButton 
            btnClassName="error-button"
            buttonText="Try Again"
            onHandleClick={errorButtonClick}
        />
    </div>
  )
}

export default ErrorCard;
