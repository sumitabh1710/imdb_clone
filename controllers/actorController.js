const actorService = require("../services/actorService");

exports.createActor = async (req, res) => {
  const actorData = req.body;
  try {
    const actorId = await actorService.createActor(actorData);
    res.status(201).json({ message: "Actor created successfully", actorId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllActors = async (req, res) => {
  try {
    const actors = await actorService.getAllActors();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActorById = async (req, res) => {
  const actorId = req.params.id;
  try {
    const actor = await actorService.getActorById(actorId);
    res.json(actor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateActor = async (req, res) => {
  const actorId = req.params.id;
  const actorData = req.body;
  try {
    await actorService.updateActor(actorId, actorData);
    res.json({ message: "Actor updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteActor = async (req, res) => {
  const actorId = req.params.id;
  try {
    await actorService.deleteActor(actorId);
    res.json({ message: "Actor deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
