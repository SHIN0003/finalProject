import PouchDB from 'pouchdb';

const db = new PouchDB('habits');

// Function to calculate streak
async function calculateAndDisplayStreak() {
    try {
        // Get habits from the database
        const response = await db.allDocs({ include_docs: true });
        const habits = response.rows.map(row => row.doc);

        // Calculate streak
        let streak = 0;
        let currentStreak = 0;

        habits.forEach(habit => {
            if (habit.completed) {
                currentStreak++;
            } else {
                streak = Math.max(streak, currentStreak);
                currentStreak = 0;
            }
        });

        const finalStreak = Math.max(streak, currentStreak);

        // Display streak
        displayStreak(finalStreak);
    } catch (error) {
        console.error('Failed to calculate and display streak:', error);
    }
}

// Function to display streak
function displayStreak(streak) {
    document.getElementById('streaks-number').textContent = streak;
}

// Call the function to calculate and display streak  
document.addEventListener('DOMContentLoaded', calculateAndDisplayStreak);
