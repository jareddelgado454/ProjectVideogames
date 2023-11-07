const {Genre} = require('../db');

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        if(genres.length === 0){
            return res.status(404).send('Genders not found');
        }
        return res.status(200).json(genres);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getGenres
}