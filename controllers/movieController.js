const movieService = require("../services/movieService");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieService.getMovieById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createMovie = async (req, res) => {
  const movieData = req.body;
  try {
    const movieId = await movieService.createMovie(movieData);
    res.status(201).json({ message: "Movie created successfully", movieId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const movieData = req.body;
  try {
    await movieService.updateMovie(id, movieData);
    res.status(200).json({ message: "Movie updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await movieService.deleteMovie(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
