// Initialize weeklySchedule
let weeklySchedule = {};

// Load the schedule from local storage when the page loads
window.addEventListener('load', function() {
    let savedSchedule = JSON.parse(localStorage.getItem('weeklySchedule'));
    if (savedSchedule) {
        weeklySchedule = savedSchedule; // Assign saved schedule
        displaySchedule(); // Display the schedule on the page
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
        displaySchedule(); // Display the updated schedule on the page
        alert('Schedule submitted successfully.');
    } else {
        alert('Please enter a valid schedule.');
    }
}

document.getElementById('submit-button').addEventListener('click', function() {
    submitSchedule(document.getElementById('schedule').innerHTML);
});

// Function to display the schedule on the page
function displaySchedule() {
    let scheduleHTML = '';
    for (let day in weeklySchedule) {
        scheduleHTML += `<p>${day}: ${weeklySchedule[day]}</p>`;
    }
    document.getElementById('schedule').innerHTML = scheduleHTML;
}

// Function to add a workout
function addWorkout(day, workout) {
    if (day && workout) {
        weeklySchedule[day] = workout;
        updateLocalStorage(); // Update local storage
        displaySchedule(); // Display the updated schedule on the page
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
