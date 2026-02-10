import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext.jsx';
import '../styles/SignUp.scss';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signUpNewUser(email, password);

            if (result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            setError("an error occurred during sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp} className="signup-form">
                <p className="signup-title">Sign Up</p>
                <p className="signup-subtitle">Already have an account? <Link to="/signin" className='signin-link'>Sign In!</Link></p>
                <div className='signup-data'>
                    <input
                        className='signup-input'
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        className='signup-input'
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className='signup-button'>Sign Up</button>
                </div>
                {error && <p className='error-message'>{error}</p>}
            </form>
        </div>
    )
};