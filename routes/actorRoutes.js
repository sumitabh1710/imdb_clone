const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.post('/', actorController.createActor);

router.get('/', actorController.getAllActors);

router.get('/:id', actorController.getActorById);

router.put('/:id', actorController.updateActor);

router.delete('/:id', actorController.deleteActor);

module.exports = router;
