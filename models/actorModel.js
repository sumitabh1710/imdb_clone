const db = require("../config/database");

exports.createActor = async (actorData) => {
  const { name, gender, dob, bio } = actorData;
  const selectQuery =
    "SELECT id FROM actors WHERE name = ? AND gender = ? AND dob = ?";
  const insertQuery =
    "INSERT INTO actors (name, gender, dob, bio) VALUES (?, ?, ?, ?)";
  const values = [name, gender, dob, bio];
  try {
    const [existingActors] = await db.execute(selectQuery, [name, gender, dob]);
    console.log(existingActors.length);
    if (existingActors.length > 0) {
      throw new Error("Actor already exists");
    }
    const [result] = await db.execute(insertQuery, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

exports.getAllActors = async () => {
  const query = "SELECT * FROM actors";
  try {
    const [actors] = await db.execute(query);
    return actors;
  } catch (error) {
    throw error;
  }
};

exports.getActorById = async (actorId) => {
  const query = "SELECT * FROM actors WHERE id = ?";
  try {
    const [actors] = await db.execute(query, [actorId]);
    if (actors.length === 0) {
      throw new Error("Actor not found");
    }
    return actors[0];
  } catch (error) {
    throw error;
  }
};

exports.updateActor = async (actorId, actorData) => {
  const { name, gender, dob, bio } = actorData;
  const query =
    "UPDATE actors SET name = ?, gender = ?, dob = ?, bio = ? WHERE id = ?";
  const values = [name, gender, dob, bio, actorId];
  try {
    const [result] = await db.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error("Actor not found");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

exports.deleteActor = async (actorId) => {
  const query = "DELETE FROM actors WHERE id = ?";
  try {
    const [result] = await db.execute(query, [actorId]);
    if (result.affectedRows === 0) {
      throw new Error("Actor not found");
    }
    return true;
  } catch (error) {
    throw error;
  }
};
