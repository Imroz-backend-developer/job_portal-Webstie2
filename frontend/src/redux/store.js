import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
    deleteJobReducer,
    loadJobReducer,
    loadJobSingleReducer,
    registerAjobReducer,
    updateJobReducer
} from './reducer/jobreducer';


import {
    createJobTypeReducer,
    loadJobTypeReducer
} from './reducer/jobtypereducer';

import {
    allUserReducer,
    userApplyJobReducer,
    userReducerLogout,
    userReducerSignIn,
    userReducerSignUp,
    userProfileReducer 
} from './reducer/userReducer';
import adminStatsReducer from './reducer/adminreducer';

//combine reducers
const reducer = combineReducers({   
    loadJobs: loadJobReducer, //1
    jobTypeAll: loadJobTypeReducer,//2
    signIn: userReducerSignIn,//3
    logOut: userReducerLogout,//4
    userProfile: userProfileReducer,//5
    singleJob: loadJobSingleReducer,//6
    userJobApplication: userApplyJobReducer,//7
    allUsers: allUserReducer,//8
    signUp: userReducerSignUp,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer,
    updateJob: updateJobReducer,
    adminStats: adminStatsReducer,

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;