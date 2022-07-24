const {User, Film, Purchased} = require('../models/models')
const ApiError = require('../error/ApiError')

class PurchasedController {
    async addPurchasedFilm(req, res, next) {
        const {userId, filmId} = req.body

        const user = await User.findOne({where: {userId}})

        if (!user) return next(ApiError.internal("Что-то пошло не так!"))

        const film = await Film.findOne({where: {filmId}})

        if (!film) return next(ApiError.internal("Что-то пошло не так!"))

        if (user.balance - film.price < 0) return next(ApiError.badRequest("У пользователя недостаточно средств!"))

        const updateBalance = await User.update({balance: user.balance - film.price})

        if (!updateBalance) return next(ApiError.internal("Что-то пошло не так!"))

        const purchased = await Purchased.create({userId, filmId})

        if (!purchased) return next(ApiError.badRequest("Что-то пошло не так!"))

        return res.json(purchased)
    }

    async getAll(req, res, next) {
        const {userId} = req.body

        if (userId) {
            const films = await Purchased.findAll({where: {userId}})

            if (films)
                return res.json(films)
            else
                return next(ApiError.badRequest("Что-то пошло не так!"))
        } else {
            next(ApiError.badRequest("Не был передан UserId!"))
        }
    }
}

module.exports = new PurchasedController()