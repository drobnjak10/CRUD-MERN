import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { AuthConsumer } from '../context/AuthContext'

export const Navbar = () => {
    const cookie = new Cookies()
    const { isAuth } = AuthConsumer()



    const logout = async () => {
        const token = cookie.get('access_token')
        try {
            const res = await axios.get('http://localhost:5000/api/user/logout', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.data.error) {
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
        <nav class="navbar navbar-expand-lg  bg-dark">
            <div class="container-fluid">
                <Link class="navbar-brand text-white" to="/">Books.</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse ms-auto" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        {isAuth ?
                            <>
                                <li className="nav-item">
                                    <Link to="/add" className='add nav-link text-white'>Add book</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={logout} className="logout nav-link">Logout</button>
                                </li>
                            </> :
                            <>
                                <li class="nav-item">
                                    <Link to="/login" class="nav-link text-white">Login</Link>
                                </li>

                                <li class="nav-item">
                                    <Link to="/register" className='nav-link text-white'>Register</Link>
                                </li>


                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
