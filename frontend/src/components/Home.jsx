import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [imgIdx, setimgIdx] = useState(0)
    const handleClick = ()=>{
        navigate("/blogs")
    }
    const images = [
      "https://cryptoslate.com/wp-content/uploads/2023/08/elonmusk-x-768x403.jpg",
      "https://www.theglobeandmail.com/resizer/v2/JDAYC7F5RZFPVOZYHTOWYNIZ3A.JPG?auth=9fe3c24b9796bc84cf9fa6ebefb8472086382784654c1693f4f169195fefb2f3&width=900&quality=80",
      "https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/30/full/1714454526-2588.JPG?im=FeatureCrop,size=(826,465)"
    ]
    useEffect(()=>{
      setTimeout(()=>{
        setimgIdx((imgIdx+1)%images.length)
      },4000)
    })
  return (
    <>
      <div className='min-h-screen bg-[#FFEFDD] flex items-center justify-start flex-col '>
        <Navbar />
        <div className='w-[100vw] min-h-screen flex flex-col lg:flex-row items-center mt-4 justify-center px-8 md:px-12 lg:px-0'>
          <div className='w-[95vw] z-10 lg:w-[40vw] h-[90%]'>
            <h1 className='text-black text-3xl px-6 md:px-0 md:text-6xl'>Stay Informed with the latest updates <span className='italic font-light'>and Blog Highlight</span></h1>
            <p className='text-black mt-4 md:mt-10 px-6 md:px-0 font-light text-lg'>Welcome to XBlog, your go-to source for the latest updates on Elon Musk and Tesla. From groundbreaking EV technology to bold business moves, we bring you in-depth coverage of Tesla’s journey toward a sustainable future.</p>
            <button className='px-3 ml-6 md:ml-0 py-1 md:px-4 md:py-2 bg-white hover:scale-105 duration-150 text-black rounded-3xl cursor-pointer mt-4' onClick={handleClick}>Get Started</button>
            <div className='flex flex-col px-6 md:px-0 justify-start gap-4 mt-4 items-start'>
              <div className='flex gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512"><path fill="#000" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                <h1 className='text-black'>Market Impact</h1>
              </div>
              <div className='flex gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512"><path fill="#000" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                <h1 className='text-black'>EV Evolution</h1>
              </div>
              <div className='flex gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512"><path fill="#000" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                <h1 className='text-black'>AI & Automation</h1>
              </div>
              <div className='flex gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512"><path fill="#000" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                <h1 className='text-black'>Sustainability</h1>
              </div>
            </div>
          </div>
          <div className='w-[90vw] lg:w-[40vw] mt-10 ml-4 mb-[2rem] md:mb-[15rem] object-cover h-[40vh] sm:order-1 order-2'>
            <img className='w-full rounded-xl' src={images[imgIdx]} alt="" />
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Home
