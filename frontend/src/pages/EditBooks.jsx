import React from 'react'
import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function EditBooks() {
  const [postData, setPostData] = useState({
    title:'', author:'', publishYear:''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`, postData)
    .then((response) => {
      setPostData(response.data)
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)})
  },[])

  const handleEditBook = () => {
    setLoading(true)

    axios.put(`http://localhost:5000/books/${id}`, postData)
    .then((response) => {
      setLoading(false);
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)})
  }


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
              <input
                className='border-2 border-gray-500 px-4 w-full'
                type='text'
                value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})}
              />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
              <input
                className='border-2 border-gray-500 px-4 w-full'
                type='text'
                value={postData.author}
                onChange={(e) => setPostData({...postData, author: e.target.value})}
              />
          </div> 
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Published Year</label>
              <input
                className='border-2 border-gray-500 px-4 w-full'
                type='number'
                value={postData.publishYear}
                onChange={(e) => setPostData({...postData, publishYear: e.target.value})}
              />
          </div> 
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
            Save
          </button>
        </div>
    </div>
  )
}
