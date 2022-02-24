import { createSlice } from "@reduxjs/toolkit";
import { IUserForm } from "../../Pages/Users/AddUpdateUser";
import api from "../../Services/ApiService";
import { IUser, UserInsertObject } from "../../types/User";
import { dispatch } from "../store";

interface IUsersInitialState {
    lstUser?: IUser[]
    isLoading?: boolean
    error?: any
    isDeleteLoading?: boolean
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
        setDeleteLoading(state, action) {
            state.isDeleteLoading = action.payload
        },
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload;
        },
        success(state, action) {
            state.isLoading = false
            state.lstUser = action.payload;
        },
        addSuccess(state, action) {
            state.lstUser = undefined
            state.isLoading = false
            state.isDeleteLoading = false
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

export const addOrEditUser = (values: IUserForm, id: string) => {
    return async () => {
        try {
            await dispatch(slice.actions.setLoading(true))
            const io = new UserInsertObject()
            io.name = values.name
            io.password = values.password
            io.username = values.username
            let data
            if (id) { // Edit case
                io._id = id
                io.password = io.password || undefined;
                data = await api.editUser(io)
            }
            else {
                data = await api.addUser(io)
            }
            await dispatch(slice.actions.addSuccess(data))
            return true
        }
        catch (ex) {
            console.log(ex)
            await dispatch(slice.actions.hasError(ex))
            return false
        }
    }
}


export const deleteUser = (id: string) => {
    return async () => {
        try {
            await dispatch(slice.actions.setDeleteLoading(true))
            let data = await api.deleteUser(id)
            await dispatch(slice.actions.addSuccess(data))
            return true
        }
        catch (ex) {
            console.log(ex)
            await dispatch(slice.actions.hasError(ex))
            return false
        }
    }
}