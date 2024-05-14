// Initialize PouchDB
const db = new PouchDB('habits');

// Function to save a habit
async function saveHabit(habit) {
    try {
        const response = await fetch(`http://localhost:3001/save-habit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(habit)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Refresh the list of habits after saving
        await getHabits();
    } catch (error) {
        console.error('Failed to save habit:', error);
    }
}

// Function to delete a habit
async function deleteHabit(id) {
    try {
        const response = await fetch(`http://localhost:3001/delete-habit/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Refresh the list of habits after deletion
        await getHabits();
    } catch (error) {
        console.error('Failed to delete habit:', error);
    }
}

// Function to fetch habits from the server
async function getHabits() {
    try {
        const response = await fetch('http://localhost:3001/get-habits');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const habits = await response.json();
        const container = document.querySelector('.current-habits-list');
        container.innerHTML = ''; // Clear existing contents

        habits.forEach(habit => {
            const habitDiv = document.createElement('div');
            habitDiv.className = 'habit';
            habitDiv.id = habit._id; // Set habit ID as the div ID
            habitDiv.innerHTML = `
                <div class="habit-text">
                    <h3>${habit.name}</h3>
                    <p>Frequency: ${habit.frequency}</p>
                </div>
                <div class="habit-buttons">
                    <button class="complete-button" onclick="completeHabit('${habit._id}')">Complete</button>
                    <button class="delete-button" onclick="handleDeleteHabit('${habit._id}')">Delete</button>
                </div>
              `;
            container.appendChild(habitDiv);
        });
    } catch (error) {
        console.error('Failed to fetch habits:', error);
    }
}

// Function to handle saving a habit
function handleSaveHabit() {
    const habitName = document.getElementById('habit-name').value;
    const category = document.getElementById('category').value;
    const frequency = parseInt(document.getElementById('count').textContent);

    const habit = {
        _id: new Date().toISOString(),
        name: habitName,
        category: category,
        frequency: frequency,
        completed: 0 // Initialize completed count to 0
    };

    saveHabit(habit)
        .then(() => {
            // Update UI to display the saved habit
            displayHabit(habit);
            // Increment streak after saving the habit
            incrementStreak();
        })
        .catch(error => {
            console.error('Error saving habit:', error);
        });
}

    saveHabit(habit)
        .then(() => {
            // Update UI to display the saved habit
            displayHabit(habit);
        })
        .catch(error => {
            console.error('Error saving habit:', error);
        });


// Function to increment the streaks number
function incrementStreak() {
    let streaksNumber = document.getElementById('streaks-number');
    let currentStreak = parseInt(streaksNumber.textContent);
    currentStreak++; // Increment the streaks number
    streaksNumber.textContent = currentStreak;
}

// Function to display a habit in the UI
function displayHabit(habit) {
    const habitsList = document.getElementById('habitsUI');
    const habitItem = document.createElement('li');
    habitItem.textContent = habit.name;
    habitsList.appendChild(habitItem);
}

// Function to handle deleting a habit
function handleDeleteHabit(habitId) {
    deleteHabit(habitId)
        .then(() => {
            // Update UI to remove the deleted habit
            const habitElement = document.getElementById(habitId);
            if (habitElement) {
                habitElement.remove();
            }
        })
        .catch(error => {
            console.error('Error deleting habit:', error);
        });
}

// Function to initialize event listeners
function initialize() {
    document.getElementById('save-btn').addEventListener('click', handleSaveHabit);
    getHabits(); // Fetch habits when the page loads
}

// Call the initialize function to set up event listeners when the DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
