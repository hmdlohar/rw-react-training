import { CircularProgress, Paper } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Paper style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Paper>
    )
}
