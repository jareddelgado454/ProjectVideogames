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
                e.target.reset();
                setVideoData({
                    name: '',
                    description: '',
                    platforms: '',
                    released: '',
                    background_image: '',
                    rating: '',
                    genres: [],
                });
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
                <div className='divCreateVideogameContent'>
                    <div className='formInstructionMain'>
                        <h3>Creating a new VideoGame</h3>
                        <p>Complete all the fields correctly with the right information, and enjoy the app</p>
                    </div>
                    <form onSubmit={handleSubmit} className='formCreateVideogame'>
                        <div className='containerInput'>
                            <input id='name' name='name' className={ errors.name && videoData.name != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='text' onChange={handleChange} required/>
                            <label htmlFor='name' className={errors.name && videoData.name != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter videogame name</label>
                            <p className="errorMessage">
                                {
                                    videoData.name !==''  && errors.name
                                    ?errors.name
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='containerInput'>
                            <input id='image' name='background_image' className={ errors.background_image && videoData.background_image != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='text' onChange={handleChange} required/>
                            <label htmlFor='image' className={errors.background_image && videoData.background_image != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter URL image</label>
                            <p className="errorMessage">
                                {
                                    errors.background_image  && videoData.background_image !==''
                                    ?errors.background_image
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='containerInput'>
                            <textarea id='description' name='description' className={ errors.description && videoData.description != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='text' onChange={handleChange} rows="6" required/>
                            <label htmlFor='description' className={errors.description && videoData.description != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter description</label>
                            <p className="errorMessage">
                                {
                                    errors.description  && videoData.description !==''
                                    ?errors.description
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='containerInput'>
                            <input id='platforms' name='platforms' className={ errors.platforms && videoData.platforms != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='text' onChange={handleChange} required/>
                            <label htmlFor='platforms' className={errors.platforms && videoData.platforms != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter platform</label>
                            <p className="errorMessage">
                                {
                                    errors.platforms  && videoData.platforms !==''
                                    ?errors.platforms
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='containerInput'>
                            <input id='released' name='released' className={ errors.released && videoData.released != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='date' onChange={handleChange} required/>
                            <label htmlFor='released' id='labelReleased' className={errors.released && videoData.released != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter released date</label>
                            <p className="errorMessage">
                                {
                                    errors.released  && videoData.released !==''
                                    ?errors.released
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='containerInput'>
                            <input id='rating' name='rating' className={ errors.rating && videoData.rating != '' ?'inputCreateVideogameError':'inputCreateVideogame'} type='number' step="0.1" onChange={handleChange} required/>
                            <label htmlFor='rating'  className={errors.rating && videoData.rating != '' ?'labelCreateVideogameError':'labelCreateVideogame'}>Enter rating</label>
                            <p className="errorMessage">
                                {
                                    errors.rating  && videoData.rating !==''
                                    ?errors.rating
                                    :<span className="messageHide">A</span>
                                }
                            </p>
                        </div>
                        <div className='instructionsGenres'>
                            <p>You must at least assign a genre to the video game</p>
                        </div>
                        <div className='buttonsGenreContainer'>
                            {
                                genres.map((genre)=>{
                                    return <ButtonGenre key={genre.id} id={genre.id} name={genre.name} setGenresSelected={setGenresSelected} genresSelected={genresSelected}/>
                                })
                            }
                        </div>

                        <button id='buttonCreateVideogameForm' className='buttonCreateVideogame' 
                            type='submit' 
                            disabled={((errors.name && videoData.name != '') ||
                                        (errors.background_image && videoData.background_image!='') ||
                                        (errors.description && videoData.description!='') ||
                                        (errors.platforms && videoData.platforms != '') ||
                                        (errors.released && videoData.released != '') ||
                                        (errors.rating && videoData.rating != '')  ||
                                        (genresSelected.length == 0))||
                                        (Object.values(videoData).some(value => value == ''))
                            }
                        >Create Videogame</button>
                        <div className='divMessageResponseCreate'>
                            <p className="messageResponse">{message}</p>    
                        </div>      
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default CreateVideogame