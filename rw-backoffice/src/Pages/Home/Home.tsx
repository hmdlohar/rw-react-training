import { Button, Typography } from '@mui/material'
import React from 'react'
import MainLayout from '../../Main/MainLayout'
import { useAppContext } from '../../App'
import { RootState, useSelector } from '../../redux/store'


export default function Home() {
    const { user } = useSelector((state: RootState) => state.common)
    return (
        <MainLayout>
            {user &&
                <>
                    <Typography>Name: {user.firstName} {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </>
            }
        </MainLayout>
    )
}
