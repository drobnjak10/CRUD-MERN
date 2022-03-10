import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { AuthConsumer } from '../context/AuthContext'

export const Navbar = () => {
    const cookie = new Cookies()
    const {isAuth} = AuthConsumer()    
 


    const logout = async () => {
        const token = cookie.get('access_token')
        try {
            const res = await axios.get('http://localhost:5000/api/user/logout', {
                headers:{
                    authorization: `Bearer ${token}` 
                }
            });

            if(res.data.error) {
                console.log(res.data.error);
                return;
            } 
            console.log(res)
            cookie.remove('access_token')
            window.location.reload();
         } catch (error) {
            
        }
    }

    
    
    return (
        <div className='nav'>
            <div className="row">
                <div className="left">
                    <div className="logo">Books.</div>
                </div>
                <div className="right">
                    {/* <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link> */}
                    {isAuth ? 
                        <button onClick={logout} className="logout">Logout</button> : 
                        <>
                            <Link to="/login">Login</Link> 
                            <Link to="/register">Register</Link> 
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
