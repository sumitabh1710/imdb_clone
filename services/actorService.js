const actorModel = require('../models/actorModel');


exports.createActor = async (actorData) => {
  try {
    return await actorModel.createActor(actorData);
  } catch (error) {
    throw error;
  }
};

exports.getAllActors = async () => {
  try {
    return await actorModel.getAllActors();
  } catch (error) {
    throw error;
  }
};

exports.getActorById = async (actorId) => {
  try {
    return await actorModel.getActorById(actorId);
  } catch (error) {
    throw error;
  }
};

exports.updateActor = async (actorId, actorData) => {
  try {
    await actorModel.updateActor(actorId, actorData);
  } catch (error) {
    throw error;
  }
};

exports.deleteActor = async (actorId) => {
  try {
    await actorModel.deleteActor(actorId);
  } catch (error) {
    throw error;
  }
};
