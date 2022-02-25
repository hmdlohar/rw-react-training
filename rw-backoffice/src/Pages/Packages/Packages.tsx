import { Avatar, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LoadingErrorPlaceholder from '../../Components/LoadingErrorPlaceholder'
import MainLayout from '../../Main/MainLayout'
import { getPackages } from '../../redux/slices/packages'
import { dispatch, RootState, useSelector } from '../../redux/store'
import utils from '../../Services/Utils'
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IPackage } from '../../types/Packages'

export default function Packages() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedPackage, setSelectedPackage] = React.useState<IPackage | null>(null)
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
                                        <ListItemAvatar>
                                            <Avatar style={{ background: utils.stringToColor(objPackages.name) }}>
                                                {utils.getFirstChar(objPackages.name)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={objPackages.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2">
                                                        Active: <b>{objPackages.isActive ? "Yes" : "No"}</b>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        NumberOfDays: <b>{objPackages.noOfDays}</b>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Description: <b>{objPackages.description}</b>
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
                                                    setSelectedPackage(objPackages)
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
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
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={!!anchorEl}

            >
                <MenuItem onClick={() => {
                    // navigate(`/users/${selectedPackage?._id || "new"}`)
                    setAnchorEl(null)
                }}>
                    Edit
                </MenuItem>
                <MenuItem onClick={async () => {
                    let yes = await utils.showConfirm("Do you want to delete?")
                    if (!yes)
                        return
                    if (selectedPackage) {
                        // await dispatch(deleteUser(selectedPackage._id))
                    }
                    setAnchorEl(null)
                }}>
                    Delete
                </MenuItem>
            </Menu>
        </MainLayout >
    )
}
