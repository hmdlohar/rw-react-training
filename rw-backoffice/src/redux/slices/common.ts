import { createSlice } from "@reduxjs/toolkit";
import api from "../../Services/ApiService";
import { IUser } from "../../types/User";
import { RootState } from "../store";

interface ICommonInitislalState {
    isMenuOpen: boolean
    user?: IUser
    isLoading?: boolean
    error?: any
}

const initialState: ICommonInitislalState = {
    isMenuOpen: false,
};

const slice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setMenuOpen(state, action) {
            state.isMenuOpen = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
            state.error = undefined;
        },
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload;
        },
        loginSuccess(state, action) {
            state.isLoading = false
            state.user = action.payload;
        },
    },
});

export default slice.reducer

export const { setMenuOpen } = slice.actions


export const login = (username: string, password: string) => {
    return async (dispatch: any, getState: () => RootState) => {
        try {
            dispatch(slice.actions.setLoading(true))
            let user = await api.login(username, password)
            dispatch(slice.actions.loginSuccess(user))
        }
        catch (ex) {
            console.log(ex)
            dispatch(slice.actions.hasError(ex))
        }
    }
}