import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firbase/Firbase.config";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleFormSubmit = e => {
        e.preventDefault();
        //console.log('Form Submitted');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        //reset error and seccess message
        setRegisterError('');
        setSuccess('');
        //password validation
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one uppercase letter');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Password should have at least one lowercase letter');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setRegisterError('Password should have at least one number');
            return;
        }
        else if (!/[@#$%^&*!]/.test(password)) {
            setRegisterError('Password should have at least one special character');
            return;
        }
        else if (!accepted) {
            setRegisterError('Please Accept our terms and condition');
            return;
        }
        //sing up
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully...')
                //Update a user's profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => {
                        console.log('Profile Updated')
                    })

                //Send a user a verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please Check your email for verifi your account ')
                    })
            })
            .catch(error => {
                setRegisterError(error.message);
            })
    };

    return (
        <div className="p-5 bg-pink-100">
            <div className="mx-auto w-1/3">
                <h2 className="mb-5">Register Now</h2>
                <form onSubmit={handleFormSubmit} className="form-control">
                    <input className="w-full py-2 px-4 rounded" type="text" name="name" id="" placeholder="Your Name" required />
                    <br />
                    <input className="w-full py-2 px-4 rounded focus:border focus:border-blue-500 focus:outline-none focus:shadow-2xl focus:shadow-red-700" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="relative">
                        <input className="w-full py-2 px-4 rounded focus:border focus:border-green-500 focus:outline-none"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required />
                        <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-2xl absolute top-2.5 right-2">
                            {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                        </span>
                    </div>
                    <br />
                    <div>
                        <input className="mr-2" type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept Terms and Condition</label>
                    </div>
                    <br />
                    <input className="btn btn-success w-full py-2 px-4" type="submit" value="Register" />
                </form>
                {registerError &&
                    <p className="text-secondary w-3/4 mt-2 bg-warning p-1 rounded">{registerError}</p>
                }
                {success &&
                    <p className="text-success w-3/4 mt-2 bg-green-200 p-1 rounded">{success}</p>
                }
                <p className="pl-2 py-2">Allready have an account? Please  <Link className="underline font-semibold" to='/longin'>Long in</Link></p>
            </div>
        </div>
    );
};

export default Register;
