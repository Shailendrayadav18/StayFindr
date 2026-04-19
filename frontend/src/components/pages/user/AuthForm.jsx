import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

export default function AuthForm({
    mode = "login",
    inline = false,
    onSuccess
}) {
    const [authMode, setAuthMode] = useState(mode);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAuth = async (data) => {
        try {
            const endpoint =
                authMode === "login"
                    ? "http://localhost:8080/login"
                    : "http://localhost:8080/signup";

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.error) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            setUser(result.user);

            const hostRedirect = localStorage.getItem("redirectAfter");

            if (onSuccess) {
                onSuccess();
            } else if (hostRedirect === "host") {
                localStorage.removeItem("redirectAfter");
                navigate("/account/listings");
            } else {
                navigate("/");
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className={inline ? "inline-css p-4" : "auth-box p-4 rounded-4"}>
            <h4 className="mb-3 text-center">
                {authMode === "login" ? (inline ? "Login to add review":"Login on StayFindr") : (inline ? "Signup to add review" : "Signup on StayFindr")} 
            </h4>

            <form onSubmit={handleSubmit(handleAuth)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    {errors.username && (
                        <small className="text-danger">
                            {errors.username.message}
                        </small>
                    )}
                </div>

                {authMode === "signup" && (
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <small className="text-danger">
                            {errors.password.message}
                        </small>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success w-25">
                        {authMode === "login" ? "Login" : "Signup"}
                    </button>
                </div>
            </form>

            <div className="text-center mt-3">
                {authMode === "login" ? (
                    <>
                        Don’t have an account?{" "}
                        <span
                            className="auth-link"
                            onClick={() => setAuthMode("signup")}
                        >
                            Signup
                        </span>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <span
                            className="auth-link"
                            onClick={() => setAuthMode("login")}
                        >
                            Login
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}