import React from 'react'
import { useState, useEffect} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteBooks() {
  
  const [loading, setLoading] = useState(true)

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    axios.delete(`http://localhost:5000/books/${id}`)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  return (
    <div>
      {handleDeleteBook()}
    </div>
  )
}
