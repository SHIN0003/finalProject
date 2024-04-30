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
    return data;
}


document.getElementById('save-btn').addEventListener('click', function() {
    //use backened to save data
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