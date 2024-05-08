document.getElementById('plus-btn').addEventListener('click', function() {
    let count = parseInt(document.getElementById('count').innerHTML);
    document.getElementById('count').innerHTML = count + 1;
});

document.getElementById('minus-btn').addEventListener('click', function() {
    let count = parseInt(document.getElementById('count').innerHTML);
    if (count === 1) {
        return;
    }
    document.getElementById('count').innerHTML = count - 1;
});

async function saveHabit(habit) {
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

    const data = await response.json();
    //refresh the list of habits
    const container = document.querySelector('.current-habits-list');
    container.innerHTML = ''; // Clear existing contents
    await getHabits();
    return data;
}

async function completeHabit(id) {
    const response = await fetch(`http://localhost:3001/complete-habit/${id}`, {
        method: 'PUT'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function deleteHabit(id) {
    const response = await fetch(`http://localhost:3001/delete-habit/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const container = document.querySelector('.current-habits-list');
    container.innerHTML = ''; // Clear existing contents
    getHabits();
    return data;
}

async function getHabits() {
    try {
        const response = await fetch('http://localhost:3001/get-habits');
        const habits = await response.json();
        const container = document.querySelector('.current-habits-list');
        container.innerHTML = ''; // Clear existing contents

        habits.forEach(habit => {
            container.innerHTML += `
                <div class="habit">
                    <div class="habit-text">
                        <h3>${habit.habitName}</h3>
                        <p>Frequency: ${habit.count || 'No description provided'}</p>
                    </div>
                    <div class="habit-buttons">
                        <button class="complete-button" onclick="completeHabit('${habit._id}')">Complete</button>
                        <button class="delete-button" onclick="deleteHabit('${habit._id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Failed to fetch habits:', error);
    }
}

document.addEventListener('DOMContentLoaded', getHabits);

document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('habit-name').value = '';
    document.getElementById('category').value = '';
    document.getElementById('count').innerHTML = 1;
});
    

document.getElementById('save-btn').addEventListener('click', function() {
    //use backened to save data
    if (!document.getElementById('habit-name').value) {
        alert('Please enter a habit name');
        return;
    }
    if (!document.getElementById('category').value) {
        alert('Please enter a category');
        return;
    }
    let habitName = document.getElementById('habit-name').value;
    let category = document.getElementById('category').value;
    let count = parseInt(document.getElementById('count').innerHTML);
    let habit = {
        habitName,
        category,
        count
    };
    saveHabit(habit).then((response) => {
        console.log(response);
    });
});


