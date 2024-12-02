import React from 'react'
import GlobalRouter from './router/router'
import Navbar from './components/navbar/Navbar'
import  BackButton from './components/back-button/BackButton'
import CustomSpinner from './components/spinner/CustomSpinner'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <GlobalRouter />
    </div>
  )
}

export default App