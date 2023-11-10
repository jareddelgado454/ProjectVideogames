import React, { useState } from 'react'

const ButtonGenre = ({id,name,setGenresSelected,genresSelected}) => {
    const [selected, useSelected] = useState(false);
    const handleClick = () => {
        if(!selected){
            useSelected(!selected);
            setGenresSelected([...genresSelected,id]);
        }else{
            useSelected(!selected);
            setGenresSelected(genresSelected.filter((genre) => genre != id));
        }
    }
    const buttonClass = selected ? 'buttonGenreSelected' : 'buttonGenre';
    return (
        <div className='divButtonGenre'>
            <label className={buttonClass} onClick={handleClick}>{name}</label>
        </div>
    )
}

export default ButtonGenre