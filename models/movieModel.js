const db = require("../config/database");

exports.getAllMovies = async () => {
  const query = `
    SELECT 
      movies.*, 
      GROUP_CONCAT(movie_actors.actor_id) AS actor_ids 
    FROM 
      movies 
    LEFT JOIN 
      movie_actors ON movies.id = movie_actors.movie_id 
    GROUP BY 
      movies.id
  `;
  try {
    const [movies] = await db.execute(query);
    return movies;
  } catch (error) {
    throw error;
  }
};

exports.getMovieById = async (id) => {
  const query = `
    SELECT 
      movies.*, 
      GROUP_CONCAT(movie_actors.actor_id) AS actor_ids 
    FROM 
      movies 
    LEFT JOIN 
      movie_actors ON movies.id = movie_actors.movie_id 
    WHERE 
      movies.id = ?
    GROUP BY 
      movies.id;`;
  try {
    const [movies] = await db.execute(query, [id]);
    if (movies.length === 0) {
      throw new Error("Movie not found");
    }
    return movies[0];
  } catch (error) {
    throw error;
  }
};

exports.createMovie = async (movieData) => {
  const { name, year_of_release, plot, poster_url, producer_id, actors } =
    movieData;
  const selectProducerQuery = "SELECT id FROM producers WHERE id = ?";
  const selectMovieQuery =
    "SELECT id FROM movies WHERE name = ? AND year_of_release = ?";
  const insertMovieQuery =
    "INSERT INTO movies (name, year_of_release, plot, poster_url, producer_id) VALUES (?, ?, ?, ?, ?)";
  const selectActorQuery = "SELECT id FROM actors WHERE id = ?";
  const producerValues = [producer_id];
  const movieValues = [name, year_of_release];

  try {
    const [existingProducers] = await db.execute(
      selectProducerQuery,
      producerValues
    );
    if (existingProducers.length === 0) {
      throw new Error("Producer does not exist");
    }

    const [existingMovies] = await db.execute(selectMovieQuery, movieValues);
    if (existingMovies.length > 0) {
      throw new Error("Movie already exists");
    }

    if (actors && actors.length > 0) {
      for (const actorId of actors) {
        const [existingActors] = await db.execute(selectActorQuery, [actorId]);
        if (existingActors.length === 0) {
          throw new Error(`Actor ${actorId} does not exist`);
        }
      }
    }

    const values = [name, year_of_release, plot, poster_url, producer_id];
    const [result] = await db.execute(insertMovieQuery, values);
    const movieId = result.insertId;

    if (actors && actors.length > 0) {
      for (const actorId of actors) {
        await db.execute(
          "INSERT INTO movie_actors (movie_id, actor_id) VALUES (?, ?)",
          [movieId, actorId]
        );
      }
    }

    return movieId;
  } catch (error) {
    throw error;
  }
};

exports.updateMovie = async (id, movieData) => {
  const { name, year_of_release, plot, poster_url, producer_id, actors } =
    movieData;
  const selectMovieQuery = "SELECT id FROM movies WHERE id = ?";
  const selectProducerQuery = "SELECT id FROM producers WHERE id = ?";
  const selectActorQuery = "SELECT id FROM actors WHERE id = ?";
  const updateMovieQuery =
    "UPDATE movies SET name = ?, year_of_release = ?, plot = ?, poster_url = ?, producer_id = ? WHERE id = ?";
  const movieValues = [
    name,
    year_of_release,
    plot,
    poster_url,
    producer_id,
    id,
  ];

  try {
    const [existingMovies] = await db.execute(selectMovieQuery, [id]);
    if (existingMovies.length === 0) {
      throw new Error("Movie does not exist");
    }

    const [existingProducers] = await db.execute(selectProducerQuery, [
      producer_id,
    ]);
    if (existingProducers.length === 0) {
      throw new Error("Producer does not exist");
    }

    if (actors && actors.length > 0) {
      for (const actorId of actors) {
        const [existingActors] = await db.execute(selectActorQuery, [actorId]);
        if (existingActors.length === 0) {
          throw new Error(`Actor ${actorId} does not exist`);
        }
      }
    }

    await db.execute(updateMovieQuery, movieValues);

    if (actors && actors.length > 0) {
      await db.execute("DELETE FROM movie_actors WHERE movie_id = ?", [id]);
      for (const actorId of actors) {
        await db.execute(
          "INSERT INTO movie_actors (movie_id, actor_id) VALUES (?, ?)",
          [id, actorId]
        );
      }
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteMovie = async (id) => {
  const query = "DELETE FROM movies WHERE id = ?";
  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error("Movie not found");
    }
  } catch (error) {
    throw error;
  }
};
