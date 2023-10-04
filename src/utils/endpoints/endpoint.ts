import axios, {AxiosInstance} from "axios"
import { GET_BEARER_TOKEN } from "../helpers"
export const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}`
// export const BASE_URL = 'https://caveman-api.azurewebsites.net'


export const signUpUrl = `${BASE_URL}/api/auth/UserSignUp`
export const loginUrl = `${BASE_URL}/api/auth/Login`
export const verificationUrl = `${BASE_URL}/api/auth/VerifyToken`
export const sendTokenUrl  = `${BASE_URL}/api/auth/SendToken`
export const forgotPassword = `${BASE_URL}/api/auth/ForgotPassword`
export const resetPassword = `${BASE_URL}/api/auth/ResetPassword`

export const getUserProfile = `${BASE_URL}/api/auth/GetUserProfile?emailAddress=`
export const updateUserProfile = `${BASE_URL}/api/auth/UpdateUserProfile`

// watchType endpoints
export const getWatchTypes = `${BASE_URL}/api/Lookups/GetWatchTypes` //get
export const addWatchTypes = `${BASE_URL}/api/Lookups/AddWatchType` // POST request
export const modifyWatchTypes = `${BASE_URL}/api/Lookups/ModifyWatchType` // PUT request

// componentTypes endpoint
export const getComponentTypes = `${BASE_URL}/api/Lookups/GetComponentTypes`
export const addComponentType = `${BASE_URL}/api/Lookups/AddComponentType` // POST request
export const modifyComponentTypes = `${BASE_URL}/api/Lookups/ModifyComponentType` // PUT request

// sub components types
export const getSubComponentTypes = `${BASE_URL}/api/Lookups/GetComponentSubTypes`
export const addSubComponentTypes = `${BASE_URL}/api/Lookups/AddComponentSubType`
export const modifySubComponentTypes = `${BASE_URL}/api/Lookups/ModifyComponentSubType`

//components Type
export const getComponentsWithID = `${BASE_URL}/api/Lookups/GetComponents/3` //

//sub component type
export const getComponentWithID = `${BASE_URL}/api/Lookups/GetComponent/1`

//add component
export const addComponent = `${BASE_URL}/api/Lookups/AddComponent`

// modify component
export const modifyComponent = `${BASE_URL}/api/Lookups/ModifyComponent`
// new endpoint 
export const getDetails = `${BASE_URL}/api/Lookups/GetComponentDetails`





const API: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        
    }
});

API.interceptors.request.use(
    (config) => {
        // Modify the request config before sending it
        const token = GET_BEARER_TOKEN().bearerToken;

        // Add the token to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default API;