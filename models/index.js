const config = require('./../config/config')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const note = require('./note')(sequelize, DataTypes)
const user = require('./user')(sequelize, DataTypes)

const db = {}

user.hasMany(note, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    onDelete: 'CASCADE',
})

note.belongsTo(user)

db.note = note
db.user = user

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
