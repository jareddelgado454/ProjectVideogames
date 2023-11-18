const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review',{
        id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false 
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        rating : {
            type : DataTypes.FLOAT,
            allowNull : false
        } 
    });
}