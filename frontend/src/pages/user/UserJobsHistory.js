import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardElement from '../../component/CardeElement';
import { userProfileAction } from '../../redux/actions/userAction';

const UserJobsHistory = () => {
    //const { user } = useSelector(state => state.userProfile);
    const { user } = useSelector(state => state.userProfile);
    console.log(useSelector(state => state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfileAction());
    }, [dispatch]);

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}>Jobs History</Typography>
                <Box>
                    {
                        user && user.jobsHistory.length > 0 ? (
                            user.jobsHistory.map((history, i) => (
                                <CardElement
                                    key={i}
                                    id={history._id}
                                    Jobtitle={history.Jobtype}
                                    description={history.Description}
                                    category=''
                                    location={history.location}
                                />
                            ))
                        ) : (
                            <Typography variant="h6" sx={{ color: "#fafafa", mt: 2 }}>
                                User has not applied for any jobs.
                            </Typography>
                        )
                    }
                </Box>
            </Box>
        </>
    );
};

export default UserJobsHistory;
