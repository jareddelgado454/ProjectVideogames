import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='divNavBar'>
        <div className='divCreateVideogameButton'>
          <Link to='/home'>
            <button className='buttonNav'>Home</button>
          </Link>
          <button className='buttonNav'>Community</button>
          <button className='buttonNav'>About</button>
          <button className='buttonNav'>Support</button>
          <Link to='/createVideogame'>
            <button className='createVideogameButton'>Create Videogame</button>
          </Link>
        </div>
        
    </div>
  )
}

export default NavBar