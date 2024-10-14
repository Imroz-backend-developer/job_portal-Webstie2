const initialState = {
    success: false,
    users: {},  // Start with an empty object for users
    loading: false,
    error: null,
    adminCount: 0,
    jobCount: 0,
    categoryCount: 0,
};

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
