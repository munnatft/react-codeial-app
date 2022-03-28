import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import styles from '../styles/login.module.css';
const Register = ()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [isSigningUp,setIsSigningUp] = useState(false);
    const auth = useAuth()
    const navigate = useNavigate();

    // user handle register function
    const handleSignUpSubmit = async (e)=>{
        e.preventDefault();
        setIsSigningUp(true);

        //field validation check
        let error = false;
        if(!name || !email || !password || !cpassword){
            toast.error("All fields are required.");
            error=true;
        }
        if(password != cpassword){
            toast.error("Passwords do not match.")
            error=true;
        }
        if(error)
        {
            return setIsSigningUp(false);
        }
        const res = await auth.signup(name,email,password,cpassword);

        // if response success is true then a user is navigated to url('/') else return with error message
        if(res.success){
            setIsSigningUp(false)
            toast.success("Successfully registered")
            navigate('/');
        }
        else{
            setIsSigningUp(false)
            toast.error(res.message)    
        }
        
        

    }

    if(auth.user) {
        return <Navigate to="/" />
    }


    return (
        <form className={styles.loginForm} onSubmit={handleSignUpSubmit}>
            <span className={styles.loginSignupHeader}>Register</span>
            <div className={styles.field}>
                <input 
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input 
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={cpassword}
                    onChange={(e)=>setCpassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <button
                    type="submit"
                    disabled={isSigningUp}
                >
                    {isSigningUp?'Signing up...':'Sign up'}
                </button>
            </div>
        </form>
    );
}
export default Register;