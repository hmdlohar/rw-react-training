import React from 'react';
import './App.css';
import Login from './Login/Login';
import { AppBar, Button, Container, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './Home/Home';
import ToDoList from './ToDoList/ToDoList';
import AddUpdateEmployeeForm from './ToDoList/AddUpdateEmployeeForm';
import { IEmployee } from './ToDoList/EmployeeService';
import Student from './Student/StudentList';
import { Route, Routes, useNavigate } from 'react-router';
import AddUpdateStudent from './Student/AddUpdateStudent';

export enum PAGE {
  HOME = "HOME",
  LOGIN = "LOGIN",
  TO_DO_LIST = "TO_DO_LIST",
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  STUDENT_LIST = "STUDENT_LIST",
}

function App() {
  const theme = useTheme()
  const [currentPage, setCurrentPage] = React.useState<PAGE>(PAGE.HOME)
  const [currentEmployee, setCurrentEmployee] = React.useState<IEmployee | null>(null)
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: theme.palette.primary.light, height: '100vh' }}>
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
                navigate("/")
              }}>Home</Button>
              <Button color="inherit" onClick={() => {
                navigate("/login")
              }}>Login</Button>
              <Button color="inherit" onClick={() => {
                navigate("/toDoList")
              }}>To Do List</Button>
              <Button color="inherit" onClick={() => {
                navigate("/students")
              }}>Student List</Button>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/toDoList" element={<ToDoList setCurrentEmployee={setCurrentEmployee} setCurrentPage={setCurrentPage} />} />
          <Route path="/addEmployee" element={<AddUpdateEmployeeForm objEmployee={currentEmployee} setCurrentPage={setCurrentPage} />} />
          <Route path="/students" element={<Student setCurrentPage={setCurrentPage} />} />
          <Route path="/addStudent/:id" element={<AddUpdateStudent />} />
        </Routes>

        {/* {currentPage === PAGE.HOME && <Home />}
        {currentPage === PAGE.LOGIN && <Login />}
        {currentPage === PAGE.TO_DO_LIST && <ToDoList setCurrentEmployee={setCurrentEmployee} setCurrentPage={setCurrentPage} />}
        {currentPage === PAGE.ADD_EMPLOYEE && <AddUpdateEmployeeForm objEmployee={currentEmployee} setCurrentPage={setCurrentPage} />}
        {currentPage === PAGE.STUDENT_LIST && <Student setCurrentPage={setCurrentPage} />} */}

      </Container>
    </div>
  );
}

export default App;
