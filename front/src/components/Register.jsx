import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [error, setError] = useState(false)
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            if (password !== repeatPassword) {
                setError('Password does not matched!')
                return
            }
            const user = { name, lastname, username, email, password }


            const res = await axios.post('http://localhost:5000/api/user/register', user);

            console.log(res);
            if (res.data.error) {
                setError(res.data.error)
                return
            }

            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <h3 className='text-center'>Register</h3>
                    {error &&  <div className='alert alert-danger'>{error}</div> }
                    <form className="form w-50 mx-auto">
                        <div className="mt-3">
                            <label htmlFor="name">Name:</label> <br />
                            <input type="text" placeholder='name' className='form-control rounded-pill'
                                name="name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname">Lastname:</label> <br />
                            <input type="text" placeholder='lastname' className='form-control rounded-pill'
                                name="lastname" onChange={e => setLastname(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="email">Email:</label> <br />
                            <input type="email" placeholder='email' className='form-control rounded-pill'
                                name="name" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="username">Username:</label> <br />
                            <input type="text" placeholder='username' className='form-control rounded-pill'
                                name="username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password">Password:</label> <br />
                            <input type="password" placeholder='password' className='form-control rounded-pill'
                                name="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="repeatPassword">Repeat Password:</label> <br />
                            <input type="password" placeholder='Repeat Password' className='form-control rounded-pill'
                                onChange={e => setRepeatPassword(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <button className='btn btn-dark rounded-pill form-control' onClick={handleClick}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register