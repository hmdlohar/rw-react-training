import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import { CompanyAddInsertObject } from '../../types/Companies';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik'
import FormikTextField from '../../Components/FormFields/FormikTextField';
import api from '../../Services/ApiService';
import utils from '../../Services/Utils';
import StateAutoComplete from './StateAutoComplete';
import PackageAutoComplete from './PackageAutoComplete';

interface IAddCompany {
    open: boolean
    toggle: () => void
    onComplete: () => void
}

const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Name is required'),
    invoicePrefix: Yup.string().required('InvoicePrefix is required'),
    companyName: Yup.string().required('CompanyName is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
    companyEmail: Yup.string().email("Enter valid email").required('CompanyEmail is required'),
    companyPhone: Yup.string().required('CompanyPhone is required'),
    gstNo: Yup.string().required('GstNo is required'),
    package: Yup.string().required('Package is required'),
})

export type ICompanyAddForm = CompanyAddInsertObject & {

}


export default function AddCompany(props: IAddCompany) {

    const formik = useFormik<ICompanyAddForm>({
        initialValues: {
            "username": "",
            "password": "",
            "name": "",
            "invoicePrefix": "",
            "companyName": "",
            "state": "", // Dropdown
            "address": "",
            "companyEmail": "",
            "companyPhone": "",
            "gstNo": "",
            "package": "" // Dropdown. 
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await api.addCompany(values)
                utils.showSuccess("Company added successfully. ")
                resetForm()
                props.onComplete()
            }
            catch (ex) {
                utils.showError(ex)
            }

        }
    })

    return (
        <Dialog
            open={props.open}
            onClose={props.toggle}
            fullScreen
            scroll="paper"
        >
            <DialogTitle sx={{ p: 1 }}>
                <IconButton onClick={props.toggle}>
                    <ArrowBackIcon />
                </IconButton>
                Add Company
            </DialogTitle>
            <DialogContent dividers>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormikTextField label="Username" name="username" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField type="password" label="Password" name="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Name" name="name" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Invoice Prefix" name="invoicePrefix" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Company Name" name="companyName" />
                            </Grid>
                            <Grid item xs={12}>
                                <StateAutoComplete
                                    value={formik.values.state || null}
                                    onChange={(value) => {
                                        formik.setFieldValue('state', value)
                                    }}
                                    onBlur={() => {
                                        formik.setFieldTouched('state')
                                    }}
                                    label="Select State"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Address" name="address" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Company Email" name="companyEmail" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Company Phone" name="companyPhone" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikTextField label="Gst Number" name="gstNo" />
                            </Grid>
                            <Grid item xs={12}>
                                <PackageAutoComplete
                                    value={formik.values.package || null}
                                    onChange={(value) => {
                                        formik.setFieldValue('package', value)
                                    }}
                                    onBlur={() => {
                                        formik.setFieldTouched('package')
                                    }}
                                    label="Package"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </FormikProvider>
            </DialogContent>
            <DialogActions >
                <Button onClick={() => formik.handleSubmit()} >Add</Button>
            </DialogActions>
        </Dialog>
    )
}
