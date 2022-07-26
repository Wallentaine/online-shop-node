const {Basket, BasketFilm} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async addBasketItem(req, res, next) {
        const {userId, filmId} = req.body

        if (!userId || !filmId) return next(ApiError.badRequest("Не были переданы userId и/или filmId"))

        const basket = await Basket.findOne({where: {userId}})

        if (!basket) return next(ApiError.internal("Похоже у пользователя нету корзины!"))

        const isAlreadyInBasket = await BasketFilm.findOne({where: {basketId: basket.id, filmId}})

        if (isAlreadyInBasket) return next(ApiError.badRequest("Данный фильм уже есть в корзине!"))

        const basketItem = await BasketFilm.create({basketId: basket.id, filmId})

        if (!basketItem) return next(ApiError.internal("Что-то пошло не так!"))

        return res.json(basketItem)

    }

    async getBasket(req, res, next) {
        const {userId} = req.body

        if (!userId) return next(ApiError.badRequest("Не был передан UserId!"))

        const basket = await Basket.findOne({where: {userId}})

        if (!basket) return next(ApiError.internal("Похоже у пользователя нету корзины!"))

        const basketItems = await BasketFilm.findAndCountAll({where: {basketId: basket.id}})

        if (!basketItems) return next(ApiError.internal("Что-то пошло не так!!"))

        return res.json(basketItems)
    }

    async deleteBasketItem(req, res, next) {
        const {userId, filmId} = req.body

        if (!userId || !filmId) return next(ApiError.badRequest("Не были переданы userId и/или filmId"))

        const basket = await Basket.findOne({where: {userId}})

        if (!basket) return next(ApiError.internal("Похоже у пользователя нету корзины!"))

        const basketItemDestroy = await BasketFilm.destroy({where: {basketId: basket.id, filmId}})

        if (!basketItemDestroy) return next(ApiError.internal("Что-то пошло не так!"))

        return res.json(basketItemDestroy)

    }
}

module.exports = new BasketController()