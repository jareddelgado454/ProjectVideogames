require('dotenv').config();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { getGames } = require('./utils/getGames');
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (req,res) => {

    const {name} = req.query;
    try {
        const [mappedVideoGames,addedVideogames] = await Promise.all([
            getGames( URL),
            Videogame.findAll({include:Genre})
        ]);

        const allVideoGames = [...addedVideogames,...mappedVideoGames];
        if(name){
            const filteredVideoGames = allVideoGames.filter((videogame) => {
                return videogame.name.toLowerCase().includes(name.toLowerCase());
            });

            if(filteredVideoGames.length == 0){
                return res.status(404).send('No videogames with that name were found');
            }

            return res.status(200).json(filteredVideoGames.slice(0,15));
        }else{    
            return res.status(200).json(allVideoGames);
        }
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
}
module.exports = {
    getVideogames
}
