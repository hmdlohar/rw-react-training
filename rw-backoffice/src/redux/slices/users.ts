import { createSlice } from "@reduxjs/toolkit";
import api from "../../Services/ApiService";
import { IUser } from "../../types/User";
import { dispatch } from "../store";

interface IUsersInitialState {
    lstUser?: IUser[]
    isLoading?: boolean
    error?: any
}

const initialState: IUsersInitialState = {

};

const slice = createSlice({
    name: "users",
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
            state.lstUser = action.payload;
        },
    },
});

export default slice.reducer

// export const { } = slice.actions


export const getUsers = () => {
    return async () => {
        try {
            dispatch(slice.actions.setLoading(true))
            let data = await api.getUsers()
            dispatch(slice.actions.success(data))
        }
        catch (ex) {
            console.log(ex)
            dispatch(slice.actions.hasError(ex))
        }
    }
}