import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const cookie = new Cookies();

    useEffect(() => {
        if(cookie.get('access_token')) {
            setIsAuth(true);
        }
    },[])

 
    return <AuthContext.Provider value={{isAuth, setIsAuth}} >
        {children}
    </AuthContext.Provider>
}


export const AuthConsumer = () => {
    return useContext(AuthContext)
}