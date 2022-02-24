import { Avatar, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { IDashboardStats } from '../../types/AllTypes'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router';

export default function DashboardStatsGrid({ objDashboard }: { objDashboard: IDashboardStats }) {
    const navigate = useNavigate()
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    background: 'rgb(200, 250, 205)',
                    p: 1,
                    borderRadius: 5
                }}
                    onClick={() => {
                        navigate("/companies")
                    }}
                >
                    <Avatar sx={theme => ({
                        background: 'transparent',
                        border: `2px solid ${theme.palette.primary.main}`,
                        height: 50, width: 50
                    })}>
                        <TheaterComedyIcon color="primary" />
                    </Avatar>
                    <Typography variant="h6">{objDashboard.totalCompany}</Typography>
                    <Typography>Companies</Typography>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    background: 'rgb(200, 250, 205)',
                    p: 1,
                    borderRadius: 5
                }}
                    onClick={() => {
                        navigate("/users")
                    }}
                >
                    <Avatar sx={theme => ({
                        background: 'transparent',
                        border: `2px solid ${theme.palette.primary.main}`,
                        height: 50, width: 50
                    })}>
                        <GroupIcon color="primary" />
                    </Avatar>
                    <Typography variant="h6">{objDashboard.totalUsers}</Typography>
                    <Typography>Users</Typography>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    background: 'rgb(200, 250, 205)',
                    p: 1,
                    borderRadius: 5
                }}>
                    <Avatar sx={theme => ({
                        background: 'transparent',
                        border: `2px solid ${theme.palette.primary.main}`,
                        height: 50, width: 50
                    })}>
                        <MenuBookIcon color="primary" />
                    </Avatar>
                    <Typography variant="h6">{objDashboard.totalJournals}</Typography>
                    <Typography>Journals</Typography>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    background: 'rgb(200, 250, 205)',
                    p: 1,
                    borderRadius: 5
                }}>
                    <Avatar sx={theme => ({
                        background: 'transparent',
                        border: `2px solid ${theme.palette.primary.main}`,
                        height: 50, width: 50
                    })}>
                        <PlaylistAddCheckIcon color="primary" />
                    </Avatar>
                    <Typography variant="h6">{objDashboard.totalItems}</Typography>
                    <Typography>Items</Typography>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                    background: 'rgb(200, 250, 205)',
                    p: 1,
                    borderRadius: 5
                }}>
                    <Avatar sx={theme => ({
                        background: 'transparent',
                        border: `2px solid ${theme.palette.primary.main}`,
                        height: 50, width: 50
                    })}>
                        <AccountBoxIcon color="primary" />
                    </Avatar>
                    <Typography variant="h6">{objDashboard.totalAccounts}</Typography>
                    <Typography>Accounts</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
