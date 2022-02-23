import { Grid, Skeleton } from '@mui/material'
import React from 'react'

export default function DashboardStatsSkeletion() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Skeleton style={{ borderRadius: 16}} variant="rectangular" width={'100%'} height={118} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton style={{ borderRadius: 16}} variant="rectangular" width={'100%'} height={118} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton style={{ borderRadius: 16}} variant="rectangular" width={'100%'} height={118} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton style={{ borderRadius: 16}} variant="rectangular" width={'100%'} height={118} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton style={{ borderRadius: 16}} variant="rectangular" width={'100%'} height={118} />
            </Grid>
        </Grid>
    )
}
