import { Box } from '@mui/system'
import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'

export default function MainLayout(props: any) {
    return (
        <div>
            <Box sx={{ height: '10vh' }}>
                <TopBar />
            </Box>
            <SideBar />
            <Box sx={{ height: '90vh' }}>
                {props.children}
            </Box>
        </div>
    )
}
