import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
import {userIcon} from '../icons'
import { Link } from 'react-router-dom';
const FriendList = () => {
    const auth = useAuth();

    const {friends = []} = auth.user;
    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>Friend</div>
            {
                friends && friends.length === 0 && (<div className={styles.noFriends}>No Friends</div>)
            }
            {
                (friends && friends.length) && 
                friends.map((friend)=>{
                    return (<div key={`friend-${friend._id}`}>
                        <Link className={styles.friendsItem} to={`/user/${friend.to_user?._id}`}>
                        <div className={styles.friendsImg}>
                            <img
                            src={userIcon}
                            alt="user-icon"
                            /> 
                        </div>
                        <div className={styles.friendsName}>{friend.to_user?.name}</div>
                        </Link>
                    </div>)
                })
            }
        </div>
    );
}

export default FriendList;