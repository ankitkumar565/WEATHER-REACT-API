import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

function Weather(props: any) {
    const [type, setType] = useLocalStorage("type", "f");
    
    if (!props.data || !props.data.location || !props.data.current || !props.data.forecast) {
        return <div>Loading...</div>;
    }
    
    const location = props.data.location;
    const current = props.data.current;
    const forecast = props.data.forecast.forecastday;
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    } as const;
    const date = new Date().toLocaleDateString("en-US", options)

    function parseDate(date: string){
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        } as const;

        return new Date(date).toLocaleDateString("en-US", options)
    }

    function isToday(date: string) {
        const today = new Date();
        const today_from_steing = new Date(Date.parse(date));
        return today_from_steing.getDate() === today.getDate()
    }

    function switchType(e: any) {
        setType(e.target.getAttribute('data-type'))
    }

    // id	                Weather Conditions
    // snow	                Amount of snow is greater than zero
    // rain	                Amount of rainfall is greater than zero
    // fog	                Visibility is low (lower than one kilometer or mile)
    // wind	                Wind speed is high (greater than 30 kph or mph)
    // cloudy	            Cloud cover is greater than 90% cover
    // partly-cloudy-day	Cloud cover is greater than 20% cover during day time.
    // partly-cloudy-night	Cloud cover is greater than 20% cover during night time.
    // clear-day	        Cloud cover is less than 20% cover during day time
    // clear-night          Cloud cover is less than 20% cover during night time

    function getIcon(state: string, size:number){
        switch(state.toLowerCase()){
            case 'snow':
                return <img className={`mx-auto w-40`} src="/animated/snowy-1.svg" alt="snow"></img>
            case 'rain':
                return <img className={`mx-auto w-40`} src="/animated/rainy-1.svg" alt="rain"></img>
            case 'fog':
                return <img className={`mx-auto w-40`} src="/animated/cloudy.svg" alt="fog"></img>
            case 'wind':
                return <img className={`mx-auto w-40`} src="/animated/weather.svg" alt="wind"></img>
            case 'cloudy':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-day-1.svg" alt="cloud"></img>
            case 'partly-cloudy-day':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-day-1.svg" alt="partly-cloudy-day"></img>
            case 'partly-cloudy-night':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-night-1.svg" alt="partly-cloudy-night"></img>
            case 'clear-day':
                return <img className={`mx-auto w-40`} src="/animated/day.svg" alt="clear-day"></img>
            case 'clear-night':
                return <img className={`mx-auto w-40`} src="/animated/night.svg" alt="clear-night"></img>
        }
    }

    return (
        <div className="weather-geolocation items-center">
            <div className="weather-data text-center mx-auto">
                <div className="weather-country text-center">
                    {getIcon(current.condition.text, 50)}
                    {location.name}, {location.country}
                    <p className="text-base mt-2 text-slate-400">{date}</p>
                </div>
                <div className="weather-database mx-auto mt-10 rounded-md text-gray-300 text-xl text-center px-5">
                    <div className="justify-between sm:container sm:mx-auto">
                        <div className="general flex justify-between mb-5">
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />  <line x1="10" y1="9" x2="14" y2="9" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Temp</h1>
                                    <p className="text-slate-400 text-base">
                                        { type === "c" ? current.temp_c : current.temp_f }°
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />  <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />  <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Wind</h1>
                                    <p className="text-slate-400 text-sm">
                                        {current.wind_kph}km/h
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M12 3l5 5a7 7 0 1 1 -10 0l5 -5" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Humidity</h1>
                                    <p className="text-slate-400 text-base">
                                        {current.humidity}%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="more flex justify-between">
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5h10l2 2l-2 2h-10a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />  <path d="M13 13h-7l-2 2l2 2h7a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1" />  <line x1="12" y1="22" x2="12" y2="17" />  <line x1="12" y1="13" x2="12" y2="9" />  <line x1="12" y1="5" x2="12" y2="3" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Wind direction</h1>
                                    <p className="text-slate-400 text-base">
                                        {current.wind_dir}
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Cloud Cover</h1>
                                    <p className="text-slate-400 text-base">
                                        {current.cloud}%
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />  <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Precipitation</h1>
                                    <p className="text-slate-400 text-base">
                                        {forecast[0].day.daily_chance_of_rain}%
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />  <rect x="9" y="3" width="6" height="4" rx="2" />  <path d="M9 14l2 2l4 -4" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Condition</h1>
                                    <p className="text-slate-400 text-base">
                                        {current.condition.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="weather-status mt-10 overflow-x-auto rounded-2xl" id="forecast-container" style={{scrollBehavior: 'smooth'}} onWheel={(e) => {e.preventDefault(); e.currentTarget.scrollLeft += e.deltaY;}}>
                <div className="flex gap-4 pb-4" style={{minWidth: 'max-content'}}>
                    {   
                        forecast.map((witem: any) => {
                            return (
                                <div className="weather-temperatures mt-0 bg-white p-6 rounded-2xl z-10 flex-shrink-0" style={{minWidth: '280px'}} key={witem.date}>
                                    <p className="text-xl mt-0 text-gray-600">
                                        {
                                            isToday(witem.date) ? "Today" : parseDate(witem.date)
                                        }
                                    </p>
                                    <div className="flex justify-between">
                                        <div className="weather-statement m-auto w-1/3">
                                            {getIcon(witem.day.condition.text, 50)}
                                        </div>
                                        <div className="temp text-center m-auto w-2/3">
                                            <h1 className="weather-temp temp-num m-auto align-baseline mt-5 text-gray-600 text-center">
                                                { type === "c" ? witem.day.avgtemp_c : witem.day.avgtemp_f }
                                            </h1>
                                            <p className="text-sm text-gray-400 mt-5 text-bold">
                                                min: { type === "c" ? witem.day.mintemp_c : witem.day.mintemp_f } / max: { type === "c" ? witem.day.maxtemp_c : witem.day.maxtemp_f}
                                            </p>
                                        </div>
                                        <div className="temp-switcher text-gray-600">
                                            <h1 data-toggle className={`weather-temp m-4 ${type === "c" ? "active" : "notactive" } `} data-type="c" onClick={switchType}>°C</h1>
                                            <h1 data-toggle className={`weather-temp m-4 ${type === "f" ? "active" : "notactive" } `} data-type="f" onClick={switchType}>°F</h1>
                                        </div>
                                    </div>
                                    <div className="weather-database mx-auto mt-0 p-5 rounded-md text-gray-300 text-xl">
                                        <div className="flex justify-between">
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Temp</h1>
                                                <p className="text-slate-400 text-base">
                                                    { type === "c" ? witem.day.avgtemp_c : witem.day.avgtemp_f }°
                                                </p>
                                            </div>
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Wind</h1>
                                                <p className="text-slate-400 text-base">
                                                    {witem.day.maxwind_kph}km/h
                                                </p>
                                            </div>
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Humidity</h1>
                                                <p className="text-slate-400 text-base">
                                                    {witem.day.avghumidity}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather;