const axios = require('axios');
const { Videogame, Genre } = require('../db');
const URL = 'https://api.rawg.io/api/games'
const {API_KEY} = process.env;

const getVideogame = async (req, res) => {
    
    const {ID} = req.params;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    try {
        if(uuidRegex.test(ID)){
            const dataBaseVideogame = await Videogame.findByPk(ID,{include:Genre});
            if(!dataBaseVideogame){
                return res.status(400).json({error : 'videoGame not found'});
            }
            return res.status(200).json(dataBaseVideogame);
        }else {
            try {
                const response = await axios.get(`${URL}/${ID}?key=${API_KEY}`);

                if (response.status === 404) {
                    return res.status(404).json({ error: 'VideoGame not found' });
                }

                const { id, name, background_image, platforms, description, released, rating, genres } = response.data;

                const responseData = {
                    id,
                    name,
                    background_image,
                    platforms,
                    description,
                    released,
                    rating,
                    genres
                };
                return res.status(200).json(responseData);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getVideogame
}