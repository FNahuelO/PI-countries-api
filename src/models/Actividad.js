const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('actividad', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        dificultad: {
            type: DataTypes.ENUM(['1', '2', '3', '4', '5'])
        },
        duracion: {
            type: DataTypes.STRING
        },
        temporada: {
            type: DataTypes.ENUM(['Verano', 'Otoño', 'Invierno', 'Primavera'])
        }
    }, {
        timestamps: false,
    })
};