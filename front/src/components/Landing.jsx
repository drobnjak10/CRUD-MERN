import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AuthConsumer } from '../context/AuthContext';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Landing = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    const { isAuth, role, auth } = AuthConsumer()
    const cookie = new Cookies()


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/book/');
                setBooks(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchBooks()

        if (books.length > 0) {
            setLoading(false)
        }
    }, [])



    const handleDelete = (id) => {
        const deleteBook = async () => {
            const token = cookie.get('access_token')
            try {
                const res = await axios.delete(`http://localhost:5000/api/book/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                window.location.reload()
            } catch (error) {

            }
        }
        deleteBook();
    }



    if (loading) {
        return <div>

        </div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Avatar</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Price</th>
                                { auth && role === 'admin' && <th>Actions</th> }
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 && books.map(book => {
                                return <tr key={book._id}>
                                    <td>{book._id}</td>
                                    <td><img src={`books/${book.avatar}`} alt="" width={100} /></td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>${book.price}</td>
                                    {auth && role === 'admin' && <td>
                                        <Link to={`/${book._id}`} className='btn btn-warning rounded-pill text-white'>
                                            Edit
                                        </Link>
                                        <button className='btn btn-danger rounded-pill ms-1' onClick={() => handleDelete(book._id)}>
                                            Delete
                                        </button>
                                    </td>}
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Landing