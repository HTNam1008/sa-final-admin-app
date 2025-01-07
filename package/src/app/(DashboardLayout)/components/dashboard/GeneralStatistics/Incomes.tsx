import React from 'react';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Incomes = () => {
    type TimeFrame = 'today' | 'week' | 'month' | 'year';
    const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('today');
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<TimeFrame>) => {
        setTimeFrame(event.target.value as TimeFrame);
    };

    const usedVouchers : Record<TimeFrame, number> = {
        today: 50,
        week: 200,
        month: 800,
        year: 5000,
    };

    return (
        <DashboardCard title="Incomes">
            <Grid container spacing={2}>
                
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main}>
                        $ {usedVouchers[timeFrame]}
                    </Typography>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default Incomes;