import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import config from '../config';
import { setMenuOpen } from '../redux/slices/common';
import { dispatch } from '../redux/store';

interface ITopBar {

}

export default function TopBar(props: ITopBar) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            dispatch(setMenuOpen(true))
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {config.AppName}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}