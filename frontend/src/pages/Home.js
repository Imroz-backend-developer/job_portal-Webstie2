import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../redux/actions/jobactions';
import { Link, useParams } from 'react-router-dom';
import CardElement from '../component/CardeElement'; // Corrected import name
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import SelectComponent from '../component/SelectComponent';
import { jobTypeLoadAction } from '../redux/actions/jobtypeactions';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Home = () => {
    const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { keyword, location } = useParams();
    
    const [page, setPage] = React.useState(1);
    const [cat, setCat] = React.useState(''); // Removed React for cleaner state definition

    // Fetch jobs when the component mounts or when certain parameters change
    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location)); // Use `page` to load jobs
    }, [dispatch, page, keyword, cat, location]); // Added page to the dependency array

    // Load job types once when the component mounts
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]); // It's good practice to include dispatch here as well

    const handleChangeCategory = (e) => {
        setCat(e.target.value);
    }

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
                <Navbar />
                <Header />
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />
                            </Card>

                            {/* jobs by location */}
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by location
                                    </Typography>
                                    <MenuList>
                                        {
                                            setUniqueLocation && setUniqueLocation.map((loc, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link to={`/search/location/${loc}`}>{loc}</Link>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuList>
                                </Box>
                            </Card>
                        </Box>
                        <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ? (
                                    <LoadingBox />
                                ) : (jobs && jobs.length === 0) ? (
                                    <Box sx={{
                                        minHeight: '350px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <h2>No result found!</h2>
                                    </Box>
                                ) : (
                                    jobs && jobs.map((job, i) => (
                                        <CardElement
                                            key={i}
                                            id={job._id}
                                            jobTitle={job.Title}
                                            description={job.Description}
                                            category={job.Jobtype ? job.Jobtype.JobTypeName : "No category"}
                                            location={job.location}
                                        />
                                    ))
                                )
                            }
                            <Stack spacing={2}>
                                <Pagination page={pages} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default Home;
