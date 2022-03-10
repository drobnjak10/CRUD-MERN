import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [error, setError] = useState(false)
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            if(password !== repeatPassword) {
                setError('Password does not matched!')
                return
            }
            const user = {name,lastname,username,email,password}

            
            const res = await axios.post('http://localhost:5000/api/user/register', user);

            console.log(res);
            if(res.data.error) {
                setError(res.data.error)
                return
            }

            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="home">
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h2>Register</h2>
                        {error && <div className='error'>{error}</div>}
                        <div className="form">
                            <div className="input-group">
                                <label htmlFor="name">Name:</label> <br />
                                <input type="text" placeholder='name' name="name" onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastname">Lastname:</label> <br />
                                <input type="text" placeholder='lastname' name="lastname" onChange={e => setLastname(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="username">Username:</label> <br />
                                <input type="text" placeholder='username' name="username" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email:</label> <br />
                                <input type="email" placeholder='email' name="email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password:</label> <br />
                                <input type="password" placeholder='password' name="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Repeat password:</label> <br />
                                <input type="password" placeholder='password' name="repeatPassword" onChange={e => setRepeatPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <button className='login' onClick={handleClick}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register