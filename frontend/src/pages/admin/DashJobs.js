import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobactions';

const DashJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    // Safely destructure the Redux state
    const { jobs = [], loading = true, error } = useSelector(state => state.loadJobs || {});

    // Log the jobs data to check its structure
    console.log("Jobs data:", jobs); // Log the jobs data

    // Handle delete job by ID (placeholder logic)
    const deleteJobById = (e, id) => {
        console.log('Deleting job with ID:', id);
        // Implement delete logic here
    };

    // Define columns for DataGrid
    const columns = [
        { field: '_id', headerName: 'Job ID', width: 150, editable: true },
        { field: 'Title', headerName: 'Job Name', width: 150 },
        {
            field: 'Jobtype',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => (params.row.Jobtype.JobTypeName)
                //const jobTypeMap = {
                   // "66fa3d157ff7b205c8259977": "Full-Time", // Add other mappings as needed
               // };
               // return jobTypeMap[params.row.Jobtype] || 'Unknown';
          //  },
        },
        
            {
                field: 'Firstname',
                headerName: 'First Name',
                renderCell: (params) => {
                    return params.row ? params.row.Firstname : 'N/A'; // Fallback to 'N/A' if row is null
                },
                // Other column properties
            },
            // Other columns
    {
            field: 'available',
            headerName: 'Available',
            width: 150,
            renderCell: (params) => (params.row.available ? "Yes" : "No"),
        },
        {
            field: 'Salary',
            headerName: 'Salary',
            type: 'number',
            width: 150,
            renderCell: (params) => (params.row.Salary !== undefined ? `$${params.row.Salary}` : 'N/A'),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <Button variant="contained">
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/edit/job/${params.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={(e) => deleteJobById(e, params.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    // Display loading or error state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
                Jobs List
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/job/create">Create Job</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-cell:hover': {
                                bgcolor: 'skyblue',
                                color: 'black',
                            },
                            '& .MuiDataGrid-row:hover': {
                                bgcolor: 'skyblue',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: 'blue', // Set the default row color to blue
                            },
                        }}
                        rows={jobs}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default DashJobs;
