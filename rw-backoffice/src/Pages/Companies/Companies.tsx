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
import AddCompany from './AddCompany'
import api from '../../Services/ApiService'
import UpdateCompany from './UpdateCompany'
import { ICompany } from '../../types/Companies'


export default function Companies() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { lstCompanies, isLoading, error } = useSelector((state: RootState) => state.companies)
    const [isAddOpen, setIsAddOpen] = React.useState<boolean>(false)
    const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false)
    const [currentCompany, setCurrentCompany] = React.useState<ICompany | null>(null)

    useEffect(() => {
        if (!lstCompanies)
            dispatch(getCompanies())
    }, [lstCompanies])


    async function onDelete(id: string) {
        try {
            let yes = await utils.showConfirm("Do you want to delete?")
            if (!yes) return
            await api.deleteCompany(id)
            utils.showSuccess("Company Deleted successfully. ")
            dispatch(getCompanies())
        }
        catch (ex) {
            utils.showError(ex)
        }
    }


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
                                                data-id={objCompany.id}
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
                                                    setCurrentCompany(objCompany)
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
                onClick={() => {
                    setIsAddOpen(true)
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
                    setIsUpdateOpen(true)
                    setAnchorEl(null)
                }}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => {
                    let id = (anchorEl?.getAttribute("data-id"))
                    if (id)
                        onDelete(id)
                    setAnchorEl(null)
                }}>
                    Delete
                </MenuItem>
            </Menu>

            <AddCompany
                open={isAddOpen}
                toggle={() => {
                    setIsAddOpen(!isAddOpen)
                }}
                onComplete={() => {
                    dispatch(getCompanies())
                    setIsAddOpen(false)
                }}
            />

            {(currentCompany && isUpdateOpen) &&
                <UpdateCompany
                    open={isUpdateOpen}
                    toggle={() => {
                        setIsUpdateOpen(!isUpdateOpen)
                        if (isUpdateOpen)
                            setCurrentCompany(null)
                    }}
                    onComplete={() => {
                        dispatch(getCompanies())
                        setIsUpdateOpen(false)
                        setCurrentCompany(null)
                    }}
                    objCompany={currentCompany}
                />
            }
        </MainLayout >
    )
}
