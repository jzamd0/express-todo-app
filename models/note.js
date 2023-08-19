const { DateTime } = require('luxon')

module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define(
    'note',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      updated_at_formatted: {
        type: DataTypes.VIRTUAL,
        get() {
          return DateTime.fromJSDate(this.updated_at).toLocaleString(
            DateTime.DATETIME_MED_WITH_SECONDS,
          )
        },
      },
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
      underscored: true,
    },
  )

  return note
}
