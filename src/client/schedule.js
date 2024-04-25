// Load the schedule from local storage when the page loads
window.addEventListener('load', function() {
    let savedSchedule = JSON.parse(localStorage.getItem('weeklySchedule'));
    if (savedSchedule) {
        let scheduleHTML = '';
        for (let day in savedSchedule) {
            scheduleHTML += `<p>${day}: ${savedSchedule[day]}</p>`;
        }
        document.getElementById('schedule').innerHTML = scheduleHTML;
    }
});

// Function to update the weekly schedule in local storage
function updateLocalStorage() {
    localStorage.setItem('weeklySchedule', JSON.stringify(weeklySchedule));
}

// Function to submit the schedule
function submitSchedule(workoutSchedule) {
    if (workoutSchedule) {
        let schedule = workoutSchedule.split('<p>');
        weeklySchedule = {}; // Clear the current schedule
        for (let i = 1; i < schedule.length; i++) {
            let [day, workout] = schedule[i].split(': ');
            weeklySchedule[day.trim()] = workout.trim();
        }
        updateLocalStorage(); // Update local storage
        document.getElementById('schedule').innerHTML = workoutSchedule;
        alert('Schedule submitted successfully.');
    } else {
        alert('Please enter a valid schedule.');
    }
}

document.getElementById('submit-button').addEventListener('click', function() {
    submitSchedule(document.getElementById('schedule').innerHTML);
});

// Function to add a workout
function addWorkout(day, workout) {
    if (day && workout) {
        weeklySchedule[day] = workout;
        updateLocalStorage(); // Update local storage
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

// Function to clear the schedule
document.getElementById('clear-button').addEventListener('click', function() {
    weeklySchedule = {}; // Clear the current schedule
    updateLocalStorage(); // Update local storage
    document.getElementById('schedule').innerHTML = '';
});
