import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firbase/Firbase.config";
import { useState } from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";


const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleFormSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //reset error and seccess message
        setRegisterError('');
        setSuccess('');

        /*    if (!/[8]/, !/[A-Z]/, !/[a-z]/, !/[0-9]/, !/[!@#$%^&*]/.test(password)) {
               setRegisterError('A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !.');
               return;
           } */

        // Regular expression for password validation
        // const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?![.\n])(?=^.{8,}$).*$/;

        // Check if password meets the criteria
        if (!passwordRegex.test(password)) {
            setRegisterError('A password must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully...');
            })
            .catch(error => {
                console.log('error', error.message)
                setRegisterError(error.message);
            })

    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleFormSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    className="w-full input input-bordered"
                                    required />
                                <span className="absolute text-2xl top-3.5 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEye /> : <IoEyeOff />}
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    {registerError &&
                        <p className="text-secondary w-3/4 bg-warning p-1 rounded">{registerError}</p>
                    }
                    {success &&
                        <p className="text-success w-3/4 bg-green-200 p-1 rounded">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;