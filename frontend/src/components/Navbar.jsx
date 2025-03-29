import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    const handleClick = ()=>{
        if(isLoggedIn){
          navigate("/")
          localStorage.removeItem("webtoken")
        }else{
          navigate("/login")
        }
    }
    const [isLoggedIn, setisLoggedIn] = useState(false)
    useEffect(()=>{
      const token = localStorage.getItem("webtoken")
      if(token){
        setisLoggedIn(true)
      }else{
        setisLoggedIn(false)
      }
    },[isLoggedIn])
    
  return (
    <div className='w-[100vw] text-black bg-transparent flex  items-center justify-between px-8 py-4 md:px-16 md:py-4'>
        <h1 id='title' className='text-xl md:text-2xl font-bold cursor-pointer' onClick={()=>{navigate('/')}}>XBlogs</h1>
        <ul className='md:flex gap-6 hidden items-center'>
            <li className='cursor-pointer hover:scale-105 duration-150'><a href="#footer">Contact us</a></li>
            <li className='cursor-pointer hover:scale-105 duration-150'><a href="/blogs">Blogs</a></li>
            <li className='cursor-pointer hover:scale-105 duration-150'><a href="#footer">About us</a></li>
        </ul>
        <button className='px-3 py-1 md:px-4 md:py-2 bg-white hover:scale-105 duration-150 text-black rounded-3xl cursor-pointer' onClick={handleClick}>{isLoggedIn ? "Logout":"Login" }</button>
    </div>
  )
}

export default Navbar
