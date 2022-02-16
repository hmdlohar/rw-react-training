import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { PAGE } from '../App'
import EmployeeService, { IEmployee } from './EmployeeService'

interface IAddUpdateEmployeeForm {
  setCurrentPage: (newPage: PAGE) => void
  objEmployee?: IEmployee | null
}

export default function AddUpdateEmployeeForm(props: IAddUpdateEmployeeForm) {
  const [name, setName] = React.useState<string>(props.objEmployee?.Name || '')
  const [designation, setDesignation] = React.useState<string>(props.objEmployee?.Designation || '')
  const [salary, setSalary] = React.useState<string>(props.objEmployee?.Salary.toString() || '')
  const [isActive, setIsActive] = React.useState<boolean>(!!props.objEmployee?.IsActive)

  const navigate = useNavigate()

  console.log(props.objEmployee, "employee")

  function onSubmitClick() {
    if (!name || !designation || !salary) {
      return alert('Enter all fields')
    }

    if (props.objEmployee) { // Edit case
      let objEmployee: Partial<IEmployee> = {
        Designation: designation,
        IsActive: isActive,
        Name: name,
        Salary: parseFloat(salary)
      }

      EmployeeService.update(props.objEmployee.EmployeeID, objEmployee)
      alert('Successfully updated')
      navigate("/toDoList")
    }
    else { // Add case
      let objEmployee: IEmployee = {
        EmployeeID: Date.now(),
        Designation: designation,
        IsActive: isActive,
        Name: name,
        Salary: parseFloat(salary)
      }

      EmployeeService.add(objEmployee)
      alert('Successfully added')
      navigate("/toDoList")
    }


  }


  return (
    <Paper style={{ marginTop: 24, padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Add New Employee</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Employee Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Designation</InputLabel>
            <Select
              value={designation}
              label="Designation"
              onChange={(e) => setDesignation(e.target.value)}
            >
              <MenuItem value={"Developer"}>Developer</MenuItem>
              <MenuItem value={"Accountant"}>Accountant</MenuItem>
              <MenuItem value={"Manager"}>Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={salary}
            type="number"
            onChange={(e) => setSalary(e.target.value)}
            label="Salary"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            labelPlacement="start"
            control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
            label="Is Active" />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onSubmitClick}>Submit</Button>
        </Grid>

      </Grid>
    </Paper>
  )
}
