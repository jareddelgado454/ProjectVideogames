require('dotenv').config();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { getGames } = require('./utils/getGames');
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (req,res) => {

    const {name} = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Missing parameter: name', code: 'BAD_REQUEST' });
    }
    try {
        const [mappedVideoGames,addedVideogames] = await Promise.all([
            getGames( URL),
            Videogame.findAll({include:Genre})
        ]);

        const allVideoGames = [...addedVideogames,...mappedVideoGames];
        
        const filteredVideoGames = allVideoGames.filter((videogame) => {
            return videogame.name.toLowerCase().includes(name.toLowerCase());
        });

        if(filteredVideoGames.length == 0){
            return res.status(200).json([]);
        }

        return res.status(200).json(filteredVideoGames.slice(0,15));
        
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', code: 'SERVER_ERROR' });
    }
}
module.exports = {
    getVideogames
}
