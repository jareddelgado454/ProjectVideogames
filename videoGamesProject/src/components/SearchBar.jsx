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
        });
    }
  return (
    <div className='divSearchBar'>
        <input type='text' onChange={handleChange} value={name}/>
        <button onClick={handleClick}>Search Videogames</button>
    </div>
  )
}

export default SearchBar