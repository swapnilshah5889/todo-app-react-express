import { useState } from "react";
import { AppTitle } from "../../components/app-bar/AppBar";
import MyButton from "../../components/button/button.component";
import InputField from "../../components/input-form/input-field/input-field.component";
import axios from 'axios';
import { BASE_URL } from "../../utils";

const LoginCard = ({registerClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [error, setError] = useState();

    const validateInputs = () => {
        if(email.length>0 && password.length>0)
            return true;
        return false;
    }

    const loginAPI = async () => {
        try {
            const data = {
                username: email,
                password: password
            }
            const config = {
                headers: {
                'Content-Type': 'application/json'  
                }
            }
            const response = await axios.post(BASE_URL+"/userlogin", JSON.stringify(data), config);

            // N/W error
            if(response.statusText !== 'OK') {
                setError('Something went wrong');
                return;
            }

            // API Error
            if(!response.data.status) {
                setError(response.data.message);
                return;
            }

            // Login Success
            setError(undefined);

        } catch (error) {
            if(error.response?.data?.message) {
                setError(error.response.data.message);
                return;
            }
            setError("Something went wrong");
        }
    }
    
    const handleEmailChange = (email) => {
        setEmail(email);
    };
    
    const handlePasswordChange = (password) => {
        setPassword(password);
    };

    const handleLogin = () => {
        if(validateInputs())
            loginAPI();
    };

    const handleRegisterClick = () => {
        registerClick();
    };

    return (
        <div className="flex flex-col justify-center">
            <h3 style={{fontFamily:'cursive', fontSize:'24px', color:'#8A2BE2'}} 
            className='m-3 inline-flex justify-center items-center'>Login</h3>
            {error && 
                <p className="inline-flex justify-center text-red-600 text-sm mb-2">{error}</p>
            }
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
    const [error, setError] = useState();

    const validateInputs = () => {
        if(email.length>0 && password.length>0) {

            if(confPassword === password){
                setError(undefined);
                return true;
            }
            else {
                setError("Passwords do not match");
            }
        }
        return false;
    }

    const signupAPI = async () => {
        try {
            const data = {
                username: email,
                password: password
            }
            const config = {
                headers: {
                'Content-Type': 'application/json'  
                }
            }

            const response = await axios.post(BASE_URL+"/signup", JSON.stringify(data), config);

            // N/W error
            if(response.statusText !== 'OK') {
                setError(response.data.message);
                return;
            }

            // API Error
            if(!response.data.status) {
                setError(response.data.message);
                return;
            }

            // Register Success
            setError(undefined);

        } catch (error) {
            if(error.response?.data?.message) {
                setError(error.response.data.message);
                return;
            }
            setError("Something went wrong");
        }
    }
    
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
        if(validateInputs())
            signupAPI();
    };

    const handleLoginClick = () => {
        loginClick();
    };

    return (
        <div className="flex flex-col justify-center">
            <h3 style={{fontFamily:'cursive', fontSize:'24px', color:'#8A2BE2'}} 
            className='m-3 inline-flex justify-center items-center'>Sign Up</h3>

            {error && 
                <p className="inline-flex justify-center text-red-600 text-sm mb-2">{error}</p>
            }

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