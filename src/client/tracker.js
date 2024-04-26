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