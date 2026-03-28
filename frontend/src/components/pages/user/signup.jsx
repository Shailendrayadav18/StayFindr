import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./user.css";
import { Link } from "react-router-dom"

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate();

    const onSubmit = async(data)=>{
        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data
                })
            });

            const result=await response.json();
            if(result.error){
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="container" style={{height: "100vh"}}> 
                <div className="row rowPosition">
                    <div className="col-6 offset-3 px-5 rounded-4 sign-up">
                        <h3 className="col-7 offset-3 mt-5 mb-4">Signup on Wanderlust</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text" id="username" name="username" className="form-control"
                                    {...register("username", { required: "Username is required!" })}
                                />

                                {errors.username && (
                                    <small className="text-danger">{errors.username.message}</small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email" id="email" name="email" className="form-control"
                                    {...register("email", { required: "Email is required!" })}
                                />

                                {errors.email && (
                                    <small className="text-danger">{errors.email.message}</small>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password" id="password" name="password" className="form-control"
                                    {...register("password", { required: "Password is required!" })}
                                />

                                {errors.password && (
                                    <small className="text-danger">{errors.password.message}</small>
                                )}
                            </div>

                            <div className="d-flex justify-content-around">
                                <button className="btn btn-success fs-5">Signup</button>
                                <div className="align-self-center fs-5">Already have an account? &nbsp;
                                    <Link to={"/login"} style={{textDecoration: "none"}}>
                                    Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}