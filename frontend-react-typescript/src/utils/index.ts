// export const BASE_URL = "http://ec2-3-144-31-71.us-east-2.compute.amazonaws.com:3001";
export const BASE_URL = "http://localhost:3001";
export const USER_COOKIE = "user";

type Cookies = {
    username? : string;
}

export const IsUserLoggedIn = (cookies: Cookies) : boolean => {
    return !!cookies.username;
}

export const GetUsername = (cookies: Cookies) : string => {
    return cookies.username as string;
}

export const LottieDefaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};