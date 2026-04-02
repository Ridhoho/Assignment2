const { DataTypes } = require("sequelize");
const sequelize = require("../models");

const Movie = sequelize.define("Movie",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    synopsis: { type: DataTypes.TEXT, allowNull: false },
    trailerUrl: { type: DataTypes.STRING, allowNull: false },
    imgUrl: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
  },
  { tableName: "movies", timestamps: true },
);

module.exports = Movie;
