import React, {createContext, useContext, useState} from 'react';
import {adminRoutes, privateRoutes, publicRoutes} from "./router";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NavigateContext} from "./store/store";
import Header from "./pages/Header/header";
import Home from "./pages/home/home";
import {observer} from "mobx-react-lite";


const AppRouter = () => {
    const [fromHeader, setFromHeader] = useState('')
    const isAuth = !!localStorage.getItem('user_id')

    console.log(isAuth)

    return (

        <BrowserRouter>
            <NavigateContext.Provider value={{
                fromHeader
            }}>

                <Header setFromHeader={setFromHeader}></Header>

                <Routes>
                    <Route path="/home" element={<Home setFromHeader={setFromHeader}/>}/>
                    {isAuth ? privateRoutes.map(route =>
                        <Route element={<route.element/>}
                               path={route.path}
                               exact={route.exact}
                               key={route.path}/>
                    ) : null
                    }

                    {publicRoutes.map(route =>
                        <Route element={<route.element/>}
                               path={route.path}
                               exact={route.exact}
                               key={route.path}/>
                    )}
                    <Route
                        path="*"
                        element={<Navigate to="/home" replace/>}/>

                </Routes>
            </NavigateContext.Provider>
        </BrowserRouter>
    );

};

export default observer(AppRouter);