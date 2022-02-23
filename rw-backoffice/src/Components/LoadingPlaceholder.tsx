import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function LoadingPlaceholder() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}
