const {Genre} = require('../models/models')

class GenreController {
    async create(req, res) {
        const {name, description} = req.body
        const exist = await Genre.findOne({where: {name}})

        //if (exist) return такой жанр уже существует

        const genre = await Genre.create({name, description})
        return res.json(genre)
    }
    async getAll(req, res) {
        const genres = await Genre.findAll()
        return res.json(genres)
    }
}

module.exports = new GenreController()