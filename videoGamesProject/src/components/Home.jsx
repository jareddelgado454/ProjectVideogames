import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Cards from './Cards';
import { chargeVideogames, deleteFilters, filterVideogamesByGenre, filterVideogamesByOrigin, orderVideogames } from '../redux/actions';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from './Loading';
import SearchBar from './SearchBar';
import url from '../../rutaConnection';

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
        const response = await axios.get(`${url}/chargeVideogames`);
        if(response.data){
            dispatch(chargeVideogames(response.data));
        }
        const {data} = await axios.get(`${url}/getgenres`);
        setGenres(data);
        setCharging(false);
      } catch (error) {
        throw(error.message);
      }
    }
    fetchData();
  },[]);
  const cardsRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };  

  const handleOrder = (event) => {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    setSelectedOrder(event.target.value);
    setCurrentPage(1);
    dispatch(orderVideogames(event.target.value));
  }
  
  const handleFilterGenre = (event) => {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
    dispatch(filterVideogamesByGenre(event.target.value));
  }

  const handleClean = () => {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    setSelectedOrigin(initialOrigin);
    setSelectedGenre(initialGenre);
    setSelectedOrder(initialOrder);
    setCurrentPage(1);
    dispatch(deleteFilters());
  }
  
  const handleFilterOrigin = (event) => {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    setSelectedOrigin(event.target.value);
    setCurrentPage(1);
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
                              <SearchBar loading={loading} setLoading={setLoading} setCurrentPage={setCurrentPage} cardsRef={cardsRef}/>
                              
                              <div className='titleSearchGroupContent'>
                                <div className='titleSearchGroupContentText'>
                                  <h3>Search a videogame in the List</h3>
                                  <p>Enter a name, or part of a name and we will find the matches</p>
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
                                    <option value='allOrigin'>All Origin</option>
                                    <option value='created'>Created</option>
                                    <option value='imported'>Imported</option>
                                </select>
                            </div>

                            <div className='divFilterByGenre'>
                                  <h3>Filter by Genre:</h3>
                                  <select className='selectFilterByGenre' onChange={handleFilterGenre}>
                                      <option value='allGenres'>All Genres</option>
                                      {
                                          genres?.map((genre) =>{
                                              return <option key={genre.id} value={genre.id}>{genre.name}</option>
                                          })
                                      }
                                  </select>
                            </div>
                            
                            <div className='divOrder'>
                                <h3>Order Videogames:</h3>
                                <select className='selectOrder' onChange={handleOrder}>
                                  <option value='NoOrder'>No order</option>
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
                  <Cards currentPage={currentPage} onPageChange={handlePageChange} cardsRef = {cardsRef} />
                </div>
                
              </>
            )
          }
    </div> 
  )
}

export default Home