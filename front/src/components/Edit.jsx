import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Edit = () => {
    const cookies = new Cookies();
    const [book, setBook] = useState(null);
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/book/${id}`);
                setBook(data);
                console.log(book)
                console.log(data)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }
        fetchBook()
    }, [id])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('name', book.name)
        formData.append('author', book.author)
        formData.append('price', book.price)
        formData.append('category', book.category)


        if (avatar) {
            formData.append('avatar', avatar)
        } else {
            formData.append('avatar', book.avatar)
        }

        const token = cookies.get('access_token')
        

        try {
            const res = await axios.put(`http://localhost:5000/api/book/edit/${id}`, formData, {
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

    if (loading || !book) {
        return <>load</>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <h3 className='text-center'>Edit Book</h3>
                    {error && <div className="alert alert-danger">{error}</div> }
                    <form action="" className="form mx-auto w-50" onSubmit={handleSubmit}>
                        <div className="mt-3">
                            <label htmlFor="">Title:</label> <br />
                            <input type="text" placeholder={book.name} className="form-control rounded-pill"
                                name="name" onChange={e => setBook({ ...book, name: e.target.value })} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Author:</label> <br />
                            <input type="text" placeholder={book.author} className="form-control rounded-pill"
                                name="author" onChange={e => setBook({ ...book, author: e.target.value })} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Category:</label> <br />
                            <input type="text" placeholder={book.category} className="form-control rounded-pill"
                                name="category" onChange={e => setBook({ ...book, category: e.target.value })} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Price:</label> <br />
                            <input type="number" placeholder={book.price} className="form-control rounded-pill"
                                name="price" onChange={e => setBook({ ...book, price: e.target.value })} />
                        </div>
                        <div className="mt-3">
                            <img src={`books/${book.avatar}`} alt="" width={75} /> <br />
                            <label htmlFor="avatar">Avatar:</label> <br />
                            <input type="file" placeholder='avatar' name="avatar" onChange={e => setAvatar(e.target.files[0])} />
                        </div>
                        <div className="mt-3">
                        <button className='btn form-control bg-dark rounded-pill text-white'>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit