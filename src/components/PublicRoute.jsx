import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Loader } from "./Loader";

export const PublicRoute = ({ children }) => {
    const { session, loading } = UserAuth();

    if (loading) {
        return <Loader label="Checking session" />;
    }

    return (
        <Fragment>
            {session ? <Navigate to="/dashboard" /> : <div>{children}</div>}
        </Fragment>
    );
};