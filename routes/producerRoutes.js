const express = require("express");
const router = express.Router();
const producerController = require("../controllers/producerController");

router.get("/", producerController.getAllProducers);
router.get("/:id", producerController.getProducerById);
router.post("/", producerController.createProducer);
router.put("/:id", producerController.updateProducer);
router.delete("/:id", producerController.deleteProducer);

module.exports = router;
