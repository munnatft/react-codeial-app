import styles from '../styles/profile.module.css';
import {userIcon} from '../icons'
import { useAuth } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Profile = ()=>{
    const auth = useAuth();
    const [isEditMode,setIsEditMode] = useState(false);
    const [isSaving,setIsSaving] = useState(false);
    const [name,setName] = useState(auth.user.name?auth.user.name:'');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    // console.log(auth);

    const clearForm = ()=>{
        setPassword('');
        setCpassword('');
    }

    const handleEditUserInfo = async (e)=>{
        e.preventDefault();
        setIsSaving(true)
        
        // field validation check
        let error = false;
        if(!name || !password || !cpassword){
            toast.error("All fields are required.")
            error=true;
        }
        if(password != cpassword){
            toast.error("Passwords do not match.")
            error=true;
        }
        if(error){
            return setIsSaving(false);
        }
        const res = await auth.updateUserProfile(auth.user._id, name, password, cpassword);
        if(res.success){
            setIsEditMode(false);
            setIsSaving(false);
            console.log(res);
            clearForm();
            return toast.success("User updated successfully");
        }
        else{
            toast.error(res.message);
        }
        setIsSaving(false);
    }

    return (
        <div className={styles.profile}>
            <div className={styles.imgContainer}>
                <img src={userIcon} alt="user-icon" />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            {
                isEditMode ?
                (   <>
                
                    
                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>Name</div>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>Password</div>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>Confirm Password</div>
                            <input type="password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} />
                        </div>
                        <button
                            type="submit"
                            className={`button ${styles.editBtn}`}
                            disabled={isSaving}
                            onClick={handleEditUserInfo}
                        >
                            {isSaving ? 'Updating...' : 'Update'}
                        </button>
                    
                        <button
                            className={`button ${styles.editBtn}`}
                            onClick={()=>setIsEditMode(false)}
                            style={{marginLeft:'10px'}}
                        >
                            Go Back
                        </button>
                    </>
                ) : 
                (
                    <>
                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>Name</div>
                            <div className={styles.fieldValue}>{auth.user?.name}</div>               
                        </div>
                        <button
                            className={`button ${styles.editBtn}`}
                            onClick={()=>setIsEditMode(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                )
            }


        </div>
    );
}

export default Profile;