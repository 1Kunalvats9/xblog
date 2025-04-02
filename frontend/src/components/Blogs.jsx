
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
  const articleBlogs =[
    {
      "source": {
        "id": null,
        "name": "Feber.se"
      },
      "author": "Wille Wilhelmsson",
      "title": "Corning presenterar Gorilla Glass Ceramic",
      "description": "Ska skydda våra mobilskärmar bättre\n\n\n\n\n\n\nCorning, företaget som specialiserat sig på att ta fram stöttåligt glas till mobiltelefoner och annat, har nu presenterat något som man kallar för \"Gorilla Glass Ceramic\". \n\nPrecis som namnet på det nya glaset antyder…",
      "url": "https://feber.se/mobil/corning-presenterar-gorilla-glass-ceramic/478298/",
      "urlToImage": "https://static.feber.se/article_images/61/44/49/614449.jpg",
      "publishedAt": "2025-04-01T09:40:00Z",
      "content": "Teknik\r\nMotor\r\nSamhälle\r\nSpel\r\nPopkultur\r\nTjock\r\n17 idag\r\n42 igår\r\nTipsa!\r\nSkaffa Feber+\r\nOpenAI värderas nu till 3 biljoner\r\nEfter ny finansieringsrunda\r\n31.1°\r\n0\r\nAnnons från \r\nAnnons\r\nHär är trail… [+38253 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Biztoc.com"
      },
      "author": "barrons.com",
      "title": "These Stocks Are Moving the Most Today",
      "description": "Tesla, XPeng, PVH, Progress Software, Nvidia, Newsmax, and More",
      "url": "https://biztoc.com/x/cebf041a46708724",
      "urlToImage": "https://biztoc.com/cdn/cebf041a46708724_s.webp",
      "publishedAt": "2025-04-01T09:38:19Z",
      "content": "Tesla, XPeng, PVH, Progress Software, Nvidia, Newsmax, and More\r\nThis story appeared on barrons.com, 2025-04-01 09:32:15."
    },
    {
      "source": {
        "id": null,
        "name": "Www.dr.dk"
      },
      "author": null,
      "title": "Salget af Tesla-biler er mere end halveret",
      "description": "Det går dårligt for Tesla i Danmark.",
      "url": "https://www.dr.dk/nyheder/seneste/salget-af-tesla-biler-er-mere-end-halveret",
      "urlToImage": "https://asset.dr.dk/drdk/freja-images/317?im=AspectCrop%3D%28700%2C394%29%2CxPosition%3D.5%2CyPosition%3D.5%3BResize%3D%28700%2C394%29",
      "publishedAt": "2025-04-01T09:37:00Z",
      "content": "De seneste ugers \"uafbrudte angreb\" har medført, at \"de Iran-støttede Houthi-terrorister er blevet decimeret\".\r\nSådan lyder meldingen mandag fra den amerikanske præsident, Donald Trump, i et opslag p… [+616 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Aftonbladet.se"
      },
      "author": null,
      "title": "Svensk pojke skyldig till mordförsök i Köpenhamn",
      "description": "En svensk 17-åring som hyrdes in för att skjuta en man i Danmark är skyldig till mordförsök, har Köpenhamns tingsrätt…",
      "url": "https://www.aftonbladet.se/nyheter/a/Rr77qd/aftonbladet-direkt?pinnedEntry=1362906",
      "urlToImage": "https://imbo.vgc.no/users/bt/images/369fec08a8fe3cdb617edf5481199dc2?t%5B%5D=maxSize%3Awidth%3D1200&publicKey=bt-w&accessToken=0e2da9c46150a6e3fa1c5d92e5d93e840a5a66fb2c8980fa5d91857c77dfbea4",
      "publishedAt": "2025-04-01T09:35:31Z",
      "content": "\u003Cul\u003E\u003Cli\u003ESvensk pojke skyldig till mordförsök i Köpenhamn\r\nKöpenhamns tingsrätt (byret) har kommit fram till att en åtalad svensk 17-åring är skyldig till ett mordförsök i Köpenhamn den 31 juli förra … [+11434 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Origo.hu"
      },
      "author": "Origo",
      "title": "Fillérekért lehet most luxusautókat venni a NAV-tól",
      "description": "Több tucat autót árverez el a Nemzeti Adó- és Vámhivatal (NAV), köztük BMW-ket és Mercedeseket, de most első alkalommal Teslák is megjelentek a kínálatban. A kikiáltási árak nagyon csábítóak, de érdemes megnézni a járművek egyéb adatait is.",
      "url": "https://www.origo.hu/gazdasag/2025/04/arveres-luxusauto-nav",
      "urlToImage": "https://cdn.origo.hu/2025/03/WstMDll53NsGCZSRqfahBAuStOKWsJy9Mo_ihmDZiJo/fill/1200/675/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50L2VlY2QxOGMwNjBkODQwZWY4NjUyNWJiNTQyODliYWFk.webp",
      "publishedAt": "2025-04-01T09:32:55Z",
      "content": "A jármveket 100 ezer és 3,5 millió forint között hirdette meg eladásra az adóhatóság, van közöttük személyautó, kamion, motor, utánfutó is. A NAV honlapján jelenleg 96 darab járm várja új tulajdonosá… [+1109 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Mail.ru"
      },
      "author": "Полина Тихонова",
      "title": "Первый в мире робот-ребенок теперь может устраивать истерики",
      "description": "Ранняя версия имела интеллект 3-летнего малыша, а обновленная по развитию сравнялась с 6-летним ребенком. Рободевочка играет в виртуальном детском саду и впитывает ценности из цифровой среды.\nКитай представил обновленную версию искусственного интеллекта TongT…",
      "url": "https://hi-tech.mail.ru/news/124845-pervyj-v-mire-robot-rebenok-teper-mozhet-ustraivat-isteriki/",
      "urlToImage": "https://resizer.mail.ru/p/95519806-fcce-5bb3-8f1b-d8025a9f3b6c/AQAK_L8kJ5_t3pOXzIMmI0G9fuIhuV5sp_q7T5t2J1-x_evhyE98CAPTuEnwGEwri57uUtksK5HyJVHq8glMxFQC9Z4.png",
      "publishedAt": "2025-04-01T09:32:21Z",
      "content": "TongTong 2.0.   «», 5−6 .   ,   ,   .   ,   .\r\nTongTong 1.0 . ,    .        . ,   ,     ,   .\r\nTongTong 2.0 ,     «». ,  : ,   .   .\r\n  . Ameca  Engineered Arts   ,    Tesla   Optimus, . Sony Aibo — … [+65 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bolsamania.com"
      },
      "author": "redaccion@bolsamania.com (Bolsamanía)",
      "title": "El peor ETF de lo que va de 2024 invierte en criptos y ha perdido más de un 40%",
      "description": "El fondo cotizado en bolsa (ETF, por sus siglas en inglés) Valkyrie Bitcoin Mining (WGMI) de CoinShares es el ETF con peor rendimiento en 2025, con una caída del 43% en lo que va de año, según el analista de ETF de Bloomberg, Eric Balchunas.",
      "url": "https://www.bolsamania.com/noticias/criptodivisas/peor-etf-2024-invierte-criptos-perdido-mas-40--19248586.html",
      "urlToImage": "https://img4.s3wfg.com/web/img/images_uploaded/9/e/ep_mineriacriptomoneda.jpg",
      "publishedAt": "2025-04-01T09:25:28Z",
      "content": "El fondo cotizado en bolsa (ETF, por sus siglas en inglés) Valkyrie Bitcoin Mining (WGMI) de CoinShares es el ETF con peor rendimiento en 2025, con una caída del 43% en lo que va de año, según el ana… [+2357 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Mail.ru"
      },
      "author": "Известия - Общий",
      "title": "Подсчитано количество автомобилей Tesla в России",
      "description": "«Автостат»: в России насчитывается 6,7 тыс. автомобилей Tesla",
      "url": "https://auto.mail.ru/article/103870-podschitano-kolichestvo-avtomobilej-tesla-v-rossii/",
      "urlToImage": "https://resizer.mail.ru/p/7b353080-875a-5189-b32d-403d2a648799/AQABCN_iMpyzstBpzhO8sxgZeCFa_CW9xr8wVmUvi0vIS1WhU1mmRqXIHarVJAhdhggTEVdZqSiouEKAmWClMvuJ1gQ.jpg",
      "publishedAt": "2025-04-01T09:20:00Z",
      "content": "Tesla 4308 .     2025 6745 . (2,4 .)     .     Telegram- 1  «» .\r\n,  2013   Tesla.       100 .  2020-    221 ,  2021- —  736 .  2022- 991 ,  2023- — 1257 .,   2024- — 685 .   2025   34 .\r\nTesla (52%)… [+104 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Feber.se"
      },
      "author": "Hugo Engström",
      "title": "Asus hintar om ny ROG Ally 2",
      "description": "Eller är det ett aprilskämt?\n\n\n\n\n\n\nAsus har laddat upp en kort teaservideo på X som verkar säga att företaget är på gång med en ny generation av deras handhållna spelkonsol ROG Ally. Videon visar inte själva produkten men innehåller text som hintar om förbätt…",
      "url": "https://feber.se/spel/asus-hintar-om-ny-rog-ally-2/478296/",
      "urlToImage": "https://static.feber.se/article_images/61/44/48/614448.jpg",
      "publishedAt": "2025-04-01T09:20:00Z",
      "content": "Teknik\r\nMotor\r\nSamhälle\r\nSpel\r\nPopkultur\r\nTjock\r\n11 idag\r\n42 igår\r\nTipsa!\r\nSkaffa Feber+\r\nOpenAI värderas nu till 3 biljoner\r\nEfter ny finansieringsrunda\r\n32.1°\r\n0\r\nAnnons från \r\nAnnons\r\nHär är trail… [+36315 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Puromarketing.com"
      },
      "author": null,
      "title": "Zara, la única española en el ránking mundial de las 50 marcas más influyentes por su repercusión en medios y RRSS",
      "description": "¿Cuáles son las 50 empresas más influyentes en el mundo según su repercusión en medios de comunicación y en redes sociales?Youtube, Amazon y Google lideran este ránking donde sólo aparece una empresa española: Zara (puesto 46). Y es que hay dominio absoluto d…",
      "url": "https://www.puromarketing.com/14/215351/zara-unica-espanola-ranking-mundial-marcas-influyentes-repercusion-medios-rrss",
      "urlToImage": "https://www.puromarketing.com/uploads/img/contents/2025/OmIjCap6dbwueMEQy2Po/OmIjCap6dbwueMEQy2Po_post_imagen_prev.jpg",
      "publishedAt": "2025-04-01T09:17:46Z",
      "content": "¿Cuáles son las 50 empresas más influyentes en el mundo según su repercusión en medios de comunicación y en redes sociales?\r\nYoutube, Amazon y Google lideran este ránking donde sólo aparece una empre… [+3626 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Directoalpaladar.com"
      },
      "author": "Liliana Fuchs",
      "title": "Elon Musk ya ha encontrado chef para su restaurante de Tesla, un \"creador de delicias\" famoso por reinventar el queso americano",
      "description": "Sin haberse hecho oficial todavía, es un secreto a voces en los medios estadounidenses que Elon Musk ya tiene atado a su nuevo fichaje, el cocinero encargado de diseñar la oferta culinaria de su próximo gran proyecto empresarial. Situado en los Ángeles, el re…",
      "url": "https://www.directoalpaladar.com/actualidad-1/elon-musk-ha-encontrado-chef-para-su-restaurante-tesla-creador-delicias-famoso-reinventar-queso-americano",
      "urlToImage": "https://i.blogs.es/f9340f/chef/840_560.jpeg",
      "publishedAt": "2025-04-01T09:16:35Z",
      "content": "Sin haberse hecho oficial todavía, es un secreto a voces en los medios estadounidenses que Elon Musk ya tiene atado a su nuevo fichaje, el cocinero encargado de diseñar la oferta culinaria de su próx… [+2498 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Biztoc.com"
      },
      "author": "businessinsider.com",
      "title": "BYD is piling on the pain for Tesla. These 5 charts break down how the rivals square up",
      "description": "Elon Musk is the CEO of Tesla.\nPatrick Pleul/POOL/AFP\nTesla and BYD are locked in a battle to become the world's largest EV company.\nBYD has piled the pain on its rival so far this year, with sales and revenue surging as Tesla stutters.\nBusiness Insider crunc…",
      "url": "https://biztoc.com/x/b323729544d98017",
      "urlToImage": "https://biztoc.com/cdn/b323729544d98017_s.webp",
      "publishedAt": "2025-04-01T09:16:07Z",
      "content": "Elon Musk is the CEO of Tesla.Patrick Pleul/POOL/AFPTesla and BYD are locked in a battle to become the world's largest EV company.BYD has piled the pain on its rival so far this year, with sales and … [+147 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Aftonbladet.se"
      },
      "author": null,
      "title": "Greta Thunberg bortförd av polis",
      "description": "Klimataktivisten Greta Thunberg har förts bort av polis efter att ha demonstrerat utanför SEB:s årsstämma…",
      "url": "https://www.aftonbladet.se/nyheter/a/Rr77qd/aftonbladet-direkt?pinnedEntry=1362872",
      "urlToImage": "https://images-shared.api.plan3.se/v2/images/75af182a40d6b98ee0d171f32459a49a6779e085?original=true&w=8256&s=fa50a28b9181f149dc83fc12d664d28f44b15800",
      "publishedAt": "2025-04-01T09:15:13Z",
      "content": "\u003Cul\u003E\u003Cli\u003EGreta Thunberg bortförd av polis\r\nGreta Thunberg bortförd av polis utanför SEB årsstämma på Konserthuset i Stockholm. Foto: Fredrik Sandberg/TT\r\nGreta Thunberg bortförd av polis\r\nKlimataktivi… [+10908 chars]"
    }
  ]
  const navigate = useNavigate();

  //fetching news api to fetch the blogs
  useEffect(() => {
    const fetchApi = async () => {
      let res = await fetch(
        `https://newsapi.org/v2/everything?q=tesla&from=2025-03-02&sortBy=publishedAt&apiKey=3b57ffb196bb4694968511d83395c9a1`,{
          method: "GET",
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0", 
            "Connection": "keep-alive" 
          },
          keepalive: true
        });
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

          {/*If there is no blogs data fetched */}
          {articles && articles.length === 0 ? (
            <h1 className="text-black">No Blogs</h1>
          ) : (
            // When there are blogs fetched so we map over them and return elements
            //here we can use articles && articles.map--- but because api is of base plan and does'nt works on hosted sites, i'll use demo data from api which i have stored in articleBlogs varibale
            articleBlogs && articleBlogs.map((item, idx) => (
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

                {/*handling the userclick on blog to show more content on it.*/}

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
                  {/*Managing likes on the page */}
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
