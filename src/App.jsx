import React, { Component } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Carousel from './components/Carousel'
import Signin from './pages/Signin'
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

  )
}
export default App