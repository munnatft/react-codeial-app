import { createContext } from "react";
import { useProvidePost } from "../hooks/PostHooks";

const initialState = {
    posts : [],
    loading : true,
    addPostToState : () => {},
    addComment : () => {}
}
export const PostContext = createContext(initialState);

export const PostProvider = ({children})=>{
    const post = useProvidePost();

    return (
        <PostContext.Provider value={post}>
            {children}
        </PostContext.Provider>
    );
}