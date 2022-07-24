const {Rating, Film} = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {
    async addRating(req, res, next) {
        const {userId, filmId, rating} = req.body

        if (!userId || !filmId) {

            if (!rating) {
                const ratings = await Rating.findAndCountAll({where: {filmId}})

                if (!ratings) return next(ApiError.badRequest("Что-то пошло не так!"))

                const singleRating = await Rating.create({userId, filmId, rating})

                if (!singleRating) return next(ApiError.badRequest("Что-то пошло не так!"))

                let sumOfRates = 0

                ratings.rows.map(element => {
                    sumOfRates += element.rate
                })

                const awgRating = sumOfRates / ratings.count

                const filmRating = await Film.update({where: {filmId}}, {rating: {awgRating}})

                if (!filmRating) return next(ApiError.badRequest("Что-то пошло не так!"))

                return res.json(singleRating)
            } else {
                return next(ApiError.badRequest("Оценка не была передана!"))
            }
        } else {
            return next(ApiError.badRequest("Не были переданы userId и/или filmId!"))
        }
    }
}

module.exports = new RatingController()