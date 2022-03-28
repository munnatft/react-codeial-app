import { useState } from "react";
import styles from '../styles/login.module.css';
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoggingIn,setIsLoggingIn] = useState(false);

    const auth  = useAuth();

    const navigate = useNavigate();

    //user handle login function

    const handleLoginSubmit = async (e)=>{
        e.preventDefault();
        setIsLoggingIn(true);
        if(!email || !password){
           return  toast.error("All fields are required");
        }
        const res = await auth.login(email,password);
        if(res.success){
            setIsLoggingIn(false);
            toast.success("Successfully loggged in");
            navigate("/");
        }else{
            setIsLoggingIn(false);
            toast.error(res.message);
        }
        
    }

    if(auth.user) {
        return <Navigate to="/" />
    }
    return (
        <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
            <span className={styles.loginSignupHeader}>Log In</span>
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
                <button
                    type="submit"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn?'Logging in...':'Login'}
                </button>
            </div>
        </form>
    );
}
export default Login;