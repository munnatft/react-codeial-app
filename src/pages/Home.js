import styles from '../styles/home.module.css';
import {CreatePost, FriendList, Loader} from '../components';
import {Post} from '../components';
import { usePost } from '../hooks/PostHooks';
import { useAuth } from '../hooks';
const Home = ()=>{

    const posts = usePost();
    const auth = useAuth();
    if(posts.loading){
        return <Loader />
    }
    return (
        <div className={styles.home}>
            <div className={styles.postsList}>
                <CreatePost />
                {posts.data.map((post,index) =>{
                    return <Post post={post} key={index} />
                })}
            </div>
            {auth.user && <FriendList />}
        </div>
    );
}


export default Home;