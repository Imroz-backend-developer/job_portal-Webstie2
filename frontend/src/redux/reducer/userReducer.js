import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_RESET,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_RESET,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_RESET,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_RESET,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_RESET,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_RESET,
    USER_SIGNUP_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from "../constants/userConstant";

// Define the initial state for the allUserReducer
const initialState = {
    success: false,
    users: {},  // Start with an empty array for users
    loading: false, // Loading starts as false
    error: null , // Error is initially null (no errors)
    adminCount: 0,
    jobCount: 0,
    categoryCount: 0,
    
};

// Sign-in reducer
export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false };
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            };
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload };
        case USER_SIGNIN_RESET:
            return {};
        default:
            return state;
    }
};

// Sign-up reducer
export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userSignUp: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNUP_RESET:
            return {};
        default:
            return state;
    }
};

// User profile reducer
export const userProfileReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null };
        case USER_LOAD_SUCCESS:
            return { loading: false, user: action.payload.user };
        case USER_LOAD_FAIL:
            return { loading: false, user: null, error: action.payload };
        case USER_LOAD_RESET:
            return {};
        default:
            return state;
    }
};

// Log-out reducer
export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true };
        case USER_LOGOUT_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT_RESET:
            return {};
        default:
            return state;
    }
};

// Apply for a job reducer
export const userApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_APPLY_JOB_REQUEST:
            return { loading: true };
        case USER_APPLY_JOB_SUCCESS:
            return { loading: false, userJob: action.payload };
        case USER_APPLY_JOB_FAIL:
            return { loading: false, error: action.payload };
        case USER_APPLY_JOB_RESET:
            return {};
        default:
            return state;
    }
};

// Reducer for handling all users data
export const allUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { ...state, loading: true, error: null };
        case ALL_USER_LOAD_SUCCESS:
            return { ...state, loading: false, users: action.payload.users || [], error: null };
        case ALL_USER_LOAD_FAIL:
            return { ...state, loading: false, error: action.payload, users: [] };
        case ALL_USER_LOAD_RESET:
            return { ...initialState };
        default:
            return state;
    }
};

// Reducer for updating user details
export const userUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { ...state, loading: true };
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return initialState;
        default:
            return state;
    }
};

// Reducer for fetching user details
export const userDetailsReducer = (state = { user: {}, loading: false, error: null }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Example: reducers/adminStatsReducer.js


const adminStatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADMIN_STATS_REQUEST":
            return { ...state, loading: true };
        case "ADMIN_STATS_SUCCESS":
            return {
                ...state,
                loading: false,
                adminCount: action.payload.adminCount,
                jobCount: action.payload.jobCount,
                categoryCount: action.payload.categoryCount,
                error: null,
            };
        case "ADMIN_STATS_FAILURE":
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
};

export default adminStatsReducer;