import './button.styles.css';
import LoadingLottie from '../../assests/btn-loader.json';
import Lottie from 'react-lottie';

const LoadingButton = ({buttonText, isLoading}) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingLottie,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='flex items-center justify-center'>
            {isLoading && 
                <div className='w-5 h-5 mr-2'>
                    <Lottie 
                        options={defaultOptions}
                    />
                </div>
            }
            <p>{buttonText}</p>
        </div>
    );
}

function MyButton({btnClassName, buttonText, onHandleClick ,isLoading=false, loadingText="Loading..."}) {

    const btnClass = isLoading? btnClassName+" btn-loading" : btnClassName;
    function handleButtonClick() {
        if(!isLoading) {
            onHandleClick();
        }
    }
    return (
        <div className="app-title-button-ctn">
        <button className={`app-title-button ${btnClass}`} onClick={handleButtonClick}>
            <LoadingButton isLoading={isLoading} buttonText={!isLoading? buttonText : loadingText} /> 
        </button>
        </div>
    )
}

export default MyButton;