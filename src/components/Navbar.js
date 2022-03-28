import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../styles/Navbar.module.css';
import { search, userIcon } from '../icons';
import { useAuth } from '../hooks';
import { searchUsers } from '../api';

const Navbar = ()=> {

    const auth = useAuth();
    const navigate = useNavigate();

    const [searchText , setSearchText] = useState('');
    const [userResults , setUserResults] = useState([]);

    useEffect(()=>{
        const getSearchUsers = async () => {
            const res = await searchUsers(searchText);
            if(res.success) {
                setUserResults(res.data.users)
            }
            
        }

        if(searchText.length > 2) {
            getSearchUsers();
        }
        else {
            setUserResults([])
        }
    },[searchText])

    // logout function
    const handleLogout = ()=>{
        auth.logout();
        navigate("/login");
    }

    return (
        <div>
            <div className={styles.nav}>
                <div className={styles.leftDiv}>
                    <Link to="/">
                    <img
                        alt=""
                        src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                    />
                    </Link>
                </div>

                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search..."
                        disabled = {!auth.user}
                        value={searchText}
                        onChange = {(e)=>setSearchText(e.target.value)}
                    />
                    <img src={search} alt="search-icon" className={styles.searchIcon} />
                    {   userResults.length > 0 &&
                        <div className={styles.searchResults}>
                            <ul>
                                {   
                                    userResults.map((user) =>{
                                        return (<li className={styles.searchResultsRow} key={user._id}>
                                                    <Link to={`/user/${user._id}`}>
                                                        <img src={userIcon} alt="user-icon" />
                                                        <span>{user.name}</span>
                                                    </Link>
                                                </li>
                                                )
                                    })
                                }
                                
                            </ul>
                        </div>
                    }
                </div>


                <div className={styles.rightNav}>
                    
                    {auth.user && 
                        <div className={styles.user}>
                            <Link to="/users/profile">
                                <img
                                src={userIcon}
                                alt="user-icon"
                                className={styles.userDp}
                                />
                            
                            </Link>
                            <span>{auth.user.name}</span>
                        </div>
                    }

                    <div className={styles.navLinks}>
                        <ul>
                            {
                                auth.user ?
                                <li onClick={handleLogout}>
                                    Log out
                                </li> :
                                <>
                                    <li>
                                        <Link to="/login">Log in</Link>
                                    </li>
                                    
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
