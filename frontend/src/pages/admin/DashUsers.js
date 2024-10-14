import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { allUserAction, deleteUserAction } from '../../redux/actions/userAction';
import { Alert } from '@mui/material';  // For Snackbar with alert styles

const DashUsers = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);  // Dialog state
    const [selectedUserId, setSelectedUserId] = useState(null);  // ID of user to delete
    const [snackbarOpen, setSnackbarOpen] = useState(false);  // Snackbar state

    useEffect(() => {
        dispatch(allUserAction());  // Load all users
    }, [dispatch]);

    const { users = [], loading, error } = useSelector(state => state.allUsers || { users: [], loading: true });

    // Open confirmation dialog
    const handleClickOpen = (id) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    // Close confirmation dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Close snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle deletion after confirmation and update state
    const handleDeleteConfirmed = () => {
        if (selectedUserId) {
            dispatch(deleteUserAction(selectedUserId)).then(() => {
                // Show success message
                setSnackbarOpen(true);

                // Remove the deleted user from the local state immediately after successful deletion
                dispatch(allUserAction());  // Refresh user list after deletion
            });
        }
        setOpen(false);  // Close the confirmation dialog
    };

    const columns = [
        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
        },
        {
            field: 'Email',
            headerName: 'E-mail',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'User Status',
            width: 150,
            renderCell: (params) => (params.row.role === 1 ? 'Admin' : 'Regular user'),
        },
        {
            field: 'createdAt',
            headerName: 'Creation Date',
            width: 180,
            renderCell: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <Button variant="contained">
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/User/edit/${params.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={() => handleClickOpen(params.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (users.length === 0) return <div>No users found.</div>;

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>All Users</Typography>

            <Paper sx={{ bgcolor: '#000000' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            '& .MuiTablePagination-displayedRows': { color: 'white' },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            button: {
                                color: '#ffffff',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: 'black',
                                color: 'black',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: 'black',
                            },
                        }}
                        getRowId={(row) => row._id}
                        rows={users}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                        slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>

            {/* Confirmation dialog for delete action */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="error" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    User deleted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default DashUsers;
