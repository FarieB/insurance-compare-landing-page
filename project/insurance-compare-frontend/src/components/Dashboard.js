import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/auth', {
                method: 'GET',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });

            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <p>Welcome, {user.username}</p>}
        </div>
    );
};

export default Dashboard;

