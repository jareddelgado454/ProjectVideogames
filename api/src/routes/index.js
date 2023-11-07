const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getVideogames} = require('../controllers/getVideogames');
const {getVideogame} = require('../controllers/getVideogame');
const {postVideoGame} = require('../controllers/postVideoGame');
const {addGenres} = require('../controllers/addGenres');
const { getGenres } = require('../controllers/getGenres');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames/:ID', getVideogame);
router.post('/videogames', postVideoGame);
router.get('/genres', addGenres);
router.get('/getgenres', getGenres);
router.get('/videogames', getVideogames);

module.exports = router;
