const Film = require('../models/filmModel')
const mongoose = require('mongoose')

const getFilms = async (req, res) => {
    const films = await Film.find({})

    res.status(200).json(films)
}

const getOneFilm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'format de ID du film pas correcte :('})
    }

    const film = await Film.findById(id)

    if(!film) {
        return res.status(404).json({error: 'film pas trouvé x.x'})
    }

    res.status(200).json(film)
}


const addFilm = async (req, res) => {
    const { title, description, mainActors, director, imageUrl } = req.body
    try {
        const film = await Film.create({
            title,
            description,
            mainActors,
            director,
            imageUrl
        });
        res.status(200).json(film)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteFilm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'format de ID du film pas correcte :('})
    }

    const film = await Film.findOneAndDelete({_id: id})

    if(!film) {
        return res.status(404).json({error: 'film pas trouvé x.x'})
    }

    res.status(200).json(film)
}

const updateFilm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'format de ID du film pas correcte :('})
    }

    const film = await Film.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!film) {
        return res.status(404).json({error: 'film pas trouvé x.x'})
    }

    res.status(200).json(film)
}



module.exports = {
    getFilms,
    getOneFilm,
    addFilm,
    deleteFilm,
    updateFilm
}