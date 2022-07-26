const {Film, CountryFilm, ProducerFilm, GenreFilm, ScenaristFilm, ActorFilm} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class FilmController {
    async create(req, res, next) {
        try {
            let {name, alternativeName, description, year, playTime, price} = req.body

            const {poster} = req.files

            let fileName = uuid.v4() + ".jpg"

            await poster.mv(path.resolve(__dirname, '..', 'static', fileName))

            const film = await Film.create({name, alternativeName, poster: fileName, description, year, playTime, price})

            if (!film) return next(ApiError.badRequest("Возможно были переданы не все параметры!"))

            return res.json(film)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {genreId, scenaristId, actorId, producerId, countryId, limit, page} = req.query

            page = page || 1
            limit = limit || 20

            let offset = page * limit - limit

            let querySort = []

            if (genreId) querySort.push({
                where: {genreId},
                model: GenreFilm,
                as: 'film_genre',
                required: true
            })

            if (scenaristId) querySort.push({
                where: {scenaristId},
                model: ScenaristFilm,
                as: 'film_scenarist',
                required: true
            })

            if (actorId) querySort.push({
                where: {actorId},
                model: ActorFilm,
                as: 'film_actor',
                required: true
            })

            if (producerId) querySort.push({
                where: {producerId},
                model: ProducerFilm,
                as: 'film_producer',
                required: true
            })

            if (countryId) querySort.push({
                where: {countryId},
                model: CountryFilm,
                as: 'film_country',
                required: true
            })

            const films = await Film.findAndCountAll({
                where: {},
                include: querySort,
                limit,
                offset
            })

            if (!films) return next(ApiError.badRequest("Не найдено ни одного фильма"))

            return res.json(films)
        } catch (e) {
            res.json(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            if (!id) return next(ApiError.badRequest("Не был передан Id фильма!"))

            const film = await Film.findOne({where: {id}})

            if (!film) return next(ApiError.badRequest("Такого фильма не существует!"))

            return res.json(film)

        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new FilmController()