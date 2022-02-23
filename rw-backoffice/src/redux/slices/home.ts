import { createSlice } from "@reduxjs/toolkit";
import api from "../../Services/ApiService";
import { IDashboardStats } from "../../types/AllTypes";
import { dispatch } from "../store";

interface IHomeInitialState {
    objDashboard?: IDashboardStats
    isLoading?: boolean
    error?: any
}

const initialState: IHomeInitialState = {

};

const slice = createSlice({
    name: "home",
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
        dashboardSuccess(state, action) {
            state.isLoading = false
            state.objDashboard = action.payload;
        },
    },
});

export default slice.reducer

// export const { } = slice.actions


export const getDashboardStat = () => {
    return async () => {
        try {
            dispatch(slice.actions.setLoading(true))
            let data = await api.getCompanyDashboard()
            dispatch(slice.actions.dashboardSuccess(data))
        }
        catch (ex) {
            console.log(ex)
            dispatch(slice.actions.hasError(ex))
        }
    }
}