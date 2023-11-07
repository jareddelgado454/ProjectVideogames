import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Detail = () => {
    const [videogame,setVideogame] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async()=>{
            try {
                const {data} = await axios.get(`http://localhost:3001/videogames/${id}`);
                if(data.name){
                    setVideogame(data);
                }
            } catch (error) {
                window.alert('No hay personajes con ese ID');
            }
        };
        fetchData();
        return setVideogame({});
    },[id]);
  return (
    <div className='divDetail'>
        <h2>{videogame?.name}</h2>
        <img src={videogame?.background_image} width='300px'/>
        <p>{videogame?.rating}</p>
        <p>{videogame?.released}</p>
    </div>
  )
}

export default Detail