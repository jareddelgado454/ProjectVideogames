import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Cards from './Cards';
import { chargeVideogames, deleteFilters, filterVideogamesByGenre, filterVideogamesByOrigin, orderVideogames } from '../redux/actions';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from './Loading';

const Home = () => {
  const [charging,setCharging] = useState(true);
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres,setGenres] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const {data} = await axios.get('http://localhost:3001/videogames');
        dispatch(chargeVideogames(data));
        const response = await axios.get('http://localhost:3001/getgenres');
        setGenres(response.data);
        setCharging(false);
      } catch (error) {
        throw(error.message);
      }
    }
    fetchData();
  },[]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };  

  const handleOrder = (event) => {
    dispatch(orderVideogames(event.target.value));
  }
  
  const handleFilterGenre = (event) => {
    dispatch(filterVideogamesByGenre(event.target.value));
  }

  const handleClean = () => {
    dispatch(deleteFilters());
  }
  
  const handleFilterOrigin = (event) => {
    dispatch(filterVideogamesByOrigin(event.target.value));
  }
  return (
    <div className='divHome'>
          {
            charging
            ?(<Loading/>)
            :(
              <>
                {loading && <Loading/>}
                <NavBar loading = {loading} setLoading={setLoading}/>
                <div className="filterSelect">
                    <h3>Filters</h3>

                    <select onChange={handleFilterOrigin}>
                        <option value='allOrigin'>All Origin</option>
                        <option value='created'>Created</option>
                        <option value='imported'>Imported</option>
                    </select>

                    <select onChange={handleFilterGenre}>
                        <option value='allGenres'>All Genres</option>
                        {
                            genres.map((genre) =>{
                                return <option key={genre.id} value={genre.id}>{genre.name}</option>
                            })
                        }
                    </select>

                    <select onChange={handleOrder}>
                      <option value="AscendingName">Ascending Name</option>
                      <option value="DescendingName">Descending Name</option>
                      <option value="AscendingRating">Ascending Rating</option>
                      <option value="DescendingRating">Descending Rating</option>
                    </select>
                    
                    <button onClick={handleClean}>Clean Filters</button>
                    
                </div>
                <Cards currentPage={currentPage} onPageChange={handlePageChange}/>
              </>
            )
          }
    </div> 
  )
}

export default Home