import { useContext, useState, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { getPosts } from "../api";


export const usePost = ()=>{
    return useContext(PostContext)
}
export const useProvidePost = ()=>{
    const [posts,setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const fetchPosts = async ()=>{
            const response = await getPosts();
            if(response.success){
                setPosts(response.data.posts)
            }
            setLoading(false);
        }
        fetchPosts();
    },[])

    const addPostToState = (post) => {
        const newPosts = [post,...posts]
        setPosts(newPosts);
    }

    const addComment = (comment,postId) => {
        const newPosts = posts.map((post)=>{
            if(post._id === postId) {
                return {
                    ...post,
                    comments : [...post.comments,comment]
                }
            }
            return post;
        })
        setPosts(newPosts);
    }

    return {
        data : posts,
        loading,
        addPostToState,
        addComment
    }

}