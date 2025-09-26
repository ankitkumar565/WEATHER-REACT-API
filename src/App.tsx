import React, { useState } from "react";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import useLocalStorage from "./hooks/useLocalStorage";

// styles
import './styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
    const [location, setLocation] = useLocalStorage("location", "");
    // eslint-disable-next-line
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState('');
    // eslint-disable-next-line
    const [stateLocation, setStateLocation] = useState({});
    const [geolocation, setGeolocation] = useState('');
    const [search_query, setSearchQuery] = useState('');
    const [isListening, setIsListening] = useState(false);

    const showError = (error: GeolocationPositionError) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setActive(true);
          setError(true);
          setErrorMessage('PERMISSION_DENIED');
        break;
        case error.POSITION_UNAVAILABLE:
          setActive(true);
          setError(true);
          setErrorMessage('POSITION_UNAVAILABLE');
        break;
        case error.TIMEOUT:
          setActive(true);
          setError(true);
          setErrorMessage('TIMEOUT');
        break;
      }
    }

    const startVoiceSearch = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsListening(true);
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          search(transcript);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        alert('Voice search not supported in this browser');
      }
    };

    const search = (query: string) => {
      console.log('Searching for:', query);
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=no&alerts=no`;
      console.log('API URL:', url);
      
      fetch(url)
        .then(res => {
          console.log('Response status:', res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(json_ => {
          console.log('API Response:', json_);
          if (json_.error) {
            console.error('API Error:', json_.error);
            setActive(true);
            setError(true);
          } else {
            setError(false);
            setActive(true);
            setData(json_);
          }
        })
        .catch((err) => {
          console.error('Search error:', err);
          setActive(true);
          setError(true);
      });
    }
  
    const showPosition = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coords = `${latitude},${longitude}`;
      
      setGeolocation(coords);
      if (!active) {
        search(coords);
      }
    }

    React.useEffect(() => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = `${position.coords.latitude},${position.coords.longitude}`;
            setGeolocation(coords);
            search(coords);
          },
          () => {
            setActive(true);
            setError(true);
          }
        );
      }
    }, []);

  return (
    <div className="App">
        <section className="weather py-8">
          <div className="sm:container sm:mx-auto px-10">
            <div className="px-20">
              <div className="header px-5">
                <div className="flex justify-between align-baseline">
                  <div className="app-logo align-baseline text-white my-auto">
                    <b className="align-baseline my-auto text-xl">Weather App</b>
                  </div>
                  <div className="app-search w-1/3">
                    <form className="flex items-center" onSubmit={(e) => {e.preventDefault(); if(search_query) search(search_query);}}>   
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your city" required value={search_query} onChange={(e) => {setSearchQuery(e.target.value)}} />
                            <button type="button" onClick={startVoiceSearch} className={`flex absolute inset-y-0 right-0 items-center pr-3 ${isListening ? 'text-red-500' : ''}`}>
                                <svg className={`w-4 h-4 ${isListening ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              <main className="weather-container">
                {
                  error ? 
                    <h1>Error</h1> 
                  : 
                    <div className="weather-data">
                      <h1 className="text-2xl text-center text-white py-20 font-bold">
                        { Object.keys(data).length > 0 ? <Weather data={data}/> : <Loading/>}
                      </h1>
                    </div>
                }

              </main>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
  );
}

export default App;