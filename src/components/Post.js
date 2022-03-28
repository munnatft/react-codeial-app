import styles from '../styles/home.module.css';
import {likeIcon,commentIcon,userIcon} from '../icons';
import { Link } from 'react-router-dom';
import { Comment } from '.';
import { useState } from 'react';
import { createComment } from '../api';
import { usePost } from '../hooks/PostHooks';
import { toast } from 'react-toastify';
const Post = ({post}) => {
  const [comment , setComment] = useState('');
  const posts = usePost();

  const handleAddComment = async(e) => {

    if(e.key === "Enter") {

      const res = await createComment(comment,post._id);
      if(res.success) {
        setComment('');
        posts.addComment(res.data.comment,post._id);
      }
      else {
        setComment('');
        toast.error(res.message)
      }
    }
  }
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img src={userIcon} alt="user-pic" />
          <div>
            <Link 
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img src={likeIcon} alt="likes-icon" />
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img src={commentIcon} alt="comments-icon" />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input 
            placeholder="Start typing a comment"
            value={comment}
            onChange = {(e)=>setComment(e.target.value)}
            onKeyDown = {handleAddComment}
           />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment, index) => {
            return <Comment comment={comment} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
