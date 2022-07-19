const {Liked} = require('../models/models')
const ApiError = require('../error/ApiError')

class LikedController {
    async addLikedFilm(req, res, next) {
        const {userId, filmId} = req.body

        const exist = await Liked.findOne({where: {userId, filmId}})

        if (exist) return next(ApiError.internal("Что-то пошло не так!"))

        const liked = await Liked.create({userId, filmId})
        return res.json(liked)
    }
    async getAll(req, res) {
        // const {userId} = req.body
        //
        // const liked = await Liked.findAll({where: {userId}})
        // return res.json(liked)
        return res.json({message: "Ничего не найдено"})
    }
    async checkFilm(req, res) {
        const {userId, filmId} = req.body

        const liked = await Liked.findOne({where: {userId, filmId}})

        if (liked) return res.json(liked)
    }
    async deleteLikedFilm(req, res, next) {
        const {id} = req.body

        const exist = await Liked.findOne({where: {id}})

        if (!exist) return next(ApiError.internal("Что-то пошло не так!"))

        const liked = await Liked.destroy({where: {id}})
        return res.json(liked)
    }
}

module.exports = new LikedController()