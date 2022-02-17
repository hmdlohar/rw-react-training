import { Button, FormControlLabel, Grid, Paper, Switch, TextField } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useMatch, useNavigate } from 'react-router'
import * as Yup from "yup";
import Loading from '../Component/Loading';
import StudentService, { StudentInsertObject } from './StudentService2';

interface IStudentForm {
    FirstName: string
    LastName: string
    Email: string
    Percentage: number
    IsActive: boolean
}

const Schema = Yup.object().shape({
    FirstName: Yup.string().required("Please enter first name"),
    LastName: Yup.string().required("Please enter last name"),
    Email: Yup.string().email("Enter valid email.").required("Please enter email"),
    Percentage: Yup.number()
        .min(0, "Percentage must be grater between 0 to 100")
        .max(100, "Percentage must be grater between 0 to 100")
        .required("Please enter email"),
});

export default function AddUpdateStudent2() {
    const match = useMatch("/students2/:id")
    const isEdit = match?.params.id !== "new"
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(false)

    useEffect(() => {
        if (isEdit) {
            loadData()
        }
    }, [isEdit])

    const formik = useFormik<IStudentForm>({
        initialValues: {
            FirstName: '',
            LastName: '',
            Email: '',
            Percentage: 0,
            IsActive: true,
        },
        validationSchema: Schema,
        onSubmit: async (values) => {
            console.log('Submit called', values)
            const io = new StudentInsertObject()
            io.SFN = values.FirstName
            io.SLN = values.LastName
            io.SEID = values.Email
            io.SP = values.Percentage
            io.SIA = values.IsActive ? 1 : 0

            try {
                if (isEdit) {
                    let data = await StudentService.update(parseInt(match?.params.id || ""), io)
                    if (!data.WasNoError)
                        throw new Error(data?.ObjException?.Message || "Error occurred while updating ")
                    alert("Student update")
                }
                else {
                    let data = await StudentService.add(io)
                    if (!data.WasNoError)
                        throw new Error(data?.ObjException?.Message || "Error occurred while updating ")
                    alert("Student added")
                }
                navigate("/students2")
            }
            catch (ex: any) {
                alert(ex.message)
            }
        }
    })

    const { handleSubmit, values, touched, errors, setFieldValue, setFieldTouched, setValues } = formik;

    async function loadData() {
        setLoading(true)
        let data = await StudentService.detail(parseInt(match?.params.id || ""))
        setValues({
            FirstName: data.StudentFirstName,
            LastName: data.StudentLastName,
            Email: data.StudentEmailID,
            Percentage: data.StudentPercentage,
            IsActive: data.StudentIsActive,
        })
        setLoading(false)

    }

    // console.log("values", errors)


    return (
        <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>

                <Paper sx={{ p: 2, m: 1 }}>
                    {loading ?
                        <Loading />
                        :

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="First Name"
                                    value={values.FirstName}
                                    onChange={(e) => {
                                        setFieldValue('FirstName', e.target.value)
                                    }}
                                    fullWidth
                                    helperText={touched.FirstName && errors.FirstName}
                                    error={touched.FirstName && !!errors.FirstName}
                                    onBlur={() => setFieldTouched('FirstName')}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Last Name"
                                    value={values.LastName}
                                    onChange={(e) => {
                                        setFieldValue('LastName', e.target.value)
                                    }}
                                    fullWidth
                                    helperText={touched.LastName && errors.LastName}
                                    error={touched.LastName && !!errors.LastName}
                                    onBlur={() => setFieldTouched('LastName')}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Email"
                                    value={values.Email}
                                    onChange={(e) => {
                                        setFieldValue('Email', e.target.value)
                                    }}
                                    fullWidth
                                    helperText={touched.Email && errors.Email}
                                    error={touched.Email && !!errors.Email}
                                    onBlur={() => setFieldTouched('Email')}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="number"
                                    label="Percentage"
                                    value={values.Percentage}
                                    onChange={(e) => {
                                        setFieldValue('Percentage', e.target.value)
                                    }}
                                    fullWidth
                                    helperText={touched.Percentage && errors.Percentage}
                                    error={touched.Percentage && !!errors.Percentage}
                                    onBlur={() => setFieldTouched('Percentage')}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    labelPlacement="start"
                                    control={<Switch checked={values.IsActive}
                                        onChange={(e) => setFieldValue("IsActive", e.target.checked)} />}
                                    label="Is Active"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Button type="submit" variant="contained">Submit</Button>
                            </Grid>
                        </Grid>
                    }
                </Paper>

            </form>
        </FormikProvider>
    )
}
