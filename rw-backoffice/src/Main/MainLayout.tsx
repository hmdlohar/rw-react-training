import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'

interface IMainLayout {
    children: any
    hideTopBar?: boolean
}

export default function MainLayout(props: IMainLayout) {
    return (
        <div>
            {!props.hideTopBar &&
                <Box sx={{ height: '10vh' }}>
                    <TopBar />
                </Box>
            }
            <SideBar />
            <Box sx={{ height: '90vh' }}>
                <Container sx={{ height: '100%' }}>
                    {props.children}
                </Container>
            </Box>
        </div>
    )
}
