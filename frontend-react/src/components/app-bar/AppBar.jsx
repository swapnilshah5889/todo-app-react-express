import MyButton from '../button/button.component';
import { useMediaQuery } from 'react-responsive'
import AppLogo from '../../assests/todo-logo.png';
import React from 'react'

export const AppTitle = () => {
    return (
        <div className='flex items-center'>
            <img className='w-8 h-8 mr-3' src={AppLogo} alt="Logo"/>
            <div className='block'>
                <h1 style={{fontFamily:'cursive'}} className='sm:text-2xl md:text-3xl text-purple-700'>My Todo App</h1>
            </div>
        </div>
    );
}

const AppBar = ({toggleAddTodoForm, onLogoutClick}) => {

    const isTabletOrMobile = useMediaQuery({ maxWidth: 640 })  
    return (
        <div className='flex bg bg-blue-50 py-3 justify-between px-3 md:px-5'> 

            <AppTitle />
            <div className='flex'>
                <MyButton 
                    btnClassName="app-title-button"
                    buttonText={isTabletOrMobile? "Add" : "Add New Todo"}
                    onHandleClick={toggleAddTodoForm}
                />
                <MyButton 
                    btnClassName="app-title-button"
                    buttonText="Logout"
                    onHandleClick={onLogoutClick}
                />
            </div>
        </div>
    )
}

export default AppBar;