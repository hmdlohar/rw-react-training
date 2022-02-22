import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useAppContext } from '../App';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../redux/store';
import { setMenuOpen } from '../redux/slices/common';


interface ISideBar {

}

const lstMenu = [
    {
        title: "Home",
        icon: <HomeIcon />,
        path: "/"
    },
    {
        title: "Login",
        icon: <AccountCircleIcon />,
        path: "/login"
    },
    {
        title: "Index",
        icon: <InboxIcon />,
        path: "/inbox"
    },
]

export default function SideBar(props: ISideBar) {
    const navigate = useNavigate()
    const { isMenuOpen } = useSelector((state: RootState) => state.common)

    return (
        <SwipeableDrawer
            open={isMenuOpen}
            onClose={() => {
                console.log("on close")
                dispatch(setMenuOpen(false))
            }}
            onOpen={() => {
                console.log("on Open")
                dispatch(setMenuOpen(false))
            }}
        >
            <Box sx={{ width: 250 }}>
                <List>
                    {lstMenu.map((item, index) => {
                        return (
                            <ListItem key={index} button divider onClick={() => {
                                navigate(item.path)
                                dispatch(setMenuOpen(false))
                            }}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </SwipeableDrawer>
    )
}
