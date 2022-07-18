const {Producer} = require('../models/models')

class ProducerController {
    async create(req, res) {
        const {name} = req.body
        const exist = await Producer.findOne({where: {name}})

        //if (exist) return такой жанр уже существует

        const producer = await Producer.create({name})
        return res.json(producer)
    }
    async getAll(req, res) {
        const producers = await Producer.findAll()
        return res.json(producers)
    }
}

module.exports = new ProducerController()