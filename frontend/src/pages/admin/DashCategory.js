import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobtypeactions';
import moment from 'moment';

const DashCategory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    let data = [];
    data = (jobType !== undefined && jobType.length > 0) ? jobType : [];

    // Delete job by ID
    const deleteJobCategoryById = (e, id) => {
        console.log(id);
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'JobTypeName',
            headerName: 'Catagri',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            ),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "black", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link>
                    </Button>
                    <Button onClick={(e) => deleteJobCategoryById(e, values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Jobs category
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "#ffffff", textDecoration: "none" }} to='/admin/category/create'>Create category</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black', // Pagination text color to black
                            },
                            '& .MuiDataGrid-row': {
                                color: 'black', // Row text color to black
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'black', // Cell text color to black
                                borderColor: 'rgba(255, 255, 255, 0.12)', // Optional: Cell border color
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1565C0', // Column header background color (blue)
                                color: 'black', // Column header text color to black
                            },
                            '& .MuiCheckbox-root svg': {
                                fill: 'black', // Checkbox color to black
                            },
                            '& .MuiDataGrid-footerContainer': {
                                color: 'black', // Footer text color to black
                            },
                            button: {
                                color: '#000000', // Button text color (black)
                            },
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.secondary.main, // Row background color
                            },
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default DashCategory;
