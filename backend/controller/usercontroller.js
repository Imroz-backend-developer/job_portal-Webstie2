const User = require('../models/usermodel');
const ErrorResponse=require('../utilits/errorResponse');

//load allusers
exports.alluser = async (req, res, next) => {
    // Enable pagination
    const pageSize = 10;
    const page = Number(req.query.pagenumber) || 1;

    try {
        // Get the estimated count of all users
        const count = await User.countDocuments();

        // Fetch the paginated users
        const users = await User.find()
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .select('-password') // Exclude the password field
            .skip(pageSize * (page - 1)) // Skip the records for previous pages
            .limit(pageSize); // Limit the results to the page size

        // Respond with paginated users
        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize), // Calculate total pages
            count // Total count of users
        });
    } catch (error) {
        return next(error);
    }
};

//Find single user
exports.singleUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id).select('-password');
        res.status(201).json({
            success:true,
            user
        })
        next();
    } catch (error) {
        return next(error)
    }
};
//Edit user data
exports.edituser=async(req,res,next)=>{
    try {
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
            success:true,
            user
        })
        next();
    } catch (error) {
        return next()
    }
};

//Delete the user
exports.Deleteuser=async(req,res,next)=>{
    try {
        const user=await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success:true,
            message:"user delete successfully"
        })
        next();
    } catch (error) {
        return next()
    }
};
//jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    try {
        // Ensure the user is authenticated
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "You must log in to add job history"
            });
        }

        // Destructure job details from request body
        const { Title, Description, salary, location } = req.body;

        // Create the new job history entry
        const newJobHistory = {
            Title,
            Description,
            salary,
            location,
            user: req.user._id
        };

        // Add new job history to the user's jobsHistory array
        currentUser.jobsHistory.push(newJobHistory);

        // Save the updated user document
        await currentUser.save();

        // Respond with success and updated user data
        res.status(200).json({
            success: true,
            message: "Job history added successfully",
            jobsHistory: currentUser.jobsHistory
        });
        
    } catch (error) {
        // Pass any errors to the next middleware (error handler)
        next(error);
    }
};
