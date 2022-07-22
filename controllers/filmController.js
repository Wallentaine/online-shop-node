const {Film, CountryFilm, ProducerFilm, GenreFilm, ScenaristFilm, ActorFilm} = require('../models/models')
const ApiError = require('../error/ApiError')

class FilmController {
    async create(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {genreId, scenaristId, actorId, producerId, countryId} = req.query

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

            const films = await Film.findAll({
                where: {},
                include: querySort,
            })

            if (!films) return next(ApiError.badRequest("Не найдено ни одного фильма"))

            return res.json(films)
        } catch (e) {
            res.json(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            if (id) {
                const film = await Film.findOne({where: {id}})
                if (film)
                    return res.json(film)
                else
                    return next(ApiError.badRequest("Такого фильма не существует!"))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FilmController()