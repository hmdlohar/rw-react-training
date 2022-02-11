import React from 'react';
import './App.css';
import Login from './Login/Login';
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './Home/Home';

enum PAGE {
  HOME = "HOME",
  LOGIN = "LOGIN"
}

function App() {
  const theme = useTheme()
  const [currentPage, setCurrentPage] = React.useState<PAGE>(PAGE.HOME)
  console.log(currentPage)
  return (
    <div style={{ backgroundColor: theme.palette.primary.light }}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Stack direction="row" justifyContent="space-between" style={{ width: '100%' }}>
            <div>Logo</div>
            <div>
              {/* <Link to="/">Home</Link> |{" "}
              <Link to="/login">Login</Link> */}
              <Button color="inherit" onClick={() => {
                setCurrentPage(PAGE.HOME)
              }}>Home</Button>
              <Button color="inherit" onClick={() => {
                setCurrentPage(PAGE.LOGIN)
              }}>Login</Button>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes> */}

        {currentPage === PAGE.HOME && <Home />}
        {currentPage === PAGE.LOGIN && <Login />}

      </Container>
    </div>
  );
}

export default App;
