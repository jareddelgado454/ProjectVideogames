import React from 'react'
import { Link } from 'react-router-dom'

const Landingpage = () => {
  return (
    <div className='divLandingPage'>
        <div className='videoLandingPage'>
          <video
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position:'absolute',
              zIndex:-1,
              maskImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
            }}>
            <source src="/background.mp4" type="video/mp4"/>
          </video>
          <div className="overlayContent">
            <h1 className='neonText'>The Videogames</h1>
            <Link to='/home'>
              <button className='startButton'>Start Here</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Landingpage