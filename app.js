const express = require("express");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const producerRoutes = require("./routes/producerRoutes");
const db = require("./config/database");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function createTables() {
  const createMoviesTable = `CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year_of_release INT NOT NULL,
    plot TEXT,
    poster_url VARCHAR(255),
    producer_id INT,
    FOREIGN KEY (producer_id) REFERENCES producers(id)
  )`;

  const createActorsTable = `CREATE TABLE IF NOT EXISTS actors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    bio TEXT
  )`;

  const createProducersTable = `CREATE TABLE IF NOT EXISTS producers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    bio TEXT
  )`;

  const createMovieActorsTable = `CREATE TABLE IF NOT EXISTS movie_actors (
    movie_id INT,
    actor_id INT,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    PRIMARY KEY (movie_id, actor_id)
  )`;

  try {
    await db.execute(createActorsTable);
    console.log("Actors table created");

    await db.execute(createProducersTable);
    console.log("Producers table created");

    await db.execute(createMoviesTable);
    console.log("Movies table created");

    await db.execute(createMovieActorsTable);
    console.log("Movie Actors table created");
  } catch (error) {
    throw error;
  }
}

createTables();

app.use("/movies", movieRoutes);
app.use("/actors", actorRoutes);
app.use("/producers", producerRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
