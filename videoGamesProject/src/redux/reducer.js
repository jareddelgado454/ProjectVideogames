import { GET_VIDEOGAMES, ERROR_VIDEOGAMES, FILTER_VIDEOGAMES_BY_GENRE, FILTER_VIDEOGAMES_BY_ORIGIN, ORDER_VIDEOGAMES , GET_VIDEOGAME, DELETE_FILTERS, CHARGE_VIDEOGAMES, CLEAN_ERRORS } from './actionType';

const initialState = {
    allVideogames : [],
    filteredVideogames : []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CHARGE_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
                filteredVideogames: action.payload
            }

        case ERROR_VIDEOGAMES:
            return {
                ...state,
                errors : [...state.errors, action.payload]
            }
        

        case CLEAN_ERRORS:
            return {
                ...state,
                errors : ['']
            }
        
        case GET_VIDEOGAMES:
            return {
                ...state,
                filteredVideogames:action.payload
            }
        
        case  GET_VIDEOGAME:
            return action.payload

        case FILTER_VIDEOGAMES_BY_ORIGIN:
            const origin = action.payload
                switch(origin){
                    case 'allOrigin':
                        return {
                            ...state,
                            filteredVideogames : [...state.allVideogames]
                        }
                    case 'created':
                        const auxFilteredVideogames =  [...state.allVideogames].filter((videogame) => {
                            return videogame.created == true
                        });
                        return {
                            ...state,
                            filteredVideogames : auxFilteredVideogames
                        }
                    case 'imported':
                        const auxFilteredVideogames2 =  [...state.allVideogames].filter((videogame) => {
                            return videogame.created == false
                        });
                        return {
                            ...state,
                            filteredVideogames : auxFilteredVideogames2
                        }
                }                
        case FILTER_VIDEOGAMES_BY_GENRE:        
            const genre_id = action.payload
                if(genre_id == 'allGenres'){
                    return {
                        ...state,
                        filteredVideogames : [...state.allVideogames]
                    }
                }
                const filteredVideogamesByGenre = [...state.allVideogames].filter((videogame) => 
                    videogame.genres.some((genre) => genre.id == genre_id )
                );
                
                return {
                    ...state,
                    filteredVideogames : filteredVideogamesByGenre
                }
            

        case ORDER_VIDEOGAMES:
             const tag = action.payload;
             let orderedVideogames = [];
             if(tag == 'NoOrder'){
                return {
                    ...state,
                    filteredVideogames : state.filteredVideogames
                }
             }
             if(tag == 'AscendingName'){
                orderedVideogames = [...state.filteredVideogames].sort((a,b) => a.name.localeCompare(b.name));
                return {
                    ...state,
                    filteredVideogames : orderedVideogames
                }
             }
             if(tag == 'DescendingName'){
                orderedVideogames = [...state.filteredVideogames].sort((a,b) => b.name.localeCompare(a.name));
                return {
                    ...state,
                    filteredVideogames : orderedVideogames
                }
             }
             
             if(tag == 'AscendingRating'){
                orderedVideogames = [...state.filteredVideogames].sort((a,b) => a.rating - b.rating);
                return {
                    ...state,
                    filteredVideogames : orderedVideogames
                }
             }

             if(tag == 'DescendingRating'){
                orderedVideogames = [...state.filteredVideogames].sort((a,b) => b.rating - a.rating);
                return {
                    ...state,
                    filteredVideogames : orderedVideogames
                }
             }

        case DELETE_FILTERS:
            return {
                ...state,
                filteredVideogames : [...state.allVideogames]
            }    
    }
}

export default reducer;