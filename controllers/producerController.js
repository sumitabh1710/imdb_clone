const producerService = require("../services/producerService");

exports.getAllProducers = async (req, res) => {
  try {
    const producers = await producerService.getAllProducers();
    res.status(200).json(producers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducerById = async (req, res) => {
  const { id } = req.params;
  try {
    const producer = await producerService.getProducerById(id);
    res.status(200).json(producer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createProducer = async (req, res) => {
  const producerData = req.body;
  try {
    const producerId = await producerService.createProducer(producerData);
    res
      .status(201)
      .json({ message: "Producer created successfully", producerId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProducer = async (req, res) => {
  const { id } = req.params;
  const producerData = req.body;
  try {
    await producerService.updateProducer(id, producerData);
    res.status(200).json({ message: "Producer updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteProducer = async (req, res) => {
  const { id } = req.params;
  try {
    await producerService.deleteProducer(id);
    res.status(200).json({ message: "Producer deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
