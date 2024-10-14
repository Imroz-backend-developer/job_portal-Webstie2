import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import ChartComponent from '../../component/ChartComponent';
import { useEffect } from 'react';
import { fetchAdminStats } from '../../redux/actions/userAction';
import { makeSelectAdminStats } from '../../redux/selector'; // Import your selector

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const data = [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
    ];

    const options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', minValue: 0 },
        vAxis: { title: 'Amount', minValue: 0 },
        legend: 'none',
    };

    // Use the memoized selector
    const { adminCount = 0, jobCount = 0, categoryCount = 0, loading = true, error } = useSelector(makeSelectAdminStats);

    useEffect(() => {
        dispatch(fetchAdminStats());
    }, [dispatch]);

    // Logging for debugging
    console.log({ adminCount, jobCount, categoryCount, loading, error });

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Dashboard
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                {error && <Typography color="error">{error}</Typography>}
                
                <StatComponent
                    value={loading ? adminCount:'Loading...'}
                    icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Administrators"
                    money=""
                />
                <StatComponent
                    value={loading ? jobCount:'Loading...'}
                    icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Jobs"
                    money=""
                />
                <StatComponent
                    value={loading ? categoryCount:'Loading...'}
                    icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Job Categories"
                    money=""
                />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <ChartComponent>
                    <Chart
                        chartType="Bar"
                        data={data}
                        options={options}
                        width="100%"
                        height="300px"
                        legendToggle
                    />
                </ChartComponent>
            </Stack>
        </Box>
    );
};

export default AdminDashboard;
