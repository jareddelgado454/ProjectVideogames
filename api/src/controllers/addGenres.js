const axios  = require('axios');
const {Genre} = require('../db');

require('dotenv').config();
const {API_KEY} = process.env;

const addGenres = async(req, res) => {
    let genders = [];
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        genders = data.results;
        for(const genreInfo of genders){
            await Genre.create({
                id : genreInfo.id,
                name : genreInfo.name
            });
        }
        return res.status(200).send('Genders in database successfully');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    addGenres
}