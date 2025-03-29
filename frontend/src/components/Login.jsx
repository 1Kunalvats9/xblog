import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      let res = await fetch("http://localhost:3000/routes/auth/login",{
        method:"POST",
        body: JSON.stringify({
          email,password
        }),
        headers:{
          'Content-Type':"application/json"
        }
      })
      const data = await res.json()
      if(res.ok){
        alert("User Logged in Succesfully")
        localStorage.setItem("webtoken",data.token)
        router("/blogs")
      }
      else{
        alert(data.message)
      }
    }catch(err){
      console.log("User not logged in")
      alert(err)
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-[#FFEFDD] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex w-[80vw] md:w-[30vw] h-fit bg-white flex-col gap-5 border-2 border-gray-500 px-6 py-10 rounded-xl' >
        <h1 className='text-center text-2xl'>Login Form</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' placeholder='Enter email' className='outline-none w-full border-2 border-gray-300 rounded-lg px-4 py-2' onChange={(e)=>{
          setEmail(e.target.value)
        }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id='password' placeholder='Enter password' className='outline-none w-full border-2 border-gray-300 rounded-lg px-4 py-2' onChange={(e)=>{
          setPassword(e.target.value)
        }} />
        <button className='bg-green-500 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-600'>Login</button>
        <h3>Don't have an account ? <a href="/register" className='underline'>Register</a></h3>
      </form>
    </div>
  )
}

export default Login
