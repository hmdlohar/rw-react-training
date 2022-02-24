import { Avatar, Fab, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LoadingErrorPlaceholder from '../../Components/LoadingErrorPlaceholder'
import MainLayout from '../../Main/MainLayout'
import { getPackages } from '../../redux/slices/packages'
import { dispatch, RootState, useSelector } from '../../redux/store'
import utils from '../../Services/Utils'
import AddIcon from '@mui/icons-material/Add';


export default function Packages() {
    const { lstPackage, isLoading, error } = useSelector((state: RootState) => state.packages)

    useEffect(() => {
        if (!lstPackage)
            dispatch(getPackages())
    }, [lstPackage])

    return (
        <MainLayout>
            <LoadingErrorPlaceholder
                isLoading={isLoading}
                error={error}
            >
                {lstPackage &&
                    <div>
                        <List dense>
                            {lstPackage.map(objPackages => {
                                return (
                                    <ListItem key={objPackages.id} divider >
                                        hello
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>}
            </LoadingErrorPlaceholder>
            <Fab sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }} color="primary"
            >
                <AddIcon />
            </Fab>

        </MainLayout >
    )
}
