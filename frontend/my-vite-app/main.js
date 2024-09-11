// main.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.createNotes');
  const notesList = document.querySelector('.noteslist');
  const deleteAllNotesButton = document.getElementById('deleteAllNotes');
  const apiUrl = 'http://localhost:3000/api/v1/players'; // Base API URL

  // Load existing players from API
  async function loadPlayers() {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/players/get-players`);
      const players = response.data;
      notesList.innerHTML = '';
      players.forEach(player => {
        notesList.innerHTML += `
          <div class="note" data-id="${player._id}">
            <h3>${player.name}</h3>
            <p>Email: ${player.email}</p>
            <p>Phone: ${player.phone}</p>
            <p>Role: ${player.cricketRole}</p>
            <p>Available: ${player.availability}</p>
            <button onclick="editPlayer('${player._id}')">Edit</button>
            <button onclick="deletePlayer('${player._id}')">Delete</button>
          </div>
        `;
      });
    } catch (err) {
      console.error('Error loading players:', err);
    }
  }

  // Save player to API (add or update)
  async function savePlayer(player) {
    try {
      if (player.id) {
        await axios.put(`http://localhost:3000/api/v1/players/update-player/${player.id}`, player);
      } else {
        await axios.post(`http://localhost:3000/api/v1/players/add-player`, player);
      }
      loadPlayers();
    } catch (err) {
      console.error('Error saving player:', err);
    }
  }

  // Delete player
  window.deletePlayer = async function(id) {
    try {
      await axios.delete(`${apiUrl}/delete-player/${id}`);
      loadPlayers();
    } catch (err) {
      console.error('Error deleting player:', err);
    }
  };

  // Edit player
  window.editPlayer = async function(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/players/update-player/${id}`);
      const player = response.data;

      if (player) {
        document.getElementById('createNoteTitle1').value = player.name;
        document.getElementById('createNoteTitle2').value = player.email;
        document.getElementById('createNoteTitle3').value = player.phone;
        document.getElementById('cricket-role').value = player.cricketRole;
        document.querySelector(`input[name="availability"][value="${player.availability}"]`).checked = true;
        document.getElementById('CreateNoteButton').textContent = 'Update Player';
        document.getElementById('CreateNoteButton').setAttribute('data-id', id);
      }
    } catch (err) {
      console.error('Error fetching player details:', err);
    }
  };

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('createNoteTitle1').value;
    const email = document.getElementById('createNoteTitle2').value;
    const phone = document.getElementById('createNoteTitle3').value;
    const cricketRole = document.getElementById('cricket-role').value;
    const availability = document.querySelector('input[name="availability"]:checked').value;

    const player = {
      name,
      email,
      phone,
      cricketRole,
      availability,
    };

    const updateId = document.getElementById('CreateNoteButton').getAttribute('data-id');
    if (updateId) {
      player.id = updateId;
      await savePlayer(player);
      document.getElementById('CreateNoteButton').removeAttribute('data-id');
      document.getElementById('CreateNoteButton').textContent = 'Submit';
    } else {
      await savePlayer(player);
    }

    form.reset();
  });

  // Handle delete all players
  deleteAllNotesButton.addEventListener('click', async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-players`);
      const playerIds = response.data.map(player => player._id);
      await Promise.all(playerIds.map(id => axios.delete(`http://localhost:3000/api/v1/players/delete-player/${id}`)));
      loadPlayers();
    } catch (err) {
      console.error('Error deleting all players:', err);
    }
  });

  // Initial load of players
  loadPlayers();
});
