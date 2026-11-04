// Game State (exactly matching C++ logic)
class CricketGame {
    constructor() {
        this.human = { name: '', runs: 0, wickets: 0 };
        this.computer = { name: 'Computer', runs: 0, wickets: 0 };
        this.humanBatsFirst = false;
        this.gamePhase = 'auth'; // auth, toss, instructions, playing, result
        this.currentInnings = 1;
        this.isHumanBatting = false;
        this.totalRuns = 0;
        this.totalWickets = 0;
        this.ballsBowled = 0;
        this.target = Infinity;
        this.userCredentials = JSON.parse(localStorage.getItem('cricketUsers') || '{}');
        this.currentUser = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.gamePhase === 'playing') {
                    this.handleUserChoice(parseInt(e.target.dataset.num));
                }
            });
        });
    }

    handleLogin() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        if (this.userCredentials[username] === password) {
            this.startGame(username);
        } else {
            alert('❌ Invalid credentials!');
        }
    }

    handleSignup() {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        
        if (this.userCredentials[username]) {
            alert('❌ Username already exists!');
            return;
        }
        
        this.userCredentials[username] = password;
        localStorage.setItem('cricketUsers', JSON.stringify(this.userCredentials));
        this.startGame(username);
    }

    startGame(username) {
        this.currentUser = username;
        this.human.name = username;
        document.getElementById('humanName').textContent = username;
        document.getElementById('authModal').classList.remove('active');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.gamePhase = 'toss';
        this.showSection('tossSection');
    }

    selectToss(choice) {
        const tossResult = Math.floor(Math.random() * 2); // 0 = heads, 1 = tails
        const userWon = (tossResult === 0 && choice === 'heads') || 
                       (tossResult === 1 && choice === 'tails');
        
        document.getElementById('coin').style.animation = 'none';
        
        setTimeout(() => {
            if (userWon) {
                this.humanBatsFirst = confirm('You won the toss! Do you want to bat first?');
            } else {
                this.humanBatsFirst = Math.random() > 0.5;
                alert(`Computer won the toss and chose to ${this.humanBatsFirst ? 'bowl first' : 'bat first'}`);
            }
            
            this.showInstructions();
        }, 1500);
    }

    showInstructions() {
        this.gamePhase = 'instructions';
        this.showSection('instructionsSection');
        document.getElementById('matchInfo').textContent = 
            `Match: ${this.human.name} vs Computer | Innings 1`;
    }

    startFirstInnings() {
        this.resetInnings();
        this.isHumanBatting = this.humanBatsFirst;
        this.gamePhase = 'playing';
        this.currentInnings = 1;
        this.showSection('playSection');
        this.updateBatsmanBowlerDisplay();
        document.getElementById('matchInfo').textContent = 'First Innings';
    }

    startSecondInnings(firstInningsRuns) {
        this.resetInnings();
        this.isHumanBatting = !this.humanBatsFirst;
        this.gamePhase = 'playing';
        this.currentInnings = 2;
        this.target = firstInningsRuns + 1;
        this.showSection('playSection');
        this.updateBatsmanBowlerDisplay();
        document.getElementById('matchInfo').textContent = `Second Innings | Target: ${this.target}`;
    }

    resetInnings() {
        this.totalRuns = 0;
        this.totalWickets = 0;
        this.ballsBowled = 0;
    }

    handleUserChoice(userChoice) {
        const compChoice = Math.floor(Math.random() * 6) + 1;
        
        // Animate ball
        this.animateBall();
        
        setTimeout(() => {
            const resultDiv = document.getElementById('resultDisplay');
            resultDiv.className = 'result-display';
            resultDiv.innerHTML = `
                <div>🧍‍♂️ Your choice: ${userChoice} | 🤖 ${this.isHumanBatting ? 'Comp' : 'Your'} choice: ${compChoice}</div>
            `;
            resultDiv.classList.remove('hidden');

            if (userChoice === compChoice) {
                // Wicket!
                this.totalWickets++;
                resultDiv.innerHTML += '<div style="color: #FF6B6B; font-size: 1.5rem; font-weight: bold;">🎯 WICKET!</div>';
                resultDiv.classList.add('wicket');
                
                if (this.isHumanBatting) {
                    this.human.wickets++;
                } else {
                    this.computer.wickets++;
                }
            } else {
                // Runs
                this.totalRuns += userChoice;
                resultDiv.innerHTML += `<div style="color: #4ECDC4; font-size: 1.5rem; font-weight: bold;">+${userChoice} RUNS!</div>`;
                resultDiv.classList.add('runs');
                
                if (this.isHumanBatting) {
                    this.human.runs += userChoice;
                } else {
                    this.computer.runs += compChoice;
                }
            }

            this.ballsBowled++;
            this.updateDisplay();

            if (this.isInningsOver()) {
                setTimeout(() => this.endInnings(), 2000);
            } else {
                setTimeout(() => {
                    resultDiv.classList.add('hidden');
                    if (!this.isHumanBatting) {
                        // Computer's turn to choose when human is bowling
                        setTimeout(() => this.handleComputerBattingTurn(), 1000);
                    }
                }, 2000);
            }
        }, 800);
    }

    handleComputerBattingTurn() {
        const compChoice = Math.floor(Math.random() * 6) + 1;
        const userChoice = parseInt(prompt('Computer is batting! Choose your bowling number (1-6):'));
        
        if (!userChoice || userChoice < 1 || userChoice > 6) {
            alert('Please choose 1-6!');
            return this.handleComputerBattingTurn();
        }
        
        this.handleUserChoice(userChoice); // Reuse the same logic
    }

    animateBall() {
        const ball = document.getElementById('ballAnim');
        ball.style.display = 'block';
        setTimeout(() => ball.style.display = 'none', 1000);
    }

    updateBatsmanBowlerDisplay() {
        document.getElementById('batsmanStatus').textContent = 
            this.isHumanBatting ? `🧍‍♂️ ${this.human.name} Batting` : '🤖 Computer Batting';
        document.getElementById('bowlerStatus').textContent = 
            this.isHumanBatting ? '🤖 Computer Bowling' : `🥎 ${this.human.name} Bowling`;
    }

    updateDisplay() {
        document.getElementById('humanScore').textContent = `${this.human.runs}/${this.human.wickets}`;
        document.getElementById('computerScore').textContent = `${this.computer.runs}/${this.computer.wickets}`;
        document.getElementById('currentRuns').textContent = this.totalRuns;
        document.getElementById('currentWickets').textContent = this.totalWickets;
        document.getElementById('ballsBowled').textContent = this.ballsBowled;
    }

    isInningsOver() {
        return this.totalWickets >= 2 || this.ballsBowled >= 12 || 
               (this.currentInnings === 2 && this.totalRuns >= this.target);
    }

    endInnings() {
        if (this.currentInnings === 1) {
            alert(`First Innings Over!\n${this.isHumanBatting ? this.human.name : 'Computer'}: ${this.totalRuns}/${this.totalWickets}`);
            setTimeout(() => this.startSecondInnings(this.totalRuns), 1000);
        } else {
            this.showResult();
        }
    }

    showResult() {
        this.gamePhase = 'result';
        this.showSection('resultSection');
        
        let resultText = `
            <h2>🏆 MATCH RESULT 🏆</h2>
            <div style="margin: 20px 0;">
                <div>First Innings: ${this.humanBatsFirst ? this.human.runs : this.computer.runs}/${this.humanBatsFirst ? this.human.wickets : this.computer.wickets}</div>
                <div>Second Innings: ${this.humanBatsFirst ? this.computer.runs : this.human.runs}/${this.humanBatsFirst ? this.computer.wickets : this.human.wickets}</div>
            </div>
        `;

        const firstInningsRuns = this.humanBatsFirst ? this.human.runs : this.computer.runs;
        const secondInningsRuns = this.humanBatsFirst ? this.computer.runs : this.human.runs;

        if (this.humanBatsFirst) {
            if (secondInningsRuns >= firstInningsRuns + 1) {
                resultText += '<div style="color: #FF6B6B; font-size: 2rem;">🤖 Computer WINS!</div>';
            } else {
                resultText += '<div style="color: #4ECDC4; font-size: 2rem;">👤 You WIN!</div>';
            }
        } else {
            if (secondInningsRuns >= firstInningsRuns + 1) {
                resultText += '<div style="color: #4ECDC4; font-size: 2rem;">👤 You WIN!</div>';
            } else {
                resultText += '<div style="color: #FF6B6B; font-size: 2rem;">🤖 Computer WINS!</div>';
            }
        }

        document.getElementById('finalResult').innerHTML = resultText;
    }

    showSection(sectionId) {
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }
}

// Global game instance
const game = new CricketGame();

// Utility functions
function switchTab(tab) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tab + 'Form').classList.add('active');
    event.target.classList.add('active');
}

function startFirstInnings() {
    game.startFirstInnings();
}

function selectToss(choice) {
    game.selectToss(choice);
}

function restartGame() {
    location.reload();
}