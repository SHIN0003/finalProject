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