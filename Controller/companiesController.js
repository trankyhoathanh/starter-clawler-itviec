let express = require('express')
let { Company , Op } = require('../connection/sequelize')

var router = express.Router()
var routes = function () {

    router.route('/search')
    .get(async (req, res) => {

        data = await Company.findAll({
            limit: 10,
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: '%' + req.query.keysearch + '%'
                        }
                    },
                    {
                        url: {
                            [Op.like]: '%' + req.query.keysearch + '%'
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