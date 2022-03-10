import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get('access_token')

    useEffect(() => {
        if(cookie.get('access_token')) {
            setIsAuth(true);
        }
    },[])


    useEffect(() => {
        const checkRole = async() => {
            console.log(token)
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

 
    return <AuthContext.Provider value={{isAuth, setIsAuth, role, setRole}} >
        {children}
    </AuthContext.Provider>
}


export const AuthConsumer = () => {
    return useContext(AuthContext)
}