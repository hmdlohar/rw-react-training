import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
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
import StudentService, { IStudent } from './StudentService';
import { useNavigate } from 'react-router';

interface IStudentList {
  setCurrentPage: (newPage: PAGE) => void
}

export default function StudentList(props: IStudentList) {
  const [lstStudent, setLstStudent] = React.useState<IStudent[]>([])
  const navigate = useNavigate()

  async function laodData() {
    try {
      const lstStudent = await StudentService.list()
      setLstStudent(lstStudent)
    }
    catch (ex) {
      console.log("ex", ex)
    }

  }

  useEffect(() => {
    laodData()
  }, [])

  function onDeleteClick(id: number) {
    try {
        if (!window.confirm("Do you want to delete?")) {
            return;
        }
        StudentService.delete(id)
        alert("Successfully deleted")
        laodData()
    }
    catch (ex: any) {
        alert(ex.message)
    }
  }

  function onUpdateClick(objStudent: IStudent) {
    navigate(`/addStudent/${objStudent.id}`)
  }
  return (
    <Container>
      <Grid container spacing={2} style={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <Box style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="secondary"
              onClick={() => {
                navigate("/addStudent/new")
              }}
            >New Student</Button>
          </Box>
        </Grid>


        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Is Active</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lstStudent.map((objStudent, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {objStudent.id}
                      </TableCell>
                      <TableCell align="right">{objStudent.attributes.FirstName}</TableCell>
                      <TableCell align="right">{objStudent.attributes.LastName}</TableCell>
                      <TableCell align="right">{objStudent.attributes.Email}</TableCell>
                      <TableCell align="right">{objStudent.attributes.Percentage}</TableCell>
                      <TableCell align="right">{objStudent.attributes.IsActive ?
                        <Typography color="success">Yes</Typography> :
                        <Typography color="error">No</Typography>}</TableCell>
                      <TableCell>
                        {/* <Button startIcon={<DeleteIcon />} variant="contained" color="error">Delete</Button> */}
                        <Tooltip title="Delete" color="error">
                          <IconButton onClick={() => onDeleteClick(objStudent.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update" color="secondary">
                          <IconButton onClick={() => onUpdateClick(objStudent)}>
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
