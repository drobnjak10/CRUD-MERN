import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext';


const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {setIsAuth} = AuthConsumer();
    const cookie = new Cookies();
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/user/login', {email,password});

            console.log(res);
            if(res.data.error) {
                setError(res.data.error)
                return
            }

            cookie.set('access_token', res.data.token);
            setIsAuth(true)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="home">
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h2>Login</h2>
                        {error && <div className='error'>{error}</div>}
                        <div className="form">
                            <div className="input-group">
                                <label htmlFor="email">Email:</label> <br />
                                <input type="email" placeholder='email' name="email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password:</label> <br />
                                <input type="password" placeholder='password' name="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <button className='login' onClick={handleClick}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login