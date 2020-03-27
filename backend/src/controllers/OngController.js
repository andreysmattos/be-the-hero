const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req,res){
        const ongs = await connection('ongs');
        res.status(200).send(ongs)
    },

    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        res.status(200).send({
            id
        })
    }
}