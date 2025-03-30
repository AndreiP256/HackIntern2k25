import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
        }
    }, []);
    
    return (
        <div className="auth_flex">
            <div className="auth_img_cont">
                <img className="auth_img" alt="Login" />
            </div>
            <div className="auth_form_cont">
                <LoginForm />
            </div>
            <p onClick={() => navigate('/register')}>Go to Register</p>
        </div>
    );
}

export default Login;