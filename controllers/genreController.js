const {Genre} = require('../models/models')
const ApiError = require('../error/ApiError')

class GenreController {
    async create(req, res, next) {
        const {name, description} = req.body
        const exist = await Genre.findOne({where: {name}})

        if (exist) return next(ApiError.badRequest("Этот жанр уже существует!"))

        const genre = await Genre.create({name, description})
        return res.json(genre)
    }
    async getAll(req, res) {
        const genres = await Genre.findAll()
        return res.json(genres)
    }
}

module.exports = new GenreController()