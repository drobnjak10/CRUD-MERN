import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

const Edit = () => {
    const [book, setBook] = useState({});
    const [name, setName] =  useState(book.name)
    const [author, setAuthor] =  useState(book.author)
    const [category, setCategory] =  useState(book.category)
    const [price, setPrice] =  useState(book.price)
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const {id} = useParams()
    
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const {data} = await axios.get(`http://localhost:5000/api/book/${id}`);
                setBook(data);
            } catch (error) {
                setError(error)
            }
        }
        fetchBook()
    }, [id])
    
    const handleClick = async () => {
        const book = {name, author, category, price}
        try {
            const res = await axios.put(`http://localhost:5000/api/book/edit/${id}`, book);
            console.log(res)
            if(res.data.error) {
                setError(res.data.error)
                return
            } else {
                navigate('/')
            }
           
        } catch (error) {
            console.log(error)            
        }

    }

    

  return (
    <div id="home">
            <div className='container'>
                <div className="row">
                    <div className="col">
                       <h2>Edit Book</h2>
                       {error && <div className='error'>{error}</div>}
                       <div className="form">
                           <div className="input-group">
                               <label htmlFor="title">Title:</label> <br />
                               <input type="text" defaultValue={book.name} placeholder={book.name} name="name" onChange={e => setName(e.target.value)} />
                            </div>
                           <div className="input-group">
                               <label htmlFor="author">Author:</label> <br />
                               <input type="text" defaultValue={book.author} placeholder={book.author} name="author" onChange={e => setAuthor(e.target.value)}  />
                            </div>
                           <div className="input-group">
                               <label htmlFor="title">Category:</label> <br />
                               <input type="text" defaultValue={book.category} placeholder={book.category} name="category" onChange={e => setCategory(e.target.value)}  />
                            </div>
                           <div className="input-group">
                               <label htmlFor="price">Price:</label> <br />
                               <input type="number" defaultValue={book.price} placeholder={book.price} name="price" onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <button className='add' onClick={handleClick}>Add</button>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Edit