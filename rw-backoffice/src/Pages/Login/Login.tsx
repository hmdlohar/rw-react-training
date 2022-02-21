import { Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'
import MainLayout from '../../Main/MainLayout'

export default function Login() {
    return (
        <MainLayout>
            <Container style={{ height: '100%' }}>
                <Grid container spacing={2} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    height: '100%'
                }}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Username"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Username"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth>Login</Button>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}
