import React from 'react';
import { Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Counterparts = () => {
    const [timeFrame, setTimeFrame] = React.useState('today');
    const theme = useTheme();

    const handleChange = (event: any) => {
        setTimeFrame(event.target.value);
    };
    

    return (
        <DashboardCard title="Counterparts">
            <div>
                <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                    {/* Replace with actual data */}
                    Total: 120
                </Typography>
            </div>
        </DashboardCard>
    );
};

export default Counterparts;