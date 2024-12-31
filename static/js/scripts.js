// Get elements from the HTML
const betButton = document.getElementById('betButton');
const betNumberInput = document.getElementById('betNumber');
const resultText = document.getElementById('resultText');
const winningNumberText = document.getElementById('winningNumber');
const checkBalanceButton = document.getElementById('checkBalance');
const balanceText = document.getElementById('balance');

// Function to place a bet and get the roulette result
async function placeBet() {
    const betNumber = betNumberInput.value;
    
    // Validate bet number (0-36)
    if (betNumber < 0 || betNumber > 36 || isNaN(betNumber)) {
        alert('Please bet on a valid number between 0 and 36.');
        return;
    }
    
    // Disable the button while the request is in progress
    betButton.disabled = true;
    resultText.textContent = "Rolling the wheel...";

    try {
        // Send a request to the backend API (this will be the Telegram bot)
        const response = await fetch('/roulette', {  // Replace with actual URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bet: betNumber })
        });

        const result = await response.json();

        if (response.ok) {
            const winningNumber = result.winningNumber;
            const userBet = result.userBet;

            // Update the page with the result
            resultText.textContent = userBet === winningNumber ? "Congratulations, You Win!" : "Sorry, You Lost!";
            winningNumberText.textContent = `Winning Number: ${winningNumber}`;
        } else {
            // Show error message if the backend failed
            resultText.textContent = "Error occurred, please try again.";
            winningNumberText.textContent = "";
        }
    } catch (error) {
        resultText.textContent = "Network error, please try again.";
        winningNumberText.textContent = "";
    }

    // Re-enable the bet button
    betButton.disabled = false;
}

// Function to check balance (for now, assume it's static)
async function checkBalance() {
    // Simulate balance check (replace with real backend request)
    const response = await fetch('/balance');  // Replace with actual endpoint
    const data = await response.json();

    if (response.ok) {
        balanceText.textContent = `${data.balance} TON`;
    } else {
        alert('Failed to check balance.');
    }
}

// Add event listeners to buttons
betButton.addEventListener('click', placeBet);
checkBalanceButton.addEventListener('click', checkBalance);
