import { Button, Card, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

export default function Login() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [rememberChecked, setRememberChecked] = React.useState<boolean>(false)
    
    
    // Updated 
    // Unmount. 


    useEffect(() => {
        console.log("called only once. on mount. ")
        // Call api and take list of data. and set it to state. 

        return () => {
            console.log("called only once. on unmount. ")
        }
    }, [])

    useEffect(() => {
        console.log("username is chacned")
    }, [username])

    useEffect(() => {
        console.log("Password is chacned")
    }, [password])


    return (
        <Container>
            <Grid container justifyContent="center"
                style={{ height: '100vh', alignItems: 'center' }}
            >
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Login Here" />
                        <CardContent>
                            <Stack spacing={2}>
                                <TextField
                                    label="Enter your username"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={rememberChecked}
                                        onChange={(event) => {
                                            setRememberChecked(event.target.checked)
                                        }} />}
                                    label="Remember me" />
                                <Button variant="contained" onClick={() => {
                                    console.log(" now we need to login", username, password, rememberChecked)

                                }}>
                                    Login
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
