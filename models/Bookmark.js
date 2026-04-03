const { DataTypes } = require("sequelize");
const sequelize = require("../models");
const Movie = require("./Movie")
const User = require("./User")

const Bookmark = sequelize.define(
  "Bookmark",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movieId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "Bookmarks", timestamps: true },
);

Bookmark.belongsTo(Movie, {foreignKey: "movieId"})
Bookmark.belongsTo(User, {foreignKey: "userId"})

module.exports = Bookmark;
