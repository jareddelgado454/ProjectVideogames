import React from 'react';
import Card from './Card';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

const Cards = ({currentPage,onPageChange}) => {
  
  const videogamesFromRedux = useSelector((state) => state.filteredVideogames);
  const videoGamesPerPage = 15;
  const indexOfLastVideoGame = currentPage * videoGamesPerPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage;
  const videoGamesToDisplay = videogamesFromRedux.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  
  return (
    <div className='divCards'>
        <Pagination
              videoGamesPerPage={videoGamesPerPage}
              totalVideoGames={videogamesFromRedux.length}
              currentPage={currentPage}
              onPageChange={onPageChange}
              sup={true}
        />
        <div className='divCardsContainer'>
          {
            videoGamesToDisplay?.map((videogame)=>{
              return <Card key={videogame.id} id={videogame.id} image={videogame.background_image} name={videogame.name} genres={videogame.genres} created={videogame.created}/>
            })
          }
        </div>

        <Pagination
          videoGamesPerPage={videoGamesPerPage}
          totalVideoGames={videogamesFromRedux.length}
          currentPage={currentPage}
          onPageChange={onPageChange}
          sup = {false}
        />

    </div>
  )
}

export default Cards