import { GET_VIDEOGAMES, FILTER_VIDEOGAMES_BY_ORIGIN, FILTER_VIDEOGAMES_BY_GENRE, ORDER_VIDEOGAMES , GET_VIDEOGAME , DELETE_FILTERS, CHARGE_VIDEOGAMES} from './actionType';
import axios from 'axios';

export const getVideogames = ( name ) => {
    try {
        const endpoint = `http://localhost:3001/videogames?name=${name}`;
        return async (dispatch) =>{
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data
            });
        }
    } catch (error) {
        throw Error(error);
    }   
};

export const getVideogame = (id) => {
    try {
        const endpoint = `http://localhost:3001/videogames/${id}`;
        return async (dispatch) => {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type : GET_VIDEOGAME,
                payload : data
            })
        }
    } catch (error) {
        throw Error(error);
    }
}

export const filterVideogamesByGenre = (genre) => ({
    type : FILTER_VIDEOGAMES_BY_GENRE,
    payload : genre
});

export const filterVideogamesByOrigin = (origin) => ({
    type : FILTER_VIDEOGAMES_BY_ORIGIN,
    payload : origin
});

export const orderVideogames = (orderByTag ) => ({
    type : ORDER_VIDEOGAMES,
    payload : orderByTag
});

export const deleteFilters = () => ({
    type: DELETE_FILTERS
});

export const chargeVideogames = (data) => ({
    type: CHARGE_VIDEOGAMES,
    payload: data
});

