import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Add = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const cookie = new Cookies()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(avatar)
        // const book = {name, author, category, price}
        const formData = new FormData();
        formData.set('name', name)
        formData.set('author', author)
        formData.set('price', price)
        formData.set('category', category)
        formData.set('avatar', avatar)

        const token = cookie.get('access_token')
        try {
            const res = await axios.post('http://localhost:5000/api/book/create', formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (res.data.error) {
                setError(res.data.error)
                return
            } else {
                navigate('/')
            }

        } catch (error) {
            setError(true)
        }

    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <h3 className="text-center">Add Book</h3>
                    {error && <div className="alert alert-danger">{error}</div> }
                    <form action="" className="form w-50 mx-auto" onSubmit={handleSubmit}>
                        <div className="mt-3">
                            <label htmlFor="title">Name:</label> <br />
                            <input type="text" placeholder='name' className='form-control rounded-pill'
                                name="name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="authir">Author:</label> <br />
                            <input type="text" placeholder='author' className='form-control rounded-pill'
                                name="author" onChange={e => setAuthor(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="title">Category:</label> <br />
                            <input type="text" placeholder='category' className='form-control rounded-pill'
                                name="category" onChange={e => setCategory(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="price">Price:</label> <br />
                            <input type="number" placeholder='price' className='form-control rounded-pill'
                                name="price" onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="avatar">Avatar:</label> <br />
                            <input type="file" placeholder='avatar' name="avatar" onChange={e => setAvatar(e.target.files[0])} />
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-dark form-control rounded-pill">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       
    )
}

export default Add