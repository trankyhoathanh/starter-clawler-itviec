let express = require('express')
let { Company , Op } = require('../connection/sequelize')

var router = express.Router()
var routes = function () {

    router.route('/second')
    .get(async (req, res) => {
        return res.status(200).json({
            data: null,
            statusCode: 200,
            message: 'second'
        });
    })

    router.route('/all')
    .get(async (req, res) => {
        let data = await Company.findAll()

        return res.status(200).json({
            data: data,
            statusCode: 200,
            message: 'Get All Succeed'
        });
    });

    router.route('/search')
    .get(async (req, res) => {

        let keySearch = req.query.keysearch ? req.query.keysearch : ''

        let data = await Company.findAll({
            limit: 20,
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${keySearch}%`
                        }
                    },
                    {
                        url: {
                            [Op.like]: `%${keySearch}%`
                        }
                    }
                ]
            }
        })

        return res.status(200).json({
            data: data,
            statusCode: 200,
            message: 'Search Succeed'
        });
    });

    return router;
};
module.exports = routes;