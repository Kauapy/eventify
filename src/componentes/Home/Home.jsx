import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
function Home() {

const handleSignOut = () => {
  localStorage.removeItem('token')
  Navigate("/login")
}

  return (
    <div>
        <header className='header-container'>
            <h1 className='titulo-principal'>Eventify</h1>
            <div className='links-container'>
              <Link className='link02'>Home</Link>
              <Link className='link02'>Events</Link>
            </div>
            <Link onClick={handleSignOut} className='Sign-Out'>Sign out</Link>
        </header>
    </div>
  )
}

export default Home