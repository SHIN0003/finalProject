// Goal Tracker: Allows users to set goals and track their progress.
let goal = 100;

// Event listeners for the plus and minus buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('plus-btn').addEventListener('click', function() {
        updateProgress(1);
    });

    document.getElementById('minus-btn').addEventListener('click', function() {
        updateProgress(-1);
    });
});

// Function to update progress
function updateProgress(amount) {
    let progress = Number(localStorage.getItem('progress')) || 0;
    if (typeof amount === 'number' && amount !== 0) {
        progress += amount;
        localStorage.setItem('progress', progress);
        let progressElement = document.getElementById('progress');
        if (progressElement) { // check for progressElement existence
            progressElement.style.width = `${(progress / goal) * 100}%`;
        }
        // Update streaks number
        let streaksNumber = document.getElementById('streaks-number');
        let currentStreak = parseInt(streaksNumber.textContent);
        currentStreak += amount; // Increment or decrement the streaks number
        streaksNumber.textContent = currentStreak;
    } else {
        alert('Please enter a valid number.');
    }
}
