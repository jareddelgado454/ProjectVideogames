
import React, { useState } from 'react'
import {  Link} from 'react-router-dom'

const Landingpage = () => {
  
  return (
    <div className='divLandingPage'>
          <div className="overlayContent">
            <div className='titleLanding'>
              <h1 className='neonText'>The J'games</h1>
            </div>
            
            <div className='divContentLanding'>
              <p>Welcome to the ultimate platform for gaming enthusiasts! Our application is designed to take you on a unique journey into the fascinating universe of video games. Are you ready to dive into the thrilling gaming world? Here's a glimpse of what we offer!</p>
              <Link to='/home'>
                  <button className='startButton' >Start Here</button>
              </Link>
            </div>
            
          </div>
    </div>
  )
}

export default Landingpage