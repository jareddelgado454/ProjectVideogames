const axios = require('axios');

const getGames = async(URL) => {
    let videoGamesApi = [];
    let nextURL = URL;
    while(videoGamesApi.length < 100){
        const {data} = await axios.get(`${nextURL}`);
        videoGamesApi = [...videoGamesApi,...data.results];
        nextURL = data.next;
        if(!nextURL){
            break;
        }
    }

    const mappedVideoGames = videoGamesApi.map((videogame) => ({
        id : videogame.id,
        name : videogame.name,
        released : videogame.released, 
        rating : videogame.rating,
        platforms : videogame.platforms,
        genres : videogame.genres,
        background_image : videogame.background_image,
        created : false
    }));

    return mappedVideoGames;
}
module.exports = {
    getGames
}