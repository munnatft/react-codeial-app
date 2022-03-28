import styles from '../styles/home.module.css';
import { useState } from 'react';
import { usePost } from '../hooks/PostHooks';
import { addPost } from '../api';
import { toast } from 'react-toastify';

const CreatePost = ()=>{
    
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const posts = usePost();

    const handleAddPostClick = async() => {
      setAddingPost(true);
      const res = await addPost(post);
      if(res.success) {
        setPost('');
        posts.addPostToState(res.data.post);
        toast.success("Post is created successfully.");
      }
      else {
        toast.error(res.message);
      }
      setAddingPost(false);
    }

    return (
        <div className={styles.createPost}>
          <textarea
            className={styles.addPost}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
    
          <div>
            <button
              className={styles.addPostBtn}
              onClick={handleAddPostClick}
              disabled={addingPost}
            >
              {addingPost ? 'Adding post...' : 'Add post'}
            </button>
          </div>
        </div>
    );
}
export default CreatePost;