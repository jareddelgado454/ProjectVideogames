import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const Detail = () => {
    const [videogame,setVideogame] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async()=>{
            setLoading(true);
            try {
                const {data} = await axios.get(`http://localhost:3001/videogames/${id}`);
                if(data.name){
                    setVideogame(data);
                }
            } catch (error) {
                window.alert('No hay personajes con ese ID');
            } finally{
                setLoading(false);
            }
        };
        fetchData();
        return setVideogame({});
    },[id]);
  return (
    <div className='divDetail'>
        {
            loading
            ? <Loading />
            : (
                <div className='divDetailContent'>
                    <div className='divDetailContentLeft'>
                        <div className='imageContent'>
                            <img src={videogame?.background_image} width='300px'/>   
                        </div>
                        
                        <div className='divDetailContentLeftExtra'>          
                            <label className='labeltagDetail'>Rating:</label>
                            <p>{videogame?.rating}</p>
                            <label className='labeltagDetail'>Released:</label>
                            <p>{videogame?.released}</p>
                            <label className='labeltagDetail'>Genres:</label>
                            <div className='genresCard tagsDetail'>
                            {
                                videogame?.genres?.map((genre) => {
                                    return <label key={genre.id} className='genreLabelDetail'>{genre.name}</label>
                                })
                            }
                            </div>
                            <label className='labeltagDetail'>Platforms:</label>
                            <div className='genresCard tagsDetail'>
                                {
                                    videogame?.created
                                    ? <label className='genreLabelDetail'>{videogame?.platforms}</label>
                                    : videogame?.platforms?.map((platform) => {
                                        return <label key={platform.platform.id} className='genreLabelDetail'>{platform.platform.name}</label>
                                    })
                                }
                            </div>
                        
                        </div>
                    </div>
                    <div className='divDetailContentRight'>
                        <h2 className='nameVideogameDetail'>{videogame?.name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: videogame?.description }} className='descriptionDetail'/>
                    </div>
                </div>
            )
        }
        
    </div>
  )
}

export default Detail