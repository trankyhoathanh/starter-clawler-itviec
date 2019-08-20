const Sequelize = require('sequelize')
const CompanyModel = require('./sqlite/company')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    transactionType: 'IMMEDIATE',
    logging: false
});

const Company = CompanyModel(sequelize, Sequelize)
let Op = Sequelize.Op

sequelize.sync({ force: false })
.then(() => {
    console.log(`Database & tables OK`)
})

module.exports = {
    Company,
    Op
}