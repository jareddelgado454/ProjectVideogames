import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Cards from './Cards';
import { chargeVideogames, deleteFilters, filterVideogamesByGenre, filterVideogamesByOrigin, orderVideogames } from '../redux/actions';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from './Loading';
import SearchBar from './SearchBar';

const Home = () => {
  const [charging,setCharging] = useState(true);
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres,setGenres] = useState([]);
  const dispatch = useDispatch();

  const initialOrigin = 'allOrigin';
  const initialGenre = 'allGenres';
  const initialOrder = 'NoOrder';

  const [selectedOrigin, setSelectedOrigin] = useState(initialOrigin);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedOrder, setSelectedOrder] = useState(initialOrder);

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
    setSelectedOrder(event.target.value);
    dispatch(orderVideogames(event.target.value));
  }
  
  const handleFilterGenre = (event) => {
    setSelectedGenre(event.target.value);
    dispatch(filterVideogamesByGenre(event.target.value));
  }

  const handleClean = () => {
    setSelectedOrigin(initialOrigin);
    setSelectedGenre(initialGenre);
    setSelectedOrder(initialOrder);
    dispatch(deleteFilters());
  }
  
  const handleFilterOrigin = (event) => {
    setSelectedOrigin(event.target.value);
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
                <div className='divHomeContent'>
                  <div className='divTextMain'>
                    <h2>The best video games, you can also create your own!</h2>
                    <p>Here, you will find a list of the most representative video games of recent times, you can filter them by various categories, and also add your own video games</p>
                  </div>
                  <div className="filterSelect">
                    <div className="filterSelectContent">
                        <div className='leftSideInformation'>
                            <div className='leftSideInformationContent'>
                              <SearchBar loading={loading} setLoading={setLoading} />
                              
                              <div className='titleSearchGroupContent'>
                                <div className='titleSearchGroupContentText'>
                                  <h3>Search a videogame in the List</h3>
                                  <p>Filter by name, origin and genre, and sort the list of video games</p>
                                </div>
                              </div>
                            </div>
                            
                        </div>
                        <div className='rightSideFilters'>
                            <div className='titleFilterGroup'>
                              <div className='titleFilterGroupContent'>
                                <h3>Filter an order the list of videogames</h3>
                                <p>Filter by name, origin and genre, and sort the list of video games</p>
                              </div>
                            </div>
                            
                            <div className='divFilterByOrigin'>
                                <h3>Filter by Origin:</h3>
                                <select className='selectFilterByOrigin' onChange={handleFilterOrigin}>
                                    <option value={selectedOrigin}>All Origin</option>
                                    <option value='created'>Created</option>
                                    <option value='imported'>Imported</option>
                                </select>
                            </div>

                            <div className='divFilterByGenre'>
                                  <h3>Filter by Genre:</h3>
                                  <select className='selectFilterByGenre' onChange={handleFilterGenre}>
                                      <option value={selectedGenre}>All Genres</option>
                                      {
                                          genres.map((genre) =>{
                                              return <option key={genre.id} value={genre.id}>{genre.name}</option>
                                          })
                                      }
                                  </select>
                            </div>
                            
                            <div className='divOrder'>
                                <h3>Order Videogames:</h3>
                                <select className='selectOrder' onChange={handleOrder}>
                                  <option value={selectedOrder}>No order</option>
                                  <option value="AscendingName">Ascending Name</option>
                                  <option value="DescendingName">Descending Name</option>
                                  <option value="AscendingRating">Ascending Rating</option>
                                  <option value="DescendingRating">Descending Rating</option>
                                </select>
                            </div>              
                            
                            
                        </div>
                    </div>
                    <button className='cleanFiltersButton' onClick={handleClean}>Clean Filters</button>             
                  </div>
                  <Cards currentPage={currentPage} onPageChange={handlePageChange}/>
                </div>
                
              </>
            )
          }
    </div> 
  )
}

export default Home