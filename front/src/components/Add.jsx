import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Add = () => {
    const [name, setName] =  useState('')
    const [author, setAuthor] =  useState('')
    const [category, setCategory] =  useState('')
    const [price, setPrice] =  useState(0)
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleClick = async () => {
        const book = {name, author, category, price}
        try {
            const res = await axios.post('http://localhost:5000/api/book/create', book);
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
                       <h2>Add New Book</h2>
                       {error && <div className='error'>{error}</div>}
                       <div className="form">
                           <div className="input-group">
                               <label htmlFor="title">Title:</label> <br />
                               <input type="text" placeholder='name' name="name" onChange={e => setName(e.target.value)} />
                            </div>
                           <div className="input-group">
                               <label htmlFor="author">Author:</label> <br />
                               <input type="text" placeholder='author' name="author" onChange={e => setAuthor(e.target.value)}  />
                            </div>
                           <div className="input-group">
                               <label htmlFor="title">Category:</label> <br />
                               <input type="text" placeholder='category' name="category" onChange={e => setCategory(e.target.value)}  />
                            </div>
                           <div className="input-group">
                               <label htmlFor="price">Price:</label> <br />
                               <input type="number" placeholder='price' name="price" onChange={e => setPrice(e.target.value)} />
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

export default Add