import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstant';

export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/Singin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/Singup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/Logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me",{
            headers: { 'Cache-Control': 'no-cache' },
        });
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// Action to load all users
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });

    try {
        const { data } = await axios.get('/api/alluser', {
            headers: { 'Cache-Control': 'no-cache' },
        });

        // Log the API response for debugging
        console.log('API Data:', data);

        // Dispatch the success action with the correct payload
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data, // Assuming 'data' is the array of users
        });

    } catch (error) {
        console.error('API Error:', error);

        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error // Fallback if the error has a specific structure
                : error.message, // Fallback to a generic error message
        });
    }
};

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        await axios.delete(`/api/user/delete/${id}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.message });
    }
};
// Fetch user details by ID
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const token = localStorage.getItem('token'); // Adjust this based on where you store your token
        const { data } = await axios.get(`/api/User/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // or whatever scheme you're using
            }, // Make an API call to get user details
        }); // Missing closing brackets added here
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
    }
}

// Update user details
// Update user action
export const updateUserAction = (userData) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState(); // Assuming you're storing logged-in user data in userInfo

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // Make sure userInfo contains a valid token
            },
        };

        const { data } = await axios.put(`/api/User/edit/${userData._id}`, userData, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
// Action for fetching admin stats (new)
export const fetchAdminStats = () => async (dispatch) => {
    dispatch({ type: 'ADMIN_STATS_REQUEST' });
    try {

        const config = {
            headers: {
              'Cache-Control': 'no-cache',
            },
        };
        const { data } = await axios.get("/api/admin/stats",config); // Change the endpoint as needed
        dispatch({
            type: 'ADMIN_STATS_SUCCESS',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'ADMIN_STATS_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};