const movieModel = require("../models/movieModel");

exports.getAllMovies = async () => {
  try {
    return await movieModel.getAllMovies();
  } catch (error) {
    throw error;
  }
};

exports.getMovieById = async (id) => {
  try {
    return await movieModel.getMovieById(id);
  } catch (error) {
    throw error;
  }
};

exports.createMovie = async (movieData) => {
  try {
    return await movieModel.createMovie(movieData);
  } catch (error) {
    throw error;
  }
};

exports.updateMovie = async (id, movieData) => {
  try {
    await movieModel.updateMovie(id, movieData);
  } catch (error) {
    throw error;
  }
};

exports.deleteMovie = async (id) => {
  try {
    await movieModel.deleteMovie(id);
  } catch (error) {
    throw error;
  }
};
