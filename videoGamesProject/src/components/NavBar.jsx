import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
const NavBar = ({setLoading,loading}) => {
  return (
    <div className='divNavBar'>
        <SearchBar loading= {loading} setLoading={setLoading}/>
        <Link to='/createVideogame'>
          <button>Create Videogame</button>
        </Link>
        
    </div>
  )
}

export default NavBar