const db = require("../config/database");

exports.getAllProducers = async () => {
  const query = "SELECT * FROM producers";
  try {
    const [producers] = await db.execute(query);
    return producers;
  } catch (error) {
    throw error;
  }
};

exports.getProducerById = async (id) => {
  const query = "SELECT * FROM producers WHERE id = ?";
  try {
    const [producers] = await db.execute(query, [id]);
    if (producers.length === 0) {
      throw new Error("Producer not found");
    }
    return producers[0];
  } catch (error) {
    throw error;
  }
};

exports.createProducer = async (producerData) => {
  const { name, gender, dob, bio } = producerData;
  const selectQuery =
    "SELECT id FROM producers WHERE name = ? AND gender = ? AND dob = ?";
  const insertQuery =
    "INSERT INTO producers (name, gender, dob, bio) VALUES (?, ?, ?, ?)";
  const values = [name, gender, dob, bio];
  try {
    const [existingProducers] = await db.execute(selectQuery, [
      name,
      gender,
      dob,
    ]);
    if (existingProducers.length > 0) {
      throw new Error("Producer already exists");
    }
    const [result] = await db.execute(insertQuery, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

exports.updateProducer = async (id, producerData) => {
  const { name, gender, dob, bio } = producerData;
  const query =
    "UPDATE producers SET name = ?, gender = ?, dob = ?, bio = ? WHERE id = ?";
  const values = [name, gender, dob, bio, id];
  try {
    const [result] = await db.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error("Producer not found");
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteProducer = async (id) => {
  const query = "DELETE FROM producers WHERE id = ?";
  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error("Producer not found");
    }
  } catch (error) {
    throw error;
  }
};
