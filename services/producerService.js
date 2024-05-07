const producerModel = require('../models/producerModel');

exports.getAllProducers = async () => {
  try {
    return await producerModel.getAllProducers();
  } catch (error) {
    throw error;
  }
};

exports.getProducerById = async (id) => {
  try {
    return await producerModel.getProducerById(id);
  } catch (error) {
    throw error;
  }
};

exports.createProducer = async (producerData) => {
  try {
    return await producerModel.createProducer(producerData);
  } catch (error) {
    throw error;
  }
};

exports.updateProducer = async (id, producerData) => {
  try {
    await producerModel.updateProducer(id, producerData);
  } catch (error) {
    throw error;
  }
};

exports.deleteProducer = async (id) => {
  try {
    await producerModel.deleteProducer(id);
  } catch (error) {
    throw error;
  }
};
