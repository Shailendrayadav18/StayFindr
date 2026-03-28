import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./user.css";
import { Link } from "react-router-dom"

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate();

    const onSubmit = async(data)=>{
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                credentials:"include",
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
            console.log(result.user);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="container" style={{height: "100vh"}}> 
                <div className="row rowPosition">
                    <div className="col-6 offset-3 px-5 rounded-4 sign-up" style={{height: "23rem"}}>
                        <h3 className="col-7 offset-3 mt-5 mb-3">Signup on Wanderlust</h3>
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

                            <div className="mb-4">
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
                                <button className="btn btn-success fs-5">Login</button>
                                <div className="align-self-center fs-5">Not an existing user? &nbsp;
                                    <Link to={"/signup"} style={{textDecoration: "none"}}>
                                    Signup
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