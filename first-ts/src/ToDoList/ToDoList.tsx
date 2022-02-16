import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import EmployeeService, { IEmployee } from './EmployeeService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PAGE } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';

interface IToDoList {
    setCurrentPage: (newPageValue: PAGE) => void
    setCurrentEmployee: (emp: IEmployee | null) => void
}

export default function ToDoList(props: IToDoList) {
    const [lstEmployees, setLstEmployee] = React.useState<IEmployee[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        let lstEmployees = EmployeeService.list()
        setLstEmployee(null as any)
    }, [])

    function onDeleteClick(EmployeeID: number) {
        try {
            if (!window.confirm("Do you want to delete?")) {
                return;
            }
            EmployeeService.delete(EmployeeID)
            alert("Successfully deleted")
            setLstEmployee(EmployeeService.list())
        }
        catch (ex: any) {
            alert(ex.message)
        }
    }

    function onUpdateClick(objEmployee: IEmployee) {
        props.setCurrentEmployee(objEmployee)
        navigate("/addEmployee")
    }

    function getData() {
        if (!lstEmployees) {
            return []
        }
        return lstEmployees;
    }

    return (
        <Container>
            <Grid container spacing={2} style={{ marginTop: 1 }}>
                <Grid item xs={12}>
                    <Box style={{ textAlign: 'right' }}>
                        <Button variant="outlined" color="secondary"
                            onClick={() => {
                                props.setCurrentEmployee(null)
                                navigate("/addEmployee")
                            }}
                        >Add New Employee</Button>
                    </Box>
                </Grid>


                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Designation</TableCell>
                                    <TableCell align="right">Salary</TableCell>
                                    <TableCell align="right">Is Active</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getData().map((objEmployee, index) => {
                                    return (
                                        <TableRow
                                            key={objEmployee.EmployeeID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {objEmployee.EmployeeID}
                                            </TableCell>
                                            <TableCell align="right">{objEmployee.Name}</TableCell>
                                            <TableCell align="right">{objEmployee.Designation}</TableCell>
                                            <TableCell align="right">{objEmployee.Salary}</TableCell>
                                            <TableCell align="right">{objEmployee.IsActive ?
                                                <Typography color="success">Yes</Typography> :
                                                <Typography color="error">No</Typography>}</TableCell>
                                            <TableCell>
                                                {/* <Button startIcon={<DeleteIcon />} variant="contained" color="error">Delete</Button> */}
                                                <Tooltip title="Delete" color="error">
                                                    <IconButton onClick={() => onDeleteClick(objEmployee.EmployeeID)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Update" color="secondary">
                                                    <IconButton onClick={() => onUpdateClick(objEmployee)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
}
