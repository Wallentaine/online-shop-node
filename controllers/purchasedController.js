const {User, Film, Purchased} = require('../models/models')
const ApiError = require('../error/ApiError')

// Протестировать!!!!!!!!

class PurchasedController {
    async addPurchasedFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан userId и/или filmId!"))

            const user = await User.findOne({where: {id: userId}})

            if (!user) return next(ApiError.badRequest("Пользователя с таким id не существует!"))

            const film = await Film.findOne({where: {id: filmId}})

            if (!film) return next(ApiError.badRequest("Фильма с таким id не существует!"))

            const isPurchased = await Purchased.findOne({where: {userId, filmId}})

            if (isPurchased) return next(ApiError.badRequest("Фильм уже куплен пользователем!"))

            if (user.balance - film.price < 0) return next(ApiError.badRequest("У пользователя недостаточно средств!"))

            const updateBalance = await User.update({balance: user.balance - film.price}, {where: {id: userId}})

            if (!updateBalance) return next(ApiError.internal("Что-то пошло не так!"))

            const purchased = await Purchased.create({userId, filmId})

            if (!purchased) return next(ApiError.badRequest("Что-то пошло не так!"))

            return res.json(purchased)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.body

            if (!userId) next(ApiError.badRequest("Не был передан UserId!"))

            const films = await Purchased.findAll({where: {userId}})

            if (!films) return next(ApiError.badRequest("Что-то пошло не так!"))

            return res.json(films)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new PurchasedController()