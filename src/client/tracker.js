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
    fetch('/save-habit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(habit)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });
});