import React from 'react';
import { useState } from 'react';

import Clouds from '../images/Clouds.png';
import Rain from '../images/Rain.png';
import Clear from '../images/Clear.png';
import mist from '../images/mist.png';
import err from '../images/error.png';

const Myapp = () =>{

    const[Search, setSearch] = useState("");
    const[Data, setData] = useState();
    const[Error, setError]= useState();

    const API_KEY = "6d4f63be0c704540a69e3df5e2d31f11"
    


    const handleInput = (event) => {
        setSearch(event.target.value)
        
    };

    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Search}&appid=${API_KEY}&units=metric`)
        const jsonData = await get.json()
        
        setData(jsonData);
        
        if (Search === ""){
            setError('Please Enter Name !')
        }

        else if (jsonData == '404'){
            setError('Please Enter Valid Name !')
        }else{
            setError("")
        }

        setSearch("")
    }

    return(

        <>
        
            <div className="container">
                <div className="inputs">
                    <input placeholder="Enter City, Coutry" value={Search} onChange={handleInput}/>
                    <button onClick={myFun}>Search</button>
                </div>
                <div>
                    {
                        Error?
                        <div className='errorPage'>
                            <p>{Error}</p>
                            <img src={err} />
                        </div> : ""
                    }
                    {   
                        
                            Data && Data.weather?
                            <div className="weathers">
                                <div><p className='cityName'>{Data.name}</p></div>
                                    <div>
                                        <img src={Data.weather[0].main == "Clouds" ? Clouds:" "}></img>
                                        <img src={Data.weather[0].main == "Rain" ? Rain:" "}></img>
                                        <img src={Data.weather[0].main == "Clear" ? Clear:" "}></img>
                                        <img src={Data.weather[0].main == "Mist" ? mist:" "}></img>
                                        <img src={Data.weather[0].main == "Haze" ? Clouds:" "}></img>
                                    </div>
                                    <div className='temp-bottom'>
                                        <p className='temperature'>{Math.trunc(Data.main.temp)}°C</p>
                                        <p className='climate'>{Data.weather[0].description}</p>
                                    </div>
                                
                            </div>:""
                        
                    }

                </div>

            </div>
        
        </>
    )
}

export default Myapp;