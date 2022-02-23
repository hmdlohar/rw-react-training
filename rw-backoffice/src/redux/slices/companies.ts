import { createSlice } from "@reduxjs/toolkit";
import api from "../../Services/ApiService";
import { ICompany } from "../../types/Companies";
import { dispatch } from "../store";

interface ICompaniesInitialState {
    lstCompanies?: ICompany[]
    isLoading?: boolean
    error?: any
}

const initialState: ICompaniesInitialState = {

};

const slice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
            state.error = undefined;
        },
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload;
        },
        success(state, action) {
            state.isLoading = false
            state.lstCompanies = action.payload;
        },
    },
});

export default slice.reducer

// export const { } = slice.actions


export const getCompanies = () => {
    return async () => {
        try {
            dispatch(slice.actions.setLoading(true))
            let data = await api.getCompanies()
            dispatch(slice.actions.success(data))
        }
        catch (ex) {
            console.log(ex)
            dispatch(slice.actions.hasError(ex))
        }
    }
}