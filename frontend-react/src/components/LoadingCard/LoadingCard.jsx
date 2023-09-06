import React from "react";
import LoaderAnimation from '../../assests/loader.json';
import Lottie from 'react-lottie';


const LoadingCard = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    return (
        <div className="m-10 flex flex-col justify-center items-center">
            <div className=" max-w-md">
                <Lottie 
                    options={defaultOptions}
                />
            </div>
            <p className='text-gray-600 font-bold text-md'>Loading Your Tasks for the Day...</p>
            <p className='max-w-sm text-gray-500 text-sm mt-2 mb-3 font-semibold'>Harnessing Your Productive Potential – Just a Few Moments Away!</p>
        </div>
  )
}

export default LoadingCard;
