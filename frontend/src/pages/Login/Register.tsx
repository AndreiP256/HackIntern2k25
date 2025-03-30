import RegisterForm from "../../components/LoginForm/RegisterForm";

function Register() {
    return (
        <div className="auth_flex">
            <div className="auth_img_cont">
                <img className="auth_img" alt="register" />
            </div>
            <div className="auth_form_cont">
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;