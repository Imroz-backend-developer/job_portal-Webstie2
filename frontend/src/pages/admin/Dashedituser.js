import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const [userData, setUserData] = useState({
        Firstname: '',
        Lastname: '',
        Email: '',
        role: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/User/${id}`);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`/api/user/edit/${id}`, userData);
            setLoading(false);
            navigate('/admin/users'); // Corrected navigation path
        } catch (error) {
            setError('Error updating user data');
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 4,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" component="h2" sx={{ pb: 3, textAlign: 'center' }}>
                    Edit User
                </Typography>

                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            id="Firstname"
                            name="Firstname"
                            label="First Name"
                            value={userData.Firstname}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth
                            id="Lastname"
                            name="Lastname"
                            label="Last Name"
                            value={userData.Lastname}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth
                            id="Email"
                            name="Email"
                            label="Email"
                            type="Email"
                            value={userData.Email}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth
                            id="role"
                            name="role"
                            label="Role"
                            select
                            value={userData.role}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                        </TextField>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Saving...' : 'SAVE CHANGES'}
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default EditUser;
