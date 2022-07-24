const {Purchased} = require('../models/models')
const ApiError = require('../error/ApiError')

class PurchasedController {
    async addPurchasedFilm(req, res, next) {

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