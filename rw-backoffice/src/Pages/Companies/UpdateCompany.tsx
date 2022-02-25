import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import { CompanyUpdateInsertObject, ICompany } from '../../types/Companies';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik'
import FormikTextField from '../../Components/FormFields/FormikTextField';
import api from '../../Services/ApiService';
import utils from '../../Services/Utils';
import StateAutoComplete from './StateAutoComplete';

interface IUpdateCompany {
    open: boolean
    toggle: () => void
    onComplete: () => void
    objCompany: ICompany
}

const schema = Yup.object({
    invoicePrefix: Yup.string().required('InvoicePrefix is required'),
    companyName: Yup.string().required('CompanyName is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
    companyEmail: Yup.string().email("Enter valid email").required('CompanyEmail is required'),
    companyPhone: Yup.string().required('CompanyPhone is required'),
    gstNo: Yup.string().required('GstNo is required'),
})

export type ICompanyAddForm = CompanyUpdateInsertObject & {

}


export default function UpdateCompany({ objCompany, ...props }: IUpdateCompany) {

    const formik = useFormik<ICompanyAddForm>({
        initialValues: {
            id: objCompany.id,
            invoicePrefix: objCompany.invoicePrefix,
            companyName: objCompany.companyName,
            state: objCompany.state,
            address: objCompany.address,
            companyEmail: objCompany.companyEmail,
            companyPhone: objCompany.companyPhone,
            gstNo: objCompany.gstNo,
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await api.editCompany(values)
                utils.showSuccess("Company update successfully. ")
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
                Update <b>{objCompany.companyName}</b>
            </DialogTitle>
            <DialogContent dividers>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} >
                        <Grid container spacing={1}>

                            <Grid item xs={12}>
                                <FormikTextField label="Company Name" name="companyName" />
                            </Grid>
                            <Grid item xs={12}>
                                <StateAutoComplete
                                    value={formik.values.state}
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
                            <Grid item xs={6}>
                                <FormikTextField label="Invoice Prefix" name="invoicePrefix" />
                            </Grid>
                        </Grid>
                    </form>
                </FormikProvider>
            </DialogContent>
            <DialogActions >
                <Button onClick={() => formik.handleSubmit()} >Update</Button>
            </DialogActions>
        </Dialog>
    )
}
