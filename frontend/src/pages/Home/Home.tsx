import React from 'react';
import useAuth from '../../api/auth/useAuth';

function Home() {
    useAuth()
    return (
        <p>HomePage</p>
    )
}

export default Home;