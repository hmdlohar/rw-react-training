import { createSlice } from "@reduxjs/toolkit";
import api from "../../Services/ApiService";
import { IPackage } from "../../types/Packages";
import { dispatch } from "../store";

interface IPackageInitialState {
    lstPackage?: IPackage[]
    isLoading?: boolean
    error?: any
}

const initialState: IPackageInitialState = {

};

const slice = createSlice({
    name: "package",
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
            state.lstPackage = action.payload;
        },
    },
});

export default slice.reducer

// export const { } = slice.actions


export const getPackages = () => {
    return async () => {
        try {
            dispatch(slice.actions.setLoading(true))
            let data = await api.getPackages()
            dispatch(slice.actions.success(data))
        }
        catch (ex) {
            console.log(ex)
            dispatch(slice.actions.hasError(ex))
        }
    }
}