import React from 'react'
import ErrorImage from '../../assests/error.jpg';
import './error.styles.scss';
import MyButton from '../button/button.component';

const ErrorCard = ({errorButtonClick}) => {
  return (
    <div className='div-error-cont'>
        <img src={ErrorImage} className='img-error' alt="Error" />

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
