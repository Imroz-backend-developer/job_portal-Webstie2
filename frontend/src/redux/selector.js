// selectors.js
import { createSelector } from 'reselect';

const selectAdminStats = (state) => state.adminStats || {}; // Provide a default empty object

export const makeSelectAdminStats = createSelector(
    [selectAdminStats],
    (adminStats) => ({
        adminCount: adminStats.adminCount || 0,  // Use default value
        jobCount: adminStats.jobCount || 0,
        categoryCount: adminStats.categoryCount || 0,
        loading: adminStats.loading || true,
        error: adminStats.error || null,
    })
);
