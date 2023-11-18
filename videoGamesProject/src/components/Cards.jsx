import React from 'react';
import Card from './Card';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

const Cards = ({currentPage,onPageChange, cardsRef}) => {
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const videoGamesPerPage = 15;
  const indexOfLastVideoGame = currentPage * videoGamesPerPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage;
  const videoGamesToDisplay = filteredVideogames.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  
  return (
    <div className='divCards' ref={cardsRef}> 
                <Pagination
                  videoGamesPerPage={videoGamesPerPage}
                  totalVideoGames={filteredVideogames?.length}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  sup={true}
                />
                <div className='divCardsContainer'>
                  {
                    videoGamesToDisplay.length != 0
                    ? videoGamesToDisplay?.map((videogame)=>{
                      return <Card key={videogame.id} id={videogame.id} image={videogame.background_image} name={videogame.name} genres={videogame.genres} created={videogame.created}/>
                    })
                    : <p className='messageWithoutVideogames'>There are not Videogames that match that name</p>
                  }
                </div>

                <Pagination
                  videoGamesPerPage={videoGamesPerPage}
                  totalVideoGames={filteredVideogames?.length}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  sup = {false}
                />
    </div>
  )
}

export default Cards