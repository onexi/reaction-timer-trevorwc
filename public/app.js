let startTime, stopTime;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const statusText = document.getElementById("status");
const scoreForm = document.getElementById("scoreForm");
let colorChanged = false;
let colorChangeTimeout;
let gameOver = false;
let newSubmit = false;

startButton.style.backgroundColor = "green";

startButton.addEventListener("click", () => {
    startTime = null;
    stopTime = null;
    startButton.style.backgroundColor = "";
    startButton.disabled = true;
    stopButton.disabled = false;
    gameOver = false;
    statusText.textContent = "Wait for it...";
    const randomDelay = Math.random() * 19000 + 1000;
    colorChangeTimeout = setTimeout(() => {
        startTime = Date.now();
        statusText.textContent = "Go!";
        stopButton.style.backgroundColor = "red";  // Set stop button color to red
        colorChanged = true;
    }, randomDelay);
});

stopButton.addEventListener("click", () => {
    if(colorChanged){
        if (!gameOver) {
            stopTime = Date.now();
            gameOver = true // this indicates that the game has gone through one cycle
            stopButton.style.backgroundColor = "";
            startButton.style.backgroundColor = "green";
            const reactionTime = (stopTime - startTime) / 1000; // Time in seconds
            statusText.textContent = `Your reaction time: ${reactionTime} seconds. Submit or try again!`;
            newSubmit = true; // Give the ability to submit a (new) score
            startButton.disabled = false;
            stopButton.disabled = true;
            colorChanged = false;
            clearTimeout(colorChangeTimeout);
        }
    } else {
        stopButton.disabled = true;
        clearTimeout(colorChangeTimeout)
        stopButton.style.backgroundColor = "";
        cycleStatusText()
        setTimeout(resetGame, 2000);
    }
});

function cycleStatusText() {
    statusText.textContent = 'Starting over, wait for the color to change'
    let dotCount = 1;
    const interval = setInterval(() => {
        const dots = '.'.repeat(dotCount % 4); // Cycles through "", ".", "..", "..."
        statusText.textContent = `Starting over, wait for the color to change${dots}`;
        dotCount++;
        if (dotCount === 4) {
            clearInterval(interval); 
        }
    }, 500);
}

function resetGame() {
    // Function to reset the game if user clicks too early
    startButton.disabled = false;
    startButton.style.backgroundColor = "green";
    stopButton.disabled = true;
    statusText.textContent = "Wait for the color change!";
    colorChanged = false;  // Reset the color change flag
    gameOver = false;
    startTime = null;
    // Clear any pending color change timeout
    clearTimeout(colorChangeTimeout);
}


scoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const reactionTime = (stopTime - startTime) / 1000;
    if (reactionTime > 0 & newSubmit) { // Ensure reactionTime is valid
        try {
            newSubmit = false;
            const response = await fetch('/input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, time: reactionTime })
            });

            if (response.ok) {
                const users = await response.json();
                console.log(users); // Check updated user list
                fetchUsers(); // Fetch and display the updated user list
                document.getElementById("name").value = ''; // Clear the name input field
                resetGame()
            } else {
                console.error('Failed to submit data');
                resetGame()
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    } else {
        statusText.textContent = "Make a new attempt before submitting!";
    }
});

async function fetchUsers() {
    try {
        const response = await fetch('/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = ''; // Clear existing list
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.name}: ${user.time} seconds`;
        userList.appendChild(userItem);
    });
}