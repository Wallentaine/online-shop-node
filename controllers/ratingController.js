const {Rating, Film} = require('../models/models')
const ApiError = require('../error/ApiError')


// В теории обновление рейтинга у фильма стоило вынести в отдельный контроллер, но это уже совсем другая история...
class RatingController {
    async addRating(req, res, next) {
        try {
            const {userId, filmId, rate} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не были переданы userId и/или filmId!"))

            const rating = await Rating.findOne({where: {userId, filmId}})

            if (rating) return next(ApiError.badRequest("Этот пользователь уже поставил рейтинг!"))

            if (!rate) return next(ApiError.badRequest("Оценка не была передана!"))

            if (rate < 1 || rate > 5) return next(ApiError.badRequest("Рейтинг был задан неправильно!"))

            const singleRating = await Rating.create({userId, filmId, rate})

            if (!singleRating) return next(ApiError.badRequest("Что-то пошло не так!"))

            const ratings = await Rating.findAndCountAll({where: {filmId}})

            if (!ratings) return next(ApiError.badRequest("Что-то пошло не так!"))

            let sumOfRates = 0

            ratings.rows.map(element => {
                sumOfRates += element.rate
            })

            const awgRating = sumOfRates / ratings.count

            const filmRating = await Film.update({rating :awgRating}, {where: {id: filmId}})

            if (!filmRating) return next(ApiError.badRequest("Что-то пошло не так!"))

            return res.json(singleRating)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new RatingController()