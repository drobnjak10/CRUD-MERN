import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext';


const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {setIsAuth, setRole} = AuthConsumer();
    const cookie = new Cookies();
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/user/login', {email,password});

            console.log(res);
            if(res.data.error) {
                setError(res.data.error)
                return
            }

            localStorage.setItem('access_token', res.data.token)
            cookie.set('access_token', res.data.token);
            setIsAuth(true)
            setRole(res.data.role)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <h2 className="text-center">Login</h2>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <form action="" className="form w-50 mx-auto">
                        <div className="mt-3">
                        <label htmlFor="email">Email:</label> <br />
                                <input type="email" className='form-control rounded-pill' placeholder='email' name="email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mt-3">
                        <label htmlFor="password">Password:</label> <br />
                                <input type="password" className='form-control rounded-pill' placeholder='password' name="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-3">
                        <button className='btn btn-dark form-control rounded-pill' onClick={handleClick}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login