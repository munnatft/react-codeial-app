import styles from '../styles/profile.module.css';
import {userIcon} from '../icons'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend, fetchUserInfo, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { useAuth } from '../hooks';
const UserProfile = ()=>{
    const auth = useAuth();
    const [user,setUser] = useState({});
    const [loading,setloading] = useState(true);
    const [isRequestInProgress,setIsRequestInProgress] = useState(false)
    const {userId} = useParams();
    const navigate = useNavigate();

    // from url parameters , we are getting userId. Using userId , we are fetching the user details such as name,email.
    useEffect(()=>{
        const getUser = async () =>{
            const res = await fetchUserInfo(userId);
            if(res.success) {
                setloading(false)
                setUser(res.data.user)
            }
            else {
                setloading(false)
                toast.error(res.message)
                return navigate('/');
            }
        }
        getUser();
    },[userId])

    // checking whether a user is friend or not
    const checkIfUserAFriend = ()=>{
        const friends = auth.user.friends;
        if(friends){
        const friendIds = friends.map((friend)=>{
            if(friend.to_user){
                return friend.to_user._id
            }
        })
        const index = friendIds.indexOf(userId);
        if(index !== -1){
            return true;
        }
        return false;
        }
        return false;

    }

    //function to add friend to user friends list
    const handleAddFriend = async()=>{
        setIsRequestInProgress(true)
        const response = await addFriend(userId);
        if(response.success){
            const {friendship} = response.data;
            auth.updateUserFriendList(true,friendship);
            toast.success("Congartulations! Now "+friendship.to_user.name+" is your friend")
        }
        else {
            toast.error(response.message);
        }
        setIsRequestInProgress(false)
    }

    // function to remove friend from user friends list
    const handleRemoveFriend = async () => {
        setIsRequestInProgress(true);
        const response = await removeFriend(userId);
        if(response.success) {
            const friendship = auth.user.friends.filter((friend)=>{
                if(friend.to_user){
                    return friend.to_user._id === userId;
                }    
            })
            auth.updateUserFriendList(false,friendship[0]);
            toast.success("Removed from your friends list successfully")
        }
        else{
            toast.error(response.message)
        }
        setIsRequestInProgress(false);
    }


    if(loading){
        return <Loader />
    }

    return (
        <div className={styles.profile}>
            <div className={styles.imgContainer}>
                <img src={userIcon} alt="user-icon" />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user?.email}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{user?.name}</div>               
            </div>
            {
                checkIfUserAFriend() ?
                (<button
                    className={`button ${styles.editBtn}`}
                    disabled = {isRequestInProgress}
                    onClick = {handleRemoveFriend}
                >
                   {isRequestInProgress ? 'Removing Friend...' : 'Remove Friend'}
                </button>
                ) :
                (<button
                    className={`button ${styles.editBtn}`}
                    onClick = {handleAddFriend}
                    disabled = {isRequestInProgress}
                >
                    {isRequestInProgress ? 'Adding Friend...' : 'Add Friend'}
                </button>
                )
            }


        </div>
    );
}

export default UserProfile;