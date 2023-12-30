let round = 1;

const ScreenManager = (function() {
    const domCells = document.querySelectorAll('.cell');
    let resultText,
        resetButton;

    for(let i = 0; i < domCells.length; i++){
        let row = Math.floor(i / 3) + 1;
        let column = i % 3 + 1;

        domCells[i].addEventListener('click', () => {
            console.log(`clicked ${row} ${column}`);  
            GameController.play(row, column);
        })
    }

    const displayValues = () => {
        for (let i = 0; i < GameBoard.getRowSize(); i++) {
            for (let j = 0; j < GameBoard.getColumnSize(); j++) {
                let index = i * 3 + j;
                domCells[index].textContent = GameBoard.getCell(i, j).getValue();
            }
        }
    }

    const declareResult = (result) => {
        resultText = document.querySelector('.result-text');
        resultText.textContent = result;
    }

    const addGameOverButton = () => {
        const pageContainer = document.querySelector('.page-container');
        resetButton = document.createElement('button');
        resetButton.textContent = "Restart Game";
        resetButton.classList.add('restart-button');
        pageContainer.appendChild(resetButton);

        resetButton.addEventListener('click', () => {
            resetGameScreen();
        })

    }

    const resetGameScreen = () => {
        GameController.resetGame();
        resetButton.remove();
        resultText.textContent = "";
    }

    return {
        displayValues,
        declareResult,
        addGameOverButton
    }
}
)();



const GameBoard = (function() {
    const rows = 3;
    const columns = 3;
    
    const board = [];
    
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    
    const showValues = () => {
        board.forEach(element => {
            console.log(element[0].getValue(), element[1].getValue(), element[2].getValue());
        });
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                board[i][j].changeValue("");
            }
        }
    }

    const getRowSize = () => rows;
    const getColumnSize = () => columns;

    const getCell = (row, column) => board[row][column];

    return {
        board,
        showValues,
        getRowSize,
        getColumnSize,
        getCell,
        resetBoard
    }
})();

function Cell(sign = "") {
    let value = sign;

    const getValue = () => value;
    const changeValue = (newValue) => {value = newValue};

    return {
        getValue,
        changeValue
    }
}

function Player(name, sign) {
    let playerName = name;
    let playerSign = sign;

    const getName = () => playerName;
    const getSign = () => playerSign;

    return {
        getName,
        getSign
    }
}


const GameController = (function() {
    const playerOne = Player("Hasan", "X");
    const playerTwo = Player("Recep", "O");
    let isOver;

    let activePlayer = playerOne;

    const play = (row, column) => {
        console.log(`Playing round ${round++}. ${activePlayer.getName()}'s (${activePlayer.getSign()}) round:`);
        if(!isOver){
            
            if (GameBoard.board[row-1][column-1].getValue() !== "X" && GameBoard.board[row-1][column-1].getValue() !== "O") {
                GameBoard.board[row-1][column-1].changeValue(activePlayer.getSign());
                GameBoard.showValues();
                activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
                ScreenManager.displayValues();
                checkWinCondition();
            }

            else {
                console.log("This cell is already occupied! Try Again.");
                ScreenManager.declareResult("This cell is already occupied! Try Again.");
            }
        }
        
        else {
            console.log("You can't play! Game is already over!");
            ScreenManager.declareResult("You can't play! Game is already over!");
        }


    }

    const resetGame = () => {
        GameBoard.resetBoard();
        checkWinCondition();
        ScreenManager.displayValues();
        round = 1;
    }

    const checkWinCondition = () => {
        isOver = false;
        let winner;


        //check horizontally
        GameBoard.board.forEach(element => {
            if ((element[0].getValue() === "X" || element[0].getValue() === "O")
                 && element[0].getValue() === element[1].getValue()
                  && element[0].getValue() === element[2].getValue()){
                isOver = true;
                winner = element[0].getValue() === "X" ? playerOne : playerTwo;
            }
        })

        //check diagonally
        if ((GameBoard.board[0][0].getValue() === "X" || GameBoard.board[0][0].getValue() === "O")
             && GameBoard.board[0][0].getValue() === GameBoard.board[1][1].getValue() 
                && GameBoard.board[0][0].getValue() === GameBoard.board[2][2].getValue()) {
            isOver = true;
            winner = GameBoard.board[0][0].getValue() === "X" ? playerOne : playerTwo;
            }
        else if ((GameBoard.board[0][2].getValue() === "X" || GameBoard.board[0][2].getValue() === "O")
             && GameBoard.board[0][2].getValue() === GameBoard.board[1][1].getValue() 
                && GameBoard.board[0][2].getValue() === GameBoard.board[2][0].getValue()) {
            isOver = true;
            winner = GameBoard.board[0][2].getValue() === "X" ? playerOne : playerTwo;
            }

        //check vertically    
        if (GameBoard.board.every(row => row[0].getValue() === GameBoard.board[0][0].getValue() && GameBoard.board[0][0].getValue() !== "")){
            isOver = true;
            winner = GameBoard.board[0][0].getValue() === "X" ? playerOne : playerTwo;
        }
        else if (GameBoard.board.every(row => row[1].getValue() === GameBoard.board[0][1].getValue() && GameBoard.board[0][1].getValue() !== "")){
            isOver = true;
            winner = GameBoard.board[0][1].getValue() === "X" ? playerOne : playerTwo;
        }
        else if (GameBoard.board.every(row => row[2].getValue() === GameBoard.board[0][2].getValue() && GameBoard.board[0][2].getValue() !== "")){
            isOver = true;
            winner = GameBoard.board[0][2].getValue() === "X" ? playerOne : playerTwo;
        }

        if(isOver) console.log(`Oyun bitti! Kazanan ${winner.getName()}!`);

        if(isOver) {
            ScreenManager.declareResult(`Oyun bitti! Kazanan ${winner.getName()}!`);
            ScreenManager.addGameOverButton();
        }
            
    } 

    return {
        play,
        checkWinCondition,
        resetGame
    };
})();
