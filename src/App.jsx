import React,{useState,useEffect} from 'react'
import axios from 'axios'
import sunrise from './image/sunrise.png'
import sunset from './image/sunset.png'
import thermometer from './image/thermometer.png'
import windy from './image/windy.png'
import humidity from './image/humidity.png'
import barometer from './image/barometer.png'
import search from './image/search.png'

export default function App() {
  const[city,setcity]=useState("")
  const[data,setdata]=useState(null)
  const [bgImage,setbgImage]=useState(true)
  var sunriseTime=" ";
  var sunsetTime =" ";
 var formatted=" ";


if (data && data.sys && data.timezone !== undefined) {
  const sunriseUTC = new Date((data.sys.sunrise + data.timezone) * 1000);
  const sunsetUTC = new Date((data.sys.sunset + data.timezone) * 1000);

  sunriseTime = sunriseUTC.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  sunsetTime = sunsetUTC.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
   formatted =sunriseUTC.toLocaleDateString('en-US',{
    month:'long',
    day:'numeric',
    year:'numeric',
    timeZone:'UTC'
  }
)
}


 
  const getdata =()=>{
axios.get('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=2ae0693185f5b9e0d453aa40b1bb8f54&units=metric').then((response)=>{
  
  if(response.data.weather[0].icon=="01d" || response.data.weather[0].icon=="02d" || response.data.weather[0].icon=="03d" || response.data.weather[0].icon=="04d" || response.data.weather[0].icon=="09d" || response.data.weather[0].icon=="10d" || response.data.weather[0].icon=="11d" || response.data.weather[0].icon=="13d" || response.data.weather[0].icon=="50d"){
    setbgImage(true)
  }else{
    setbgImage(false)
  }
  setdata(response.data)

})
}
useEffect(()=>{
  getdata()
 
},[])
const handleSearch=()=>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ae0693185f5b9e0d453aa40b1bb8f54&units=metric`).then((response)=>{
    setdata(response.data)
    if(response.data.weather[0].icon=="01d" || response.data.weather[0].icon=="02d" || response.data.weather[0].icon=="03d" || response.data.weather[0].icon=="04d" || response.data.weather[0].icon=="09d" || response.data.weather[0].icon=="10d" || response.data.weather[0].icon=="11d" || response.data.weather[0].icon=="13d" || response.data.weather[0].icon=="50d"){
      setbgImage(true)
    }else{
      setbgImage(false)
    }
  })
}
  return (
    <div className=''>
    <div className={`${bgImage?"bg-[url('src/image/day.jpg')]":"bg-[url('src/image/night.jpg')]"} bg-cover bg-center md:h-[100vh] h-[400px] relative`}>
    <div className="flex justify-center relative"> <input type="search" placeholder='Enter City Name' onChange={(e)=>{setcity(e.target.value)}} className="bg-slate-50 focus:outline-none pl-3 text-sm mt-5 rounded-2xl md:w-[400px] w-[300px] p-2"/><img src={search} onClick={handleSearch} className='w-5 h-5 -translate-x-8 translate-y-7'/></div>
   <div className="flex justify-center"> <div className="flex flex-col text-center md:mt-16 m-10"><h1 className={`md:text-4xl text-2xl font-semibold ${bgImage?"text-gray-900":"text-white"} `}>{data && data.name}</h1><h2 className={`font-semibold ${bgImage?"text-gray-600":"text-white"}  md:text-[16px] text-xs`}>{formatted}</h2></div></div>
<div className=" absolute bottom-0 md:mb-56 md:ml-72 ml-12 mb-12  text-center">
    <h1 className='md:text-6xl text-4xl font-semibold text-white ' >{data && data.main.temp}<sup>o </sup></h1>
    <h2 className='text-white md:text-lg text-md'>{data && data.main.temp_min}<sup>o</sup> ~ {data && data.main.temp_max}<sup>o</sup></h2>
    </div>
    <div className="absolute bottom-0 right-0 md:mb-56 md:mr-72 mr-12 mb-12 text-center">
    <h1 className='text-white font-semibold md:text-2xl text-md'>{data && data.weather[0].main}</h1>
     <h1 className='text-white font-semibold md:text-xl text-sm'>{data && data.weather[0].description}</h1>
    </div>
    </div>
    {/**after image */}

    <div className="m-15">
   
      <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        {/**one item -feels like */}
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-2">
          <div className="flex items-center">
            <div className=""><img src={thermometer} className='w-6'/></div>
            <div className="flex flex-col ml-2">
              <h1 className='text-violet-950 font-semibold text-sm '>Feels Like </h1>
              <h2 className='text-xs text-violet-950'>{data && data.main.feels_like} <sup>o</sup> c</h2>
           
            </div>
          </div>
        </div>
      {/**end */}
        {/**one item- humidity */}
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-2">
          <div className="flex items-center">
            <div className=""><img src={humidity} className='w-6'/></div>
            <div className="flex flex-col ml-2">
              <h1 className='text-violet-950 font-semibold text-sm '>Humidity</h1>
              <h2 className='text-xs text-violet-950'>{data && data.main.humidity} %</h2>
            </div>
          </div>
        </div>
      {/**end */}
       {/**one item- pressure */}
       <div className="bg-violet-50 border border-violet-200 rounded-sm p-2">
          <div className="flex items-center">
            <div className=""><img src={barometer} className='w-6'/></div>
            <div className="flex flex-col ml-2">
              <h1 className='text-violet-950 font-semibold text-sm '>Pressure</h1>
              <h2 className='text-xs text-violet-950'>{data && data.main.pressure} hPa</h2>
            </div>
          </div>
        </div>
      {/**end */}
       {/**one item- wind speed */}
       <div className="bg-violet-50 border border-violet-200 rounded-sm p-2">
          <div className="flex items-center">
            <div className=""><img src={windy} className='w-6'/></div>
            <div className="flex flex-col ml-2">
              <h1 className='text-violet-950 font-semibold text-sm '>Wind Speed</h1>
              <h2 className='text-xs text-violet-950'>{data && data.wind.speed} m/s</h2>
            </div>
          </div>
        </div>
      {/**end */}
      </div>
     
    </div>
    <div className="flex justify-center">
    <div className="border-t-2 border-x-2 border-orange-300 relative h-[150px] w-[300px] md:w-[600px] rounded-t-full m-5">
       <div className="absolute -bottom-6 left-0 -translate-x-4">
        <img src={sunrise} className='w-8'/>
      <h1 className='-translate-x-2 text-sm'>{sunriseTime} </h1>
        </div>
       <div className="absolute -bottom-6 right-0 translate-x-10" >
       <img src={sunset} className='w-8'/>
       <h1 className='-translate-x-2 text-sm'>{sunsetTime} </h1>
       </div>
      </div>
      </div>
    </div>
  )
}
