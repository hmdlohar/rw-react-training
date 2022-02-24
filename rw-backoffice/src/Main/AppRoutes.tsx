import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import NotFound from '../Pages/CommonPages/NotFound';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import { RootState, useSelector } from '../redux/store';
import lsu from '../Services/LocalStorageUtils';
import Companies from '../Pages/Companies/Companies';
import Packages from '../Pages/Packages/Packages';
import Users from '../Pages/Users/Users';
import AddUpdateUser from '../Pages/Users/AddUpdateUser';

export default function AppRoutes() {
    const { user } = useSelector((state: RootState) => state.common)
    const navigate = useNavigate()

    useEffect(() => {
        if (!lsu.lsGet("token"))
            navigate("/login")

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<AddUpdateUser />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
