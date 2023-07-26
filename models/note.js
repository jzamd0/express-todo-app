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
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    },
  )

  return note
}
