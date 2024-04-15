// Workout Scheduler: Users could interactively create and modify their workout schedules. 
let weeklySchedule = JSON.parse(localStorage.getItem('weeklySchedule')) || {};

function submitSchedule(workoutSchedule) {
    if (workoutSchedule) {
        //first index is useless
        let schedule = workoutSchedule.split('<p>');
        localStorage.setItem('weeklySchedule', JSON.stringify(schedule));
        document.getElementById('schedule').innerHTML = '';
        alert('Schedule submitted successfully.')
    } else {
        alert('Please enter a valid schedule.');
    }
}

document.getElementById('submit-button').addEventListener('click', function() {
    submitSchedule(document.getElementById('schedule').innerHTML);
});

function addWorkout(day, workout) {
    if (day && workout) {
        document.getElementById('schedule').innerHTML += `<p>${day}: ${workout}</p>`;
        document.getElementById('day').value = '';
        document.getElementById('workout-input').value = '';
    } else {
        alert('Please enter a valid day and workout.');
    }
}
document.getElementById('add-button').addEventListener('click', function() {
    let day = document.getElementById('day').value;
    let workout = document.getElementById('workout-input').value;
    addWorkout(day, workout);
});

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('schedule').innerHTML = '';
});

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
