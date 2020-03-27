const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return res.status(201).json({
            id
        })
    },

    async index(req, res) {

        const { 'count(*)': count } = await connection('incidents').count().first();
        // console.log(count);
        const { page = 1 } = req.query;
        /*
            Paginação
            1 = (1 - 1) * 5 = 0
            2 = (2 - 1) * 5 = 5
            3 = (3 - 1) * 5 = 10
        */

        const incidents = await connection('incidents')
            .innerJoin('ongs', 'incidents.ong_id', 'ongs.id')
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
            .limit(5)
            .offset((page - 1) * 5);

        res.header('X-Total-Count', count)
        return res.json({ incidents })
    },

    async destroy(req, res) {

        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where("id", id)
            .select('ong_id')
            .first();

        if (ong_id != incidents.ong_id) {
            return res.status(401).json({
                error: 'Operation not permitted'
            });
        }

        await connection('incidents')
            .where('id', id)
            .del();


        return res.status(204).send();



    }
}