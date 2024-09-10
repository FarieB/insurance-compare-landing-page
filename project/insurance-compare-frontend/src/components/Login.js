import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Initialize useHistory hook for navigation

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Show loading state
        setError(''); // Reset error message

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('jwtToken', data.token); // Store token in localStorage
                history.push('/dashboard'); // Redirect to another page (e.g., dashboard)
            } else {
                setError(data.msg || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={loading}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}
        </form>
    );
};

export default Login;

