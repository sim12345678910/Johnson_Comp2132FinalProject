document.addEventListener('DOMContentLoaded', startGame);

function startGame()
{
    const player               = { score: 0 }; //starting score
    const computer             = { score: 0 };
    const maxRounds            = 3;
    let roundCount             = 1; // Start the round count from 1
    let playerRoundScore; 
    let computerRoundScore;
    const currentRoundDisplay  = document.getElementById('round-info');
    const playerDice1          = document.getElementById('player-dice1');
    const playerDice2          = document.getElementById('player-dice2');
    const computerDice1        = document.getElementById('computer-dice1');
    const computerDice2        = document.getElementById('computer-dice2');
    const playerScoreDisplay   = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resultDisplay        = document.getElementById('game-result');
    const rollButton           = document.getElementById('roll-btn');
    const resetButton          = document.getElementById('reset-btn');

    createAccordian();
    fadeInElements([playerDice1, playerDice2, computerDice1, computerDice2]);//fade in animation for dice

    rollButton.addEventListener('click', rollButtonClick);
    resetButton.addEventListener('click', resetGame);

    function createAccordian()
    {
        const acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () 
            {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                panel.style.display = (panel.style.display === "block") ? "none" : "block";
            });
        }
    }

    function rollButtonClick()
    {
        if (roundCount <= maxRounds) 
        {
            rollDice();
            updateCurrentRound();
            roundCount++;
        } 
        else 
        {
            endGame();
        }
    }

    function fadeInElements(elements) 
    {
        elements.forEach(element => 
            {
                element.style.opacity = 0;
                setTimeout(() => 
                {
                    element.style.transition = 'opacity 0.5s';
                    element.style.opacity = 1;
                }, 0);
            });
    }

    //roll dice for player and computer
    function rollDice() 
    {
        const playerRoll = [rollDie(), rollDie()];
        const computerRoll = [rollDie(), rollDie()];

        updateDice([playerDice1, playerDice2], playerRoll);
        updateDice([computerDice1, computerDice2], computerRoll);

        const playerScore = calculateScore(playerRoll);
        const computerScore = calculateScore(computerRoll);

        player.score += playerScore;
        computer.score += computerScore;

        playerRoundScore = playerScore; 
        computerRoundScore = computerScore; 

        console.log("Player Score:", player.score);
        console.log("Computer Score:", computer.score);

        updateScores(playerRoundScore, computerRoundScore);
    }

    //random die number generator
    function rollDie() 
    {
        return Math.floor(Math.random() * 6) + 1;
    }

    //updated displayed images
    function updateDice(diceElements, values) 
    {
        fadeInElements(diceElements);

        values.forEach((value, index) => 
        {
            const diceElement = diceElements[index];
            diceElement.src = `images/dice-${value}.png`;
            diceElement.alt = `Dice ${value}`;
        });
    }
    

    //calculate score depending on the dice roll
    function calculateScore(roll) 
    {
        if (roll.includes(1)) 
        {
            return 0;
        } 
        else if (roll[0] === roll[1]) 
        {
            return (roll[0] + roll[1]) * 2;
        } 
        else 
        {
            return roll[0] + roll[1];
        }
    }

    function updateScores(playerRoundScore, computerRoundScore) 
    {
        playerScoreDisplay.innerHTML = `
        <table>
            <tr>
                <td>Current Roll:</td>
                <td>${playerDice1.alt}, ${playerDice2.alt}</td>
            </tr>
            <tr>
                <td>Round Score:</td>
                <td>${playerRoundScore}</td>
            </tr>
            <tr>
                <td>Total Score:</td>
                <td>${player.score}</td>
            </tr>
        </table>
    `;

    computerScoreDisplay.innerHTML = `
        <table>
            <tr>
                <td>Current Roll:</td>
                <td>${computerDice1.alt}, ${computerDice2.alt}</td>
            </tr>
            <tr>
                <td>Round Score:</td>
                <td>${computerRoundScore}</td>
            </tr>
            <tr>
                <td>Total Score:</td>
                <td>${computer.score}</td>
            </tr>
        </table>
    `;

        if (roundCount >= maxRounds) {
          endGame();
        }
      }
      

    function updateCurrentRound() 
    {
        currentRoundDisplay.innerHTML = `<h3>ROUND: ${roundCount}</h3>`;
    }

    function endGame() 
    {
        const winner = player.score > computer.score ? 'Player' : 'Machine';
        const resultMessage = `${winner} wins!`;
        resultDisplay.textContent = resultMessage;
        currentRoundDisplay.textContent = ''; // Clear round info after game ends
    }

    function resetGame() 
    {
        fadeInElements([playerDice1, playerDice2, computerDice1, computerDice2]);
        player.score       = 0;
        computer.score     = 0; 
        roundCount         = 1; 
        playerRoundScore   = 0; 
        computerRoundScore = 0

        playerDice1.alt    = 'Dice 1';
        playerDice2.alt    = 'Dice 1';
        computerDice1.alt  = 'Dice 1';
        computerDice2.alt  = 'Dice 1';

        updateScores(playerRoundScore, computerRoundScore);
        updateDice([playerDice1, playerDice2], [1, 1]);
        updateDice([computerDice1, computerDice2], [1, 1]);
        resultDisplay.textContent = '';
        updateCurrentRound();
    }
};

