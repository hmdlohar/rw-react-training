import { Button } from '@mui/material'
import React from 'react'
import MainLayout from '../../Main/MainLayout'
import { useAppContext } from '../../App'


export default function Home() {
    const context = useAppContext()
    return (
        <MainLayout>
            <Button onClick={() => {
                context.setMenuOpen(true)
            }}>
                Open Menu
            </Button>
        </MainLayout>
    )
}
