module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
                username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
                password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            updatedAt: false,
            freezeTableName: true,
            underscored: true,
        }
    )

    return user
}
