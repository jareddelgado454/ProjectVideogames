const { Router } = require('express');

const {getVideogames} = require('../controllers/getVideogames');
const {getVideogame} = require('../controllers/getVideogame');
const {postVideoGame} = require('../controllers/postVideoGame');
const {addGenres} = require('../controllers/addGenres');
const { getGenres } = require('../controllers/getGenres');
const {chargeVideogames} = require('../controllers/chargeVideogames');
const {getReview} = require('../controllers/getReview');
const {postReview} = require('../controllers/postReview');
const router = Router();


router.get('/videogames/:ID', getVideogame);
router.post('/videogames', postVideoGame);
router.get('/genres', addGenres);
router.get('/getgenres', getGenres);
router.get('/chargeVideogames', chargeVideogames);
router.get('/videogames', getVideogames);
router.get('/reviews', getReview);
router.post('/reviews', postReview);

module.exports = router;
