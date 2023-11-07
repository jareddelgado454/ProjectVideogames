import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import Loading from './Loading';
import ButtonGenre from './ButtonGenre';
import validation from './validation';

const CreateVideogame = () => {
    const dispatch = useDispatch();
    const [genres,setGenres] = useState([]);
    const [genresSelected,setGenresSelected] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errors,setErrors] = useState({});
    const [message,setMessage] = useState('');
    const [videoData,setVideoData] = useState({
        name : '',
        description : '',
        platforms : '',
        released : '',
        background_image : '',
        rating : 0,
        genres : []
    });
    useEffect(()=>{
        const fetchGenres = async() => {
            const {data} = await axios.get('http://localhost:3001/getgenres');
            setGenres(data);
            setLoading(false);
        };
        fetchGenres();
    },[]);

    useEffect(()=>{
        if(videoData.name != '' || videoData.description != '' || videoData.platforms !='' || videoData.released != '' || videoData.background_image != '' || videoData.rating != 0){
            setErrors({...validation(videoData)});
        }
    },[videoData]);

    useEffect(()=>{
        videoData.genres = [...genresSelected];
    },[genresSelected])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/videogames',videoData);
            if (response.status === 201) {
                setMessage('The video game was created successfully');
            } else if (response.status === 409) {
                setMessage('The video game already exists');
            } else {
                setMessage('Unknown error: ' + response.status);
            }
        } catch (error) {
            setMessage('Error when creating the video game');
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type == 'number' ? parseFloat(value) : value; 

        setVideoData({
            ...videoData,
            [name]: newValue,
        });
    }
    
  return (
    <div className='divCreateVideogame'>
        {
            loading
            ? <Loading/>
            : (
                <form onSubmit={handleSubmit} className='formCreateVideogame'>
                    <div className='containerInput'>
                        <input id='name' name='name' className='inputCreateVideogame' type='text' onChange={handleChange} required/>
                        <label htmlFor='name' className='labelCreateVideogame'>Enter videogame name</label>
                        <p className="errorMessage">
                            {
                                videoData.name !==''  && errors.name
                                ?errors.name
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>
                    <div className='containerInput'>
                        <input id='image' name='background_image' className='inputCreateVideogame' type='text' onChange={handleChange} required/>
                        <label htmlFor='image' className='labelCreateVideogame'>Enter URL image</label>
                        <p className="errorMessage">
                            {
                                errors.background_image  && videoData.background_image !==''
                                ?errors.background_image
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>
                    <div className='containerInput'>
                        <textarea id='description' name='description' className='inputCreateVideogame' type='text' onChange={handleChange} required/>
                        <label htmlFor='description' className='labelCreateVideogame'>Enter description</label>
                        <p className="errorMessage">
                            {
                                errors.description  && videoData.description !==''
                                ?errors.description
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>
                    <div className='containerInput'>
                        <input id='platforms' name='platforms' className='inputCreateVideogame' type='text' onChange={handleChange} required/>
                        <label htmlFor='platforms' className='labelCreateVideogame'>Enter platform</label>
                        <p className="errorMessage">
                            {
                                errors.platforms  && videoData.platforms !==''
                                ?errors.platforms
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>
                    <div className='containerInput'>
                        <input id='released' name='released' className='inputCreateVideogame' type='date' onChange={handleChange} required/>
                        <label htmlFor='released' id='labelReleased' className='labelCreateVideogame'>Enter released date</label>
                        <p className="errorMessage">
                            {
                                errors.released  && videoData.released !==''
                                ?errors.released
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>
                    <div className='containerInput'>
                        <input id='rating' name='rating' className='inputCreateVideogame' type='number' step="0.1" onChange={handleChange} required/>
                        <label htmlFor='rating'  className='labelCreateVideogame'>Enter rating</label>
                        <p className="errorMessage">
                            {
                                errors.rating  && videoData.rating !==''
                                ?errors.rating
                                :<span className="messageHide">A</span>
                            }
                        </p>
                    </div>

                    {
                        genres.map((genre)=>{
                            return <ButtonGenre key={genre.id} id={genre.id} name={genre.name} setGenresSelected={setGenresSelected} genresSelected={genresSelected}/>
                        })
                    }

                    <button type='submit' >Create Videogame</button>
                    <p className="message">{message}</p>
                </form>
            )
        }
    </div>
  )
}

export default CreateVideogame