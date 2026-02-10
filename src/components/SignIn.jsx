import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext.jsx';
import '../styles/SignIn.scss';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const { session, signInUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInUser(email, password);

            if (result.success) {
                console.log("Sign in successful:");
                navigate('/dashboard');
            }
        } catch (error) {
            setError("an error occurred during sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSignin} className="signin-form">
                <p className="signin-title">Sign In</p>
                <p className="signin-subtitle">Don't have an account? <Link to="/signup" className="signup-link">Sign Up!</Link></p>
                <div className="signin-data">
                    <input
                        className='signin-input'
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        className='signin-input'
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="signin-button">Sign In</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
};