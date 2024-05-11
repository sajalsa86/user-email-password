import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firbase/Firbase.config";
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
const Longin = () => {
    const [showPassword, setShowPssword] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);
    const handleLongin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //reset error
        setRegisterError('');
        setSuccess('');
        //password validation
        // Regular expression for password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?![.\n])(?=^.{8,}$).*$/;

        // Check if password meets the criteria
        if (!passwordRegex.test(password)) {
            setRegisterError('A password must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !.');
            return;
        }
        //longin
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                if (result.user.emailVerified) {
                    setSuccess('Your Longin Successfully..')
                }
                else {
                    alert('Pleae check your email for verify');
                }
            })
            .catch(error => {
                setRegisterError(error.message);

            })
    };
    //forgot password
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            console.log('Pleae Provide an Email', emailRef.current.value);
            return;
        }
        else if (!emailRegex.test(email)) {
            console.log('Please write a valid email');
            return;
        }
        //send password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Check Your email for forget Password');
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLongin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="w-full input input-bordered"
                                    required
                                />
                                <span className="absolute top-3.5 right-2 text-2xl" onClick={() => setShowPssword(!showPassword)}>
                                    {showPassword ? <IoEye /> : <IoEyeOff />}
                                </span>

                            </div>

                            <label className="label">
                                <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {registerError &&
                        <p className="text-secondary bg-yellow-100 p-1 rounded">{registerError}</p>
                    }
                    {success &&
                        <p className="text-success bg-green-200 p-1 rounded">{success}</p>
                    }
                    <p className="pl-2 pb-2">Are you new here? Please <Link className="underline font-semibold" to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Longin;