const {Genre} = require('../models/models')
const ApiError = require('../error/ApiError')

class GenreController {
    async create(req, res, next) {
        try {
            const {name, description} = req.body

            if (!name || description) return next(ApiError.badRequest("не был передан аргумент name и/или description"))

            const exist = await Genre.findOne({where: {name}})

            if (exist) return next(ApiError.badRequest("Этот жанр уже существует!"))

            const genre = await Genre.create({name, description})

            if (!genre) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(genre)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const genres = await Genre.findAll()

            if (!genres) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(genres)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new GenreController()