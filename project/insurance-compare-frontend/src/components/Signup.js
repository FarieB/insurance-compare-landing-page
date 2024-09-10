import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validatePassword = (password) => {
        // Example validation: minimum 6 characters, at least one number and one letter
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Show loading state
        setError(''); // Reset error message

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long and contain both letters and numbers');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data); // Handle successful response (e.g., redirect or show success message)
                // Optionally redirect or show a success message here
            } else {
                setError(data.msg || 'Registration failed');
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
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Username"
                required
            />
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
            <button type="submit" disabled={loading}>Signup</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}
        </form>
    );
};

export default Signup;

