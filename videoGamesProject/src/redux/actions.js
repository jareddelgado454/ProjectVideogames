import { GET_VIDEOGAMES, ERROR_VIDEOGAMES, FILTER_VIDEOGAMES_BY_ORIGIN, FILTER_VIDEOGAMES_BY_GENRE, ORDER_VIDEOGAMES , GET_VIDEOGAME , DELETE_FILTERS, CHARGE_VIDEOGAMES, CLEAN_ERRORS} from './actionType';
import axios from 'axios';
import url from '../../rutaConnection';

export const getVideogames = ( name ) => {
    return async (dispatch) =>{
        try {
            const endpoint = `${url}/videogames?name=${name}`;
            const { data } = await axios.get(endpoint);
            dispatch({
                type: GET_VIDEOGAMES,
                payload: data
            });

            return data;
        
        } catch (error) {
            dispatch({
                type : ERROR_VIDEOGAMES,
                payload : error.data ? error.reponse.data : 'Unknown Error'
            });
            throw error
        }   
    };
}

export const getVideogame = (id) => {
    try {
        const endpoint = `${url}/videogames/${id}`;
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

export const cleanErrors = () => ({
    type : CLEAN_ERRORS
})

