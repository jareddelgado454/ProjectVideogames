import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({image,name,genres,created,id}) => {
  return (
    
      <div className='divCard'>
          
            <span className='customGamesTag' data-text={created ? 'Custom' : 'Licensed'}></span>
            <Link to={`/detail/${id}`} className='linkCardUnique'>
              <div className='divImageCard'>
                  <img className='imageCard' src={image} />
              </div>
              <div className='divContentCardBottom'>
                <h2 className='titleVideogameCard' >{name}</h2>
                <div className='genresCard'>
                  {
                    genres.map((genre) => {
                      return <label key={genre.id} className='genreLabel'>{genre.name}</label>
                    })
                  }
                </div>
              </div>
            </Link>
          
      </div>
      
    
  )
}

export default Card