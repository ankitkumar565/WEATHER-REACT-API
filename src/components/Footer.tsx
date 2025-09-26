import React from 'react'
import Waves from './Waves';

function Footer() {
  return (
      <>
        <Waves/>
        <div className="creditionals">
            <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 md:px-40 gap-2 text-center md:text-left">
            <span>
                Created by: <a href="https://github.com/ankitkumar565">Ankit Kumar</a>
            </span>
            <span>
                Data from: <a href="https://www.weatherapi.com">WeatherAPI.com</a>
            </span>
            </div>
        </div>
      </>
  )
}

export default Footer;