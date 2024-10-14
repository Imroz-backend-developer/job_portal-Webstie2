const User = require('../models/usermodel');
const Job = require('../models/JobModel');
const Jobtype = require('../models/JobtypeModel');

// Controller to get admin stats
exports.getAdminStats = async (req, res) => {
    try {
        const adminCount = await User.countDocuments({ role: '1' }); // Assuming 'role' field determines if a user is 1
        const jobCount = await Job.countDocuments(); // Total number of jobs
        const categoryCount = await Jobtype.countDocuments(); // Total number of categories

        res.status(200).json({
            success: true,
            adminCount,
            jobCount,
            categoryCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load admin statistics',
            error: error.message
        });
    }
};
