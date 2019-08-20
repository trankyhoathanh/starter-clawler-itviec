let express = require('express')
let cheerio = require('cheerio');
let request = require('request');
let { Company } = require('../connection/sequelize')
let _ = require('lodash');

var router = express.Router()
var routes = function () {
    function requestUrl(_url)
    {
        return new Promise((res, rej) => {
            request(_url, function(err, resp, html) {
                if (!err) {
                    const $ = cheerio.load(html);
                    res($);
                } else {
                    res(null)
                }
            });
        })
    }

    router.route('/clawler')
    .post(async (req, res) => {

        var _url = _basicUrl = 'https://itviec.com/companies',
            listUrl = [],
            listRequested = [],
            requestCount = 0,
            classUrlCheck = '.featured-company',
            classNameCheck = '.company__name'

        // Overwrite input
        try {
            if (req.body.url && req.body.url.length > 0)
                _url = req.body.url
        } catch (err) {}
        
        // Clawler ALL from ITVIEC
        var continueRequest = true
        do {
            requestCount++
            console.log(`Clawled page : ${requestCount}`)
            var resData = await requestUrl(_url + '?page=' + requestCount)
            if (resData(classUrlCheck).length > 0)
            {
                listRequested.push(resData)

                ////////////////////////////////
                // Hard this block to get ALL
                // OPEN
                if (requestCount > 5)
                {
                    continueRequest = false
                }
                //
                // CLOSE
                ////////////////////////////////

            } else {
                continueRequest = false
            } 
        } while (continueRequest)

        for(let i = 0, len = listRequested.length; i < len; i++)
        {
            for (let j = 0, len = listRequested[i](classUrlCheck).length; j < len; j++) {
                console.log(`Pushed at page ${i}, line ${j}`)

                listUrl.push({
                    url: listRequested[i](classUrlCheck)[j].attribs.href,
                    name: listRequested[i](classNameCheck)[j].firstChild.data
                })
            }
        }

        // Distinct list Response
        listUrl = listUrl.filter((v,i) => listUrl.indexOf(v) === i)

        // insert all to company table
        for(let i = 0, len = listUrl.length; i < len; i++)
        {
            try {
                await Company.findOrCreate(
                    {
                        where: {
                            url: listUrl[i].url
                        },
                        defaults: {
                            name: listUrl[i].name,
                            url: listUrl[i].url
                        }
                    }
                )
            }
            catch (err)
            {
                
            }
        }

        return res.status(200).json({
            data: listUrl,
            statusCode: 200,
            message: 'Clawler succeed'
        });
    });

    return router;
};
module.exports = routes;