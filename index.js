const Game = (function() {
    //query selectors
    const player1 = document.querySelector('.player_name-1');
    const player2 = document.querySelector('.player_name-2');
    const results = document.querySelector('.results')


    const gameBoard = {
        board: new Array(9),
        moves: [],
        winner: false
    }

    const generatePlayer = () => {
        return {
            score: 0,
            winner: false
        }
    }

    const playerObject1 = generatePlayer();
    const playerObject2 = generatePlayer();

    const play = document.querySelector('.button_play')
    play.addEventListener('click', () => {
        reset()
        playerObject1.name = prompt('What is player 1\'s name?');
        playerObject2.name = prompt('What is player 2\'s name?')

        player1.innerText = playerObject1.name;
        player2.innerText = playerObject2.name;

    })

    let currentPlayer = 'X';

    const createMark = function(e) {
        if(gameBoard.winner === true){
            alert('Please click reset')
            return
        }
        if(gameBoard.moves.length === 9){
            alert('Tie game! Please reset!')
            return;
        }
        if(!playerObject1.name || !playerObject2.name){
            alert('Please click play and insert names')
            return
        }
        if(!e.target.innerText){
            e.target.closest('.box').innerText = `${currentPlayer}`;
            let currentSquare= e.target.className.slice(-1)
            _insertMove(currentSquare)
            checkMoves()
            currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
        }
    }

    document.addEventListener('click', (e) => {
        if(e.target.closest('.box')){
            createMark(e);
        }
    })

    checkMoves = function(){
        const indicies = []
        // current player is the element seraching for
        let idx = gameBoard.board.indexOf(currentPlayer);
        while(idx != -1){
            indicies.push(idx)
            idx = gameBoard.board.indexOf(currentPlayer, idx + 1)
        }
        checkWinner(indicies)
    }

    checkWinner = function(arr){
        const winningCombo = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [2,4,6],
            [2,5,8],
            [1,4,7],
            [6,7,8],
            [3,4,5],
        ]
        for(i=0; i < winningCombo.length; i++){
            if(winningCombo[i].every(square=> arr.includes(square) === true)){
                let winningPlayer = currentPlayer === 'X'? playerObject1.name : playerObject2.name
                gameBoard.winner = true;
                results.innerHTML = `<div>Results: The winner is ${winningPlayer}</div`
                console.log(`The winning player is ${winningPlayer}`)
                break;
            }
            if(gameBoard.winner === false && gameBoard.moves.length === 9){
                results.innerHTML = '<div>There is a tie!</div>'
                return;
            }
        }
    }

    const _insertMove = function(square){
        gameBoard.moves.push(null)
        gameBoard.board[square] = currentPlayer
    }

    const resetButton = document.querySelector('.button_reset')
        resetButton.addEventListener('click', (e) => {
        reset()
    })

    const reset = () => {
        currentPlayer = 'X'
        boxes = document.querySelectorAll('.box')
        boxes.forEach(box => {
            box.innerText = ''
        });
        gameBoard.winner = false;
        gameBoard.moves = []
        gameBoard.board = new Array(9)
        results.innerHTML = '<div>Results:</div>';
    }


})();

