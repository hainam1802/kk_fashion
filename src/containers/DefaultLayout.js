import React, { useState, useEffect } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Header from "./Header";
// import Home from "../pages/Home";
// import Major from "./../pages/Major";
// import Student from "./../pages/Student";
// import MajorEdit from "../pages/MajorEdit";
import routes from "./../routes";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import routesAdmin from "../routesAdmin";
const DefaultLayout = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <>

        <Header />
        <Routes>
            {routesAdmin.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.component} />
            ))}
        </Routes>
        {/*{!isLoggedIn ? (*/}
        {/*    <Navigate to="/login" />*/}
        {/*):(*/}
        {/*    <>*/}
        {/*        <Routes>*/}
        {/*            {routes.map((route, idx) => (*/}
        {/*                <Route key={idx} path={route.path} element={route.component} />*/}
        {/*            ))}*/}
        {/*        </Routes>*/}
        {/*    </>*/}
        {/*)*/}
        {/*}*/}
    </>
  );
};

export default DefaultLayout;
