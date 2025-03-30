import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtTokenPayload {
    email: string,
    exp: number,
    iat: number,
    isActive: boolean,
    role: string,
    sub: string
}

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || token === 'undefined') {
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        try {
            const decodedToken: JwtTokenPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;