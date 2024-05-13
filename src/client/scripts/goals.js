// Goal Tracker: Allows users to set goals and track their progress.
let goal = 100;
let progress = Number(localStorage.getItem('progress')) || 0;
function updateProgress(amount) {
    if (typeof amount === 'number') {
        progress += amount;
        localStorage.setItem('progress', progress);
        let progressElement = document.getElementById('progress');
        if (progressElement) { // check for progressElement existence
            progressElement.style.width = `${(progress / goal) * 100}%`;
        }
        document.getElementById('amount-input').value = '';
    } else {
        alert('Please enter a valid number.');
    }
}
// Event listeners for the plus and minus buttons
document.getElementById('plus-btn').addEventListener('click', function() {
    updateProgress(1);
});

document.getElementById('minus-btn').addEventListener('click', function() {
    updateProgress(-1);
});

// Habit Streaks: Keep track of how many days in a row a user has completed a habit.
let streak = Number(localStorage.getItem('streak')) || 0;
function incrementStreak() {
    streak++;
    localStorage.setItem('streak', streak);
    document.getElementById('streaks-number').innerHTML = streak;
}
// Added check for habit-button existence
let habitButton = document.getElementById('habit-button');
if (habitButton) {
    habitButton.addEventListener('click', incrementStreak);
}
