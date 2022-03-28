import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
    fetchUserFrirends,
    login as UserLogin,
    register as UserRegister,
    updateUserInfo,

} from '../api';
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils';
import { LOCALSTORAGE_TOKEN_KEY } from '../utils/constants';
import jwt from 'jwt-decode';


export const useAuth = ()=>{
    return useContext(AuthContext);
}


export const useProvideAuth = ()=>{

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        const getUser = async () => {
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

            if(userToken){
                const userDetails = jwt(userToken);
                const res = await fetchUserFrirends();
                let friends = []
                if(res.success) {
                    friends = res.data.friends;
                }
                setUser({...userDetails,friends});
            }
            setLoading(false);
        }
        getUser();
        
    },[])

    // user sign up method

    const signup = async (name,email,password,confirmPassword)=>{
        const response = await UserRegister(name,email,password,confirmPassword);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );
            return {
                success:true
            }
        }
        else{
            return {
                message:response.message,
                success:false
            }
        }
    }

    const login = async (email,password)=>{
        const response = await UserLogin(email,password);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );
            return {
                success:true
            }
        }else{
            return {
                success:false,
                message:response.message
            }
        }
        
    }


    const logout = ()=>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        
    }

    const updateUserProfile = async (userId, name, password, confirmPassword)=>{
        const response = await updateUserInfo(userId, name, password, confirmPassword);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );
            return {
                success:true
            }
        }
        else{
            return {
                message:response.message,
                success:false
            }
        }
    }

    const updateUserFriendList = (addFriend , friend)=>{
        if(addFriend){
            setUser({
                ...user,
                friends:[...user.friends,friend]
            })
            return ;
        }

        const newFriends = user.friends.filter((newFriend)=>{
            // if(newFriend.to_user) {
                return newFriend.to_user._id !== friend.to_user._id
            // }
        })
        setUser({
            ...user,
            friends:newFriends
        })
    }

    return {
        user,
        loading,
        login,
        logout,
        signup,
        updateUserProfile,
        updateUserFriendList,
    }
}