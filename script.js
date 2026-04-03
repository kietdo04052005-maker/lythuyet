const board = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');
const resetBtn = document.getElementById('reset-btn');

let cards = ['🍎', '🍌', '🍇', '🍒', '🍎', '🍌', '🍇', '🍒'];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let canClick = true;

function initGame() {
    board.innerHTML = '';
    moves = 0;
    matchedCount = 0;
    moveDisplay.textContent = moves;
    flippedCards = [];
    canClick = true;

    // Shuffle cards
    const shuffled = cards.sort(() => Math.random() - 0.5);

    shuffled.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="card-back">?</div>
            <div class="card-front">${symbol}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (!canClick || this.classList.contains('flip') || flippedCards.includes(this)) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        moveDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    canClick = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCount += 2;
        flippedCards = [];
        canClick = true;
        if (matchedCount === cards.length) {
            setTimeout(() => alert(`Chúc mừng! Bạn thắng sau ${moves} lượt.`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
            canClick = true;
        }, 1000);
    }
}

resetBtn.addEventListener('click', initGame);
initGame();