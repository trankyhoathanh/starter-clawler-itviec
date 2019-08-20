const Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('company', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      name: type.STRING,
      url: type.STRING
    },
    {
      tableName: 'company'
    })
}