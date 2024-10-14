import { combineReducers } from 'redux';
import adminStatsReducer from './adminreducer'; // Adjust the path according to your structure
// Import other reducers if you have them

const rootReducer = combineReducers({
    adminStats: adminStatsReducer,
    // other reducers can be added here
});

export default rootReducer;
