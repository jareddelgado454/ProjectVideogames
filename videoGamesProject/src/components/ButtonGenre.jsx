import React, { useState, useEffect } from 'react'

const ButtonGenre = ({id,name,setGenresSelected,genresSelected}) => {
    useEffect(()=>{
        if(genresSelected.length < 1 ){
            setSelected(false);
        }
    },[genresSelected]);
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        if(!selected){
            setSelected(!selected);
            setGenresSelected([...genresSelected,id]);
        }else{
            setSelected(!selected);
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