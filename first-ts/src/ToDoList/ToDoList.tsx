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
import { Typography } from '@mui/material';


export default function ToDoList() {
    const [lstEmployees, setLstEmployee] = React.useState<IEmployee[]>([])
    useEffect(() => {
        let lstEmployees = EmployeeService.list()
        setLstEmployee(lstEmployees)
    }, [])

    console.log(lstEmployees)

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Designation</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Is Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lstEmployees.map((row, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.EmployeeID}
                                    </TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row.Designation}</TableCell>
                                    <TableCell align="right">{row.Salary}</TableCell>
                                    <TableCell align="right">{row.IsActive ?
                                        <Typography color="success">Yes</Typography> :
                                        <Typography color="error">No</Typography>}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
