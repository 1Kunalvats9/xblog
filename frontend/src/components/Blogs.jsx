
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import imgDefault from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Blogs = () => {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [articles, setArticles] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const handleAddComment = (uniqueKey, newComment) => {
    if (!newComment.trim()) return;
  
    setComments((prev) => ({
      ...prev,
      [uniqueKey]: [...(prev[uniqueKey] || []), newComment],
    }));
  };
  const toggleLike = (idx) => {
    const uniqueIdx = page * pageSize + idx; 
    setLikes((prevLikes) => ({
      ...prevLikes,
      [uniqueIdx]: !prevLikes[uniqueIdx],
    }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      let res = await fetch(
        `https://newsapi.org/v2/everything?q=tesla&from=2025-02-28&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=3b57ffb196bb4694968511d83395c9a1`
      );
      let data = await res.json();
      setArticles(data.articles);
    };
    fetchApi();
  }, [page]);

  useEffect(() => {
    const token = localStorage.getItem("webtoken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleNext = () => {
    setPage(page + 1)
  }
  const handlePrev = () => {
    setPage(page - 1)
  }

  return (
    <div className="w-[100vw] min-h-screen bg-[#FFEFDD]">
      <Navbar />
      <div className="w-[100%] flex flex-col items-center justify-start gap-4">
        <h1 className="text-5xl text-black mt-10">Blogs</h1>
        <div className="w-[90%] grid grid-cols-1 pv-4 md:grid-cols-3 gap-4">
          {articles.length === 0 ? (
            <h1 className="text-black">No Blogs</h1>
          ) : (
            articles.map((item, idx) => (
              <div
                key={idx}
                className={`relative bg-white border-2 border-gray-300 px-4 py-3 rounded-xl cursor-pointer transition-all duration-500 ease-in-out overflow-x-hidden overflow-y-scroll scrollbar-none border-box ${expandedIndex === idx
                    ? "md:col-span-2 md:row-span-2 text-xl h-fit"
                    : "h-fit hover:scale-105"
                  }`}
              >
                <img
                  src={item.urlToImage || imgDefault}
                  className="w-full h-[60%] object-cover rounded-lg transition-all duration-300"
                  alt={item.title || "Blog Image"}
                  onError={(e) => {
                    e.target.src = imgDefault;
                  }}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }
                />
                <h1 className="text-black text-sm md:text-lg font-bold mt-3 md:mt-4" onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }>
                  {item.title}
                </h1>
                {expandedIndex === idx && (
                  <div>
                    <h1 className="text-sm mb-1">By <span className="font-bold">{item.author}</span></h1>
                    <p className="text-sm mb-1">{item.description}</p>
                    <p className="text-sm mb-1">{item.content}</p>
                    <h1>Source: {item.source.name}</h1>
                    <a href={item.url} className="text-blue-400" target="_blank">Read more</a>
                    <div className="mt-4 p-3 border-t">
                      <h2 className="text-lg font-semibold">Comments</h2>
                      <div className="flex mt-2">
                        <input
                          type="text"
                          className="border p-2 flex-1 rounded-lg"
                          placeholder="Add a comment..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const uniqueKey = page * pageSize + idx;
                              handleAddComment(uniqueKey, e.target.value);
                              e.target.value = "";
                            }
                          }}
                        />
                      </div>
                      <div className="mt-2">
                        {comments[page * pageSize + idx]?.map((comment, cIdx) => (
                          <p key={cIdx} className="text-sm bg-gray-100 p-2 rounded-lg mt-1">
                            {comment}
                          </p>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
                <div className="flex items-center w-fit gap-3 mt-5" onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(idx);
                }}>
                  {likes[page * pageSize + idx] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-red-500">
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-gray-500">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                  )}
                  <h1 className="w-fit">Like</h1>
                </div>
                {expandedIndex !== idx &&  <p className="text-blue-500 mt-3" onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }>Read more</p>}
                {
                  expandedIndex===idx && <p className="text-red-500 mt-3" onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }>Close</p>
                }
              </div>
            ))
          )}
  
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center mt-6 mb-40">
        <button className={`border-2 ${page === 1 ? 'cursor-not-allowed hover:opacity-60' : 'cursor-pointer'} duration-150 border-black bg-white px-2 py-1 rounded-lg`} onClick={handlePrev} disabled={page === 1 ? true : false}>Prev</button>
        <p>{page}</p>
        <button className={`border-2 ${page === 10 ? 'cursor-not-allowed hover:opacity-60' : 'cursor-pointer'} border-black bg-white px-2 py-1 rounded-lg`} onClick={handleNext} disabled={page === 10 ? true : false}>Next</button>
      </div>
      <div className='w-full flex items-center justify-center'>
          <Footer />
        </div>
    </div>
  );
};
export default Blogs;
