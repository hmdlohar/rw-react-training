import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Grid, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PAGE } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StudentService, { IStudent2 } from './StudentService2';
import { useNavigate } from 'react-router';
import Loading from '../Component/Loading';

interface IStudentList {
  setCurrentPage: (newPage: PAGE) => void
}

export default function StudentList2(props: IStudentList) {
  const [lstStudent, setLstStudent] = React.useState<IStudent2[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()

  async function laodData() {
    try {
      setLoading(true)
      const lstStudent = await StudentService.list()
      setLstStudent(lstStudent)
    }
    catch (ex) {
      console.log("ex", ex)
    }
    finally {
      setLoading(false)
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

  function onUpdateClick(objStudent: IStudent2) {
    navigate(`/students2/${objStudent.StudentID}`)
  }
  return (
    <Container>
      <Grid container spacing={2} style={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <Box style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="secondary"
              onClick={() => {
                navigate("/students2/new")
              }}
            >New Student</Button>
          </Box>
        </Grid>

        {loading ?
          <Grid item xs={12}>
            <Loading />
          </Grid>
          :
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
                          {objStudent.StudentID}
                        </TableCell>
                        <TableCell align="right">{objStudent.StudentFirstName}</TableCell>
                        <TableCell align="right">{objStudent.StudentLastName}</TableCell>
                        <TableCell align="right">{objStudent.StudentEmailID}</TableCell>
                        <TableCell align="right">{objStudent.StudentPercentage}</TableCell>
                        <TableCell align="right">{objStudent.StudentIsActive ?
                          <Typography color="success">Yes</Typography> :
                          <Typography color="error">No</Typography>}</TableCell>
                        <TableCell>
                          <Tooltip title="Delete" color="error">
                            <IconButton onClick={() => onDeleteClick(objStudent.StudentID)}>
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
        }
      </Grid>
    </Container>
  )
}
