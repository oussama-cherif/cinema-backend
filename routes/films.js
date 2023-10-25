const express = require('express')
const { getFilms, getOneFilm, addFilm, deleteFilm, updateFilm } = require('../controllers/filmController')

const router = express.Router()


router.get('/', getFilms)

router.get('/:id', getOneFilm)

router.post('/', addFilm)

router.delete('/:id', deleteFilm)

router.patch('/:id', updateFilm)


module.exports = router