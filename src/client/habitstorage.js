// habitstorage.js

// Initialize PouchDB
const habitDB = new PouchDB('habits');

// Function to save a habit to local storage
function saveHabit(habit) {
    return habitDB.put(habit);
}

// Function to get all habits from local storage
function getAllHabits() {
    return habitDB.allDocs({ include_docs: true })
        .then(result => {
            return result.rows.map(row => row.doc);
        });
}

// Function to delete a habit from local storage
function deleteHabit(habit) {
    return habitDB.remove(habit);
}

// Export the functions for use in other files
export { saveHabit, getAllHabits, deleteHabit };
