import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthConsumer } from '../context/AuthContext'


const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    const {isAuth, role, auth} = AuthConsumer()


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

        if(books.length > 0) {
            setLoading(false)
        }
    },[])

    const handleDelete = (id) => {
        const deleteBook = async () => {
            try {
                const res = await axios.delete(`http://localhost:5000/api/book/${id}`);
                window.location.reload()
            } catch (error) {
                
            }
        }
        deleteBook();
    }

    console.log(auth, role)
    
    if(loading) {
        return <div>
            
        </div>
    }

    return (
        <div id="home">
            <div className='container'>
                <div className="row">
                    <div className="col">
                       { isAuth &&  <div>
                            <Link to="/add" className='add'>Add book</Link>
                        </div> }
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Book Avatar</th>
                                    <th>Book Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { books.length > 0 && books.map(book => {
                                    return  <tr key={book._id}>
                                    <td><img src={`books/${book.avatar}`} alt="" /></td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>${book.price}</td>
                                    { auth && role === 'admin' && <td>
                                        <Link to={`/${book._id}`} className='edit'>
                                            Edit
                                        </Link>
                                        <button className='delete' onClick={() => handleDelete(book._id)}>
                                            Delete
                                        </button>
                                    </td> }
                                </tr>
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home