const { DataTypes } = require('sequelize')

module.exports =(client)=>{
    const user = client.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                required: true
            },
            email: {
                type: DataTypes.STRING,
                required: true,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            role: {
                type: DataTypes.STRING,
                default: 'user'
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    )
    return user
}