import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import MainLayout from '../../Main/MainLayout'
import { dispatch, RootState, useSelector } from '../../redux/store'
import { getDashboardStat } from '../../redux/slices/home'
import DashboardStatsGrid from './DashboardStatsGrid'
import DashboardStatsSkeletion from './DashboardStatsSkeletion'
import LoadingErrorPlaceholder from '../../Components/LoadingErrorPlaceholder'



export default function Home() {
    const { user } = useSelector((state: RootState) => state.common)
    const { objDashboard, isLoading, error } = useSelector((state: RootState) => state.home)

    useEffect(() => {
        if (!objDashboard)
            dispatch(getDashboardStat())
    }, [objDashboard])

    return (
        <MainLayout>

            {user &&
                <>
                    <Typography>Name: {user.name}</Typography>
                </>
            }
            <LoadingErrorPlaceholder
                isLoading={isLoading}
                error={error}
                loadingComponent={<DashboardStatsSkeletion />}
            >
                {objDashboard && <DashboardStatsGrid objDashboard={objDashboard} />}
            </LoadingErrorPlaceholder>

        </MainLayout>
    )
}
