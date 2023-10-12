import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBooks'
import DeleteBooks from './pages/DeleteBooks'
import EditBooks   from './pages/EditBooks'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/show/:id' element={<ShowBook/>} />
      <Route path='/books/create' element={<CreateBooks/>} />
      <Route path='/books/delete/:id' element={<DeleteBooks/>} />
      <Route path='/books/edit/:id' element={<EditBooks/>} />
    </Routes>
  )
}

export default App
