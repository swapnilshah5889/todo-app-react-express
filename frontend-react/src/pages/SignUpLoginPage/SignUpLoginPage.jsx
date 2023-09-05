import { useState } from "react";
import { AppTitle } from "../../components/app-bar/AppBar";
import MyButton from "../../components/button/button.component";
import InputField from "../../components/input-form/input-field/input-field.component";

const LoginCard = ({registerClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleEmailChange = (email) => {
        setEmail(email);
    };
    
    const handlePasswordChange = (password) => {
        setPassword(password);
    };

    const handleLogin = () => {
        console.log(email);
        console.log(password);
    };

    const handleRegisterClick = () => {
        registerClick();
    };

    return (
        <div className="flex flex-col justify-center">
            <h3 style={{fontFamily:'cursive', fontSize:'24px', color:'#8A2BE2'}} 
            className='m-3 inline-flex justify-center items-center'>Login</h3>
            <InputField 
                id="userEmail"
                placeHolder="Email"
                onValueChange={handleEmailChange}
                value={email}
                label="Email"
            />
            <InputField 
                id="userPassword"
                placeHolder="Password"
                onValueChange={handlePasswordChange}
                value={password}
                type = "password"
                label="Password"
            />

            <div className="flex justify-end mt-1">
                <p>New User? </p>
                <a onClick={handleRegisterClick}
                className="ml-2 font-medium text-blue-600 hover:underline">Register here</a>
            </div>

            <div className="inline-flex justify-center mt-5">
                <MyButton 
                    btnClassName="form-button app-title-button"
                    onHandleClick={handleLogin}
                    buttonText="Login"
                />
            </div>
        </div>
    );
}

const SignUpCard = ({loginClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    
    const handleEmailChange = (email) => {
        setEmail(email);
    };
    
    const handlePasswordChange = (password) => {
        setPassword(password);
    };
    
    const handleConfPasswordChange = (password) => {
        setConfPassword(password);
    };

    const handleSignUp = () => {
        console.log(email);
        console.log(password);
    };

    const handleLoginClick = () => {
        loginClick();
    };

    return (
        <div className="flex flex-col justify-center">
            <h3 style={{fontFamily:'cursive', fontSize:'24px', color:'#8A2BE2'}} 
            className='m-3 inline-flex justify-center items-center'>Sign Up</h3>
            <InputField 
                id="userEmail"
                placeHolder="Email"
                onValueChange={handleEmailChange}
                value={email}
                label="Email"
            />
            <InputField 
                id="userPassword"
                placeHolder="Password"
                onValueChange={handlePasswordChange}
                value={password}
                type = "password"
                label="Password"
            />
            <InputField 
                id="userConfPassword"
                placeHolder="Confirm Password"
                onValueChange={handleConfPasswordChange}
                value={confPassword}
                type = "password"
                label="Confirm Password"
            />

            <div className="flex justify-end mt-1">
                <p>Already a User? </p>
                <a onClick={handleLoginClick}
                className="ml-2 font-medium text-blue-600 hover:underline">Login here</a>
            </div>

            <div className="inline-flex justify-center mt-5">
                <MyButton 
                    btnClassName="form-button app-title-button"
                    onHandleClick={handleSignUp}
                    buttonText="Register"
                />
            </div>
        </div>
    );
}

const SignUpLoginPage = () => {


    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col justify-center items-center m-10">
            <AppTitle isLogin={isLogin} />

            <div className="max-w-sm p-6 mt-7 rounded-xl overflow-hidden shadow-xl">
                {isLogin ?
                    <LoginCard 
                        registerClick={() => setIsLogin(false)}
                    />
                :
                    <SignUpCard 
                        loginClick={() => setIsLogin(true)}
                    />
                }
            </div>
        </div>
    );

};

export default SignUpLoginPage;