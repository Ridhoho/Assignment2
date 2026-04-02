const Movie = require("../models/Movie");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll();

    return res.status(200).json({
      success: true,
      message: "Movies berhasil ditemukan",
      data: movies
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {getMovies};
