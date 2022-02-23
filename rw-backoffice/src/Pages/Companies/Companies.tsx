import { Avatar, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LoadingErrorPlaceholder from '../../Components/LoadingErrorPlaceholder'
import MainLayout from '../../Main/MainLayout'
import { getCompanies } from '../../redux/slices/companies'
import { dispatch, RootState, useSelector } from '../../redux/store'
import utils from '../../Services/Utils'
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Companies() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { lstCompanies, isLoading, error } = useSelector((state: RootState) => state.companies)

    useEffect(() => {
        if (!lstCompanies)
            dispatch(getCompanies())
    }, [lstCompanies])

    return (
        <MainLayout>
            <LoadingErrorPlaceholder
                isLoading={isLoading}
                error={error}
            >
                {lstCompanies &&
                    <div>
                        <List dense>
                            {lstCompanies.map(objCompany => {
                                return (
                                    <ListItem key={objCompany.id} divider >
                                        <ListItemAvatar>
                                            <Avatar style={{ background: utils.stringToColor(objCompany.companyName) }}>
                                                {utils.getFirstChar(objCompany.companyName)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={objCompany.companyName}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2">
                                                        Email: <b>{objCompany.companyEmail}</b>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Mobile: <b>{objCompany.companyPhone}</b>
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
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
                onClose={() => setAnchorEl(null)}

            >
                <MenuItem onClick={() => setAnchorEl(null)}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                    Delete
                </MenuItem>
            </Menu>
        </MainLayout >
    )
}
