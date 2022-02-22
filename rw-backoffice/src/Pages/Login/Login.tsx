import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import MainLayout from '../../Main/MainLayout'
import { login } from '../../redux/slices/common'
import { dispatch, RootState, useSelector } from '../../redux/store'
import { LoadingButton } from "@mui/lab";

export default function Login() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const { isLoading, error } = useSelector((state: RootState) => state.common)

    function onSubmit() {
        console.log(username, password)
        dispatch(login(username, password))
    }

    return (
        <MainLayout hideTopBar>
            <Container style={{ height: '100%' }}>
                <Grid container spacing={2} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    height: '100%'
                }}>
                    <Grid item xs={12}>
                        <TextField
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            fullWidth label="Username"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} fullWidth label="Username"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            onClick={onSubmit} fullWidth>Login</LoadingButton>
                    </Grid>
                    {error &&
                        <Typography color="error">{error.message}</Typography>
                    }
                </Grid>
            </Container>
        </MainLayout>
    )
}
