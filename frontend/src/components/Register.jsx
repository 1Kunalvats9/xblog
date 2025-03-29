import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("http://localhost:3000/routes/auth/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), 
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User registered successfully:", data);
        alert(data.message);
        router("/login");
      } else {
        console.log("User registration failed:", data.message);
        alert(data.message);
      }
      router("/login")
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-[#FFEFDD] flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex bg-white flex-col gap-5 border-2 border-gray-500 px-6 py-4 rounded-xl'>
        <h1>Register Form</h1>
        <input type="text" placeholder='Name' className='outline-none w-full' onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder='Email' className='outline-none w-full' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Enter your password' className='outline-none w-full' onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='bg-green-500 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-600'>Register</button>
        <h3>Already have an account? <a href="/login" className='underline'>Login</a></h3>
        </form>
    </div>
  )
}

export default Register;
