import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useAppContext } from '../App';


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
    const context = useAppContext()

    return (
        <SwipeableDrawer
            open={context.isMenuOpen}
            onClose={() => {
                console.log("on close")
                context.setMenuOpen(false)
            }}
            onOpen={() => {
                console.log("on Open")
                context.setMenuOpen(true)
            }}
        >
            <Box sx={{ width: 250 }}>
                <List>
                    {lstMenu.map((item, index) => {
                        return (
                            <ListItem key={index} button divider onClick={() => {
                                navigate(item.path)
                                context.setMenuOpen(false)
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
