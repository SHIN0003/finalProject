// Goal Tracker: Allows users to set goals and track their progress.
let goal = 100;
let progress = Number(localStorage.getItem('progress')) || 0;
function updateProgress(amount) {
    if (typeof amount === 'number') {
        progress += amount;
        localStorage.setItem('progress', progress);
        let progressElement = document.getElementById('progress');
        progressElement.style.width = `${(progress / goal) * 100}%`;
        document.getElementById('amount-input').value = '';
    } else {
        alert('Please enter a valid number.');
    }
}
document.getElementById('update-button').addEventListener('click', function() {
    let amount = Number(document.getElementById('amount-input').value);
    updateProgress(amount);
});

// Habit Streaks: Keep track of how many days in a row a user has completed a habit.
let streak = Number(localStorage.getItem('streak')) || 0;
function incrementStreak() {
    streak++;
    localStorage.setItem('streak', streak);
    document.getElementById('streak').innerHTML = `Current Streak: ${streak} days`;
}
document.getElementById('habit-button').addEventListener('click', incrementStreak);

