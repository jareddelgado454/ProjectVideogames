import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({image,name,genres,created,id}) => {
  return (
    <div className='divCard'>
      <Link to={`/detail/${id}`}>
        <span className='customGamesTag' data-text={created ? 'Custom' : 'Licensed'}></span>
        <img src={image} width='200px'/>
        <h2>{name}</h2>
      </Link>
    </div>
  )
}

export default Card