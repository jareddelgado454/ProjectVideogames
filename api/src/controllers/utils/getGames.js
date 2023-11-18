const axios = require('axios');

const getGames = async(URL) => {

    try {
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
    } catch (error) {
        console.error('Error fetching games from API:', error);
        throw new Error('Error fetching games from API');
    }
    
}
module.exports = {
    getGames
}