import { Box } from '@mui/system'
import React from 'react'
import MainLayout from '../../Main/MainLayout'
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Typography } from '@mui/material';

export default function NotFound() {
  return (
    <MainLayout>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}>
        <NotInterestedIcon color="disabled" sx={{ height: 150, width: 150 }} />
        <Typography variant="h3" color="primary">
          Not Found
        </Typography>
      </Box>
    </MainLayout>
  )
}
