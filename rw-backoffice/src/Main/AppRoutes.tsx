import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import NotFound from '../Pages/CommonPages/NotFound';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import { RootState, useSelector } from '../redux/store';

export default function AppRoutes() {
    const { user } = useSelector((state: RootState) => state.common)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user, "change")
        if (!user)
            navigate("/login")
        else
            navigate("/")
    }, [user])

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
