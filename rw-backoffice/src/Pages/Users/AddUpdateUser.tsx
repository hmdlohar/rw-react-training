import React from 'react'
import { useMatch, useNavigate } from 'react-router'
import MainLayout from '../../Main/MainLayout'
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik'
import { Checkbox, Grid, TextField } from '@mui/material';
import FormikTextField from '../../Components/FormFields/FormikTextField';
import { LoadingButton } from '@mui/lab';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { addOrEditUser } from '../../redux/slices/users';
import ErrorPlaceHolder from '../../Components/ErrorPlaceHolder';
import utils from '../../Services/Utils';
import FormikSingleCheckBox from '../../Components/FormFields/FormikSingleCheckBox';



export interface IUserForm {
    username: string,
    password: string
    confirmPassword: string
    name: string
    isEdit: boolean
    changePassword: boolean
}

const schema = Yup.object({
    username: Yup.string()
        .max(10, 'Must be 15 characters or less')
        .required('Username is required'),
    password: Yup.string().when('isEdit', {
        is: false,
        then: Yup.string().required('Password is required')
    })

    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )
    ,
    confirmPassword: Yup.string()
        .when('isEdit', {
            is: false,
            then: Yup.string().required("Enter confirm password")
                .oneOf([Yup.ref("password"), null], "Passwords must match")
        })
    ,
    name: Yup.string().required('Name is required'),
    isEdit: Yup.boolean()
})

export default function AddUpdateUser() {
    const match = useMatch("/users/:id")
    const isEdit = match?.params.id !== "new"
    const { lstUser, isLoading, error } = useSelector((state: RootState) => state.users)
    const navigate = useNavigate()

    const existingUser = lstUser?.find(item => item._id === match?.params.id)
    console.log("isEdit", isEdit)

    const formik = useFormik<IUserForm>({
        initialValues: {
            confirmPassword: '',
            name: existingUser?.name || '',
            password: '',
            username: existingUser?.username || '',
            isEdit,
            changePassword: false
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values)
            let status = await dispatch(addOrEditUser(values, isEdit ? (match?.params.id || '') : ''))
            console.log(status)
            if (status) {
                utils.showSuccess("User added successfully.")
                navigate("/users")
            }
        }
    })

    return (
        <MainLayout>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormikTextField
                                fullWidth
                                name="username"
                                label="Username"
                            />
                        </Grid>
                        {isEdit &&
                            <Grid item xs={12}>
                                <FormikSingleCheckBox
                                    name="changePassword"
                                    label="Change Password"
                                    control={<Checkbox />}
                                />
                            </Grid>
                        }

                        {(!isEdit || formik.values.changePassword) &&
                            <Grid item xs={12}>
                                <FormikTextField
                                    fullWidth
                                    type="password"
                                    name="password"
                                    label="Password"
                                />
                            </Grid>
                        }
                        {!isEdit &&
                            <Grid item xs={12}>
                                <FormikTextField
                                    fullWidth
                                    type="password"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                />
                            </Grid>

                        }
                        <Grid item xs={12}>
                            <FormikTextField
                                fullWidth
                                name="name"
                                label="Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={isLoading} type="submit">
                                Save
                            </LoadingButton>
                            {error && <ErrorPlaceHolder ex={error} />}
                        </Grid>
                    </Grid>
                </form>
            </FormikProvider>
        </MainLayout>
    )
}
