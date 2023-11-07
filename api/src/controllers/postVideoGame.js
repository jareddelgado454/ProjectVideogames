const {Videogame, Genre} = require('../db');

const postVideoGame = async (req,res) => {
    const { name,description,platforms,released, background_image, rating, genres } = req.body;
    if(!name || !description || !platforms || !released || !background_image || ! rating || !genres){
        return res.status(404).send('Missing data');
    }

    try {
        const [newVideoGame,created] = await Videogame.findOrCreate(
            {
                where:{name},
                defaults:{
                    description,
                    platforms,
                    released,
                    background_image,
                    rating
                }
            }
        );

        if(!created){
            return res.status(409).send('The videogame already exists');
        }

        const genresInstances = await Genre.findAll({where:{id:genres}});
        await newVideoGame.addGenres(genresInstances);

        return res.status(201).send('The videogame was created successfully');

    } catch (error) {
        return res.status(500).send(error.message);
    }

}
module.exports = {
    postVideoGame
}