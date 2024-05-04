import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authslice'
import Header from './components/Header'
import Footer from './components/Footer'
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ data }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => { throw error })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (

    <div className="min-h-screen flex flex-wrap content-between bg-gray-600">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>

  ) : null
}

export default App
