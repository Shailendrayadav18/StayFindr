import AuthForm from "./Authform";
import "./user.css";

export default function Login() {
    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="row g-1 g-md-0 rowPosition">
                <div className="col-md-6 offset-md-3 col-12 px-0 rounded-4 sign-up">
                    <AuthForm />
                </div>
            </div>
        </div>
    )
}