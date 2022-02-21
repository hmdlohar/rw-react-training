import React from 'react'
import { Routes, Route } from "react-router-dom";
import NotFound from '../Pages/CommonPages/NotFound';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';

export default function AppRoutes() {
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
