const Player = require('../Models/players'); // Import Player model

const getPlayer = async (req, res) => {
  try {
    const data = await Player.find({});
    res.status(200).send({
      success: true,
      message: "Data of Players",
      data
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const addPlayer = async (req, res) => {
  try {
    const { firstName, phoneNumber, role, available, email } = req.body;

    if (!firstName || !email || phoneNumber === undefined || !role || available === undefined) {
      return res.status(400).send({
        success: false,
        message: "All fields are mandatory"
      });
    }

    const newPlayer = new Player({
      firstName,
      phoneNumber,
      role,
      available,
      email
    });

    await newPlayer.save();

    res.status(201).send({
      success: true,
      message: "Player added successfully",
      data: newPlayer
    });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !updates) {
      return res.status(400).send({
        success: false,
        message: "Player ID and updates are required"
      });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedPlayer) {
      return res.status(404).send({
        success: false,
        message: "Player not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Player updated successfully",
      data: updatedPlayer
    });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Player ID is required"
      });
    }

    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).send({
        success: false,
        message: "Player not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Player deleted successfully",
      data: deletedPlayer
    });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = { getPlayer, addPlayer, updatePlayer, deletePlayer };
