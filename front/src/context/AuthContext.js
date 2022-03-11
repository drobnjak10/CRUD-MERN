import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState('admin');
    const cookie = new Cookies();
    const token = cookie.get('access_token')
    let auth = cookie.get('access_token') ? true : false


    const checkAuth = () => {
        if(!cookie.get('access_token')) {
            auth = false
        }
    }


    useEffect(() => {
        // if(cookie.get('access_token')) {
        //      setIsAuth(true);
        // }

        // if(localStorage.getItem('access_token')) {
        //     setIsAuth(true)
        // }

        checkAuth();
    },[])


    useEffect(() => {
        const checkRole = async() => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/checkRole', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                setRole(res.data);
            } catch (error) {
                
            }
        }
        checkRole()
    },[])

 
    return <AuthContext.Provider value={{isAuth, setIsAuth, role, setRole, auth}} >
        {children}
    </AuthContext.Provider>
}


export const AuthConsumer = () => {
    return useContext(AuthContext)
}