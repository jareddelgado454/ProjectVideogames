require('dotenv').config();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { getGames } = require('./utils/getGames');
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const chargeVideogames = async (req, res) => {
    try {
        const [mappedVideoGames,addedVideogames] = await Promise.all([
            getGames( URL),
            Videogame.findAll({include:Genre})
        ]);

        const allVideoGames = [...addedVideogames,...mappedVideoGames];
        return res.status(200).json(allVideoGames);
    }catch(error){
        return res.status(500).json({ error: 'Internal Server Error', code: 'SERVER_ERROR' });
    }
}

module.exports = {
    chargeVideogames
}