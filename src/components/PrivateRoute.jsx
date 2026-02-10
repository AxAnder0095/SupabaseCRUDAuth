import { Fragment } from "react";
import { UserAuth } from "../context/AuthContext";
import { Loader } from "./Loader";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const { session, loading } = UserAuth();

    if (loading) {
        return <Loader label="Checking session" />;
    }

    return (
        <Fragment>
            {session ? <div>{children}</div> : <Navigate to='/signup' />}
        </Fragment>
    );
};