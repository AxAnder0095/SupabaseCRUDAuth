import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.scss';

export const Dashboard = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/')
        } catch (err) {
            console.error("Error signing out:", err.message);
        }
    };

    console.log(session);

    return (
        <div className="dashboard">
            <div className="inner-dashboard">
                <h1>Dashboard</h1>
                <p>Welcome, {session?.user?.email}</p>
                <button onClick={handleSignOut} className="signout-button">Sign Out</button>
            </div>
        </div>
    )
};