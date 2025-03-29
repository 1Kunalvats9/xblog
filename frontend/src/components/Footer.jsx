import React from 'react'

const Footer = () => {
  return (
    <div id='footer' className='w-[90%] flex flex-col md:flex-row items-start gap-6 justify-between bg-[#FFEFDD] border-t-2 px-4 py-4 border-t-black'>
      <div className='w-full md:w-fit'>
        <h1 className='text-4xl mb-4'>Contact</h1>
        <ul>
            <li className='cursor-pointer hover:scale-105 duration-150'>support@xblog.com</li>
            <li className='cursor-pointer hover:scale-105 duration-150'>+91 123456789</li>
        </ul>
      </div>
      <div>
        <h1 className='text-4xl mb-4'>Quick Links</h1>
        <ul>
            <li className='cursor-pointer hover:scale-105 duration-150'>Instagram</li>
            <li className='cursor-pointer hover:scale-105 duration-150'>Twitter</li>
            <li className='cursor-pointer hover:scale-105 duration-150'>Facebook</li>
        </ul>
      </div>
      <div className='w-[100%] md:w-[30%]'>
        <h1 className='text-4xl mb-4'>About us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque rerum ab ullam magni ratione officia.</p>
      </div>
    </div>
  )
}

export default Footer
