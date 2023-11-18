import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cleanErrors, getVideogames } from '../redux/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = ({setLoading, setCurrentPage, cardsRef}) => {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const handleClick = () => {
        cardsRef.current.scrollIntoView({ behavior: 'smooth' });
        if(name == ''){
            toast.error('You did not enter any name to search', {
              className:'toastError',
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
              hideProgressBar: true,
            });
        }else{
          setLoading(true);
          dispatch(getVideogames(name)).then((data) => {
            setLoading(false);
            setName('');
            setCurrentPage(1);
            if (data && data.length === 0) {
              toast.error('There are not Videogames that match that name', {
                className:'toastError',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
              });
            }else{
              toast.success('Video games were found that match that name', {
                className:'toastSuccess',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
              });
            }
          }).catch((error)=>{
            setLoading(false);
            console.error(error);
          });
        }
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