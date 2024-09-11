const express = require('express');
const { getPlayer, addPlayer, updatePlayer, deletePlayer } = require('../controllers/controller'); // Adjust path if necessary
const PlayerRouter = express.Router();

PlayerRouter.get('/get-players', getPlayer);
PlayerRouter.post('/add-player', addPlayer);
PlayerRouter.put('/update-player/:id', updatePlayer); // Ensure updatePlayer is defined and exported
PlayerRouter.delete('/delete-player/:id', deletePlayer); // Ensure deletePlayer is defined and exported

module.exports = PlayerRouter;
