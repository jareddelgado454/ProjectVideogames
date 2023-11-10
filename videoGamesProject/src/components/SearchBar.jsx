import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getVideogames } from '../redux/actions';

const SearchBar = ({loading,setLoading}) => {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const handleClick = () => {
        setLoading(true);
        dispatch(getVideogames(name)).then(() => {
          setLoading(false);
          setName(''); 
        });
    }
  return (
    <div className='divSearchBar'>
        <div className='containerInputSearch'>
            <input id='nameVideogame' name='nameVideogame' type='text' className='inputSearchVideogame'  onChange={handleChange} value={name} required/>
            <label htmlFor='nameVideogame' className='labelSearchInput'>Search Videogames</label>
        </div>
        
        <button className='searchVideogameButton' onClick={handleClick}>Search</button>
    </div>
  )
}

export default SearchBar