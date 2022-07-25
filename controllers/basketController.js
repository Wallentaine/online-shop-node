const {Basket, BasketFilm} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async addBasketItem(req, res, next) {
        // const {userId, filmId} = req.body
        //
        // if (!userId || !filmId) return next(ApiError.badRequest("Не были переданы userId и/или filmId"))
        //
        // const basket = Basket.findOne({where: {userId}})
        //
        // if (!basket) return next(ApiError.internal("Что-то пошло не так!"))
        //
        // const basketId = {...basket.id}
        //
        // const basketItem = BasketFilm.create({filmId})


    }

    async getBasket(req, res, next) {
        // const {userId} = req.body
        //
        // if (!userId) return next(ApiError.badRequest("Не был передан UserId!"))
        //
        // const basket = Basket.findOne({where: {userId}})
        //
        // if (!basket) return next(ApiError.internal("Что-то пошло не так!"))
        //
        // const basketItems = BasketFilm.findAndCountAll({where: basket.id})
        //
        // if (!basketItems) return next(ApiError.internal("Что-то пошло по пизде!"))
        //
        // return res.json(basketItems)
    }

    async deleteBasketItem(req, res, next) {

    }
}

module.exports = new BasketController()