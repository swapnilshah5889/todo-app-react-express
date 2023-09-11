// export const BASE_URL = "http://ec2-3-144-31-71.us-east-2.compute.amazonaws.com:3001";
export const BASE_URL = "http://localhost:3001" as string;
export const USER_COOKIE = "user" as string;
import { Options } from "react-lottie";
import { Cookies } from "./types";


export const IsUserLoggedIn = (cookies: Cookies) : boolean => {
    return !!cookies.username;
}

export const GetUsername = (cookies: Cookies) : string => {
    return cookies.username as string;
}

export const getLottieDefaultOptions = (animationData: object): Options => {

    const options: Options = {
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
        animationData: animationData
    }

    return options;
};