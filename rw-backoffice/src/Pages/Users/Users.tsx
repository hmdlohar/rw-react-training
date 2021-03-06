import { Avatar, Fab, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingErrorPlaceholder from '../../Components/LoadingErrorPlaceholder'
import MainLayout from '../../Main/MainLayout'
import { deleteUser, getUsers } from '../../redux/slices/users'
import { dispatch, RootState } from '../../redux/store'
import utils from '../../Services/Utils'
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router'
import { IUser } from '../../types/User'


export default function Users() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null)
    const { lstUser, isLoading, error, isDeleteLoading } = useSelector((state: RootState) => state.users)
    const navigate = useNavigate()

    useEffect(() => {
        if (!lstUser)
            dispatch(getUsers())
    }, [lstUser])
    return (
        <MainLayout>
            <LoadingErrorPlaceholder
                isLoading={isLoading}
                error={error}
            >
                {lstUser &&
                    <div>
                        {isDeleteLoading &&
                            <LinearProgress />
                        }
                        <List dense>
                            {lstUser.map(objUser => {
                                return (
                                    <ListItem key={objUser._id} divider >
                                        <ListItemAvatar>
                                            <Avatar style={{ background: utils.stringToColor(objUser.username) }}>
                                                {utils.getFirstChar(objUser.username)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={objUser.username}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2">
                                                        Active: <b>{objUser.isActive ? "Yes" : "No"}</b>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Company: <b>{objUser.name}</b>
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
                                                    setSelectedUser(objUser)
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
            }}
                color="primary"
                onClick={() => {
                    navigate("/users/new")
                }}
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
                onClose={() => setAnchorEl(null)}

            >
                <MenuItem onClick={() => {
                    navigate(`/users/${selectedUser?._id || "new"}`)
                    setAnchorEl(null)
                }}>
                    Edit
                </MenuItem>
                <MenuItem onClick={async () => {
                    let yes = await utils.showConfirm("Do you want to delete?")
                    if (!yes)
                        return
                    if (selectedUser) {
                        await dispatch(deleteUser(selectedUser._id))
                    }
                    setAnchorEl(null)
                }}>
                    Delete
                </MenuItem>
            </Menu>
        </MainLayout>
    )
}
