let round = 1;

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
            /*element.forEach(cell => {
                console.log("")
                console.log(cell.getValue());
            })*/
        });
    }

    return {
        board,
        showValues
    }
})();

function Cell(sign = "-") {
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
                checkWinCondition();
            }

            else {
                console.log("This cell is already occupied! Try Again.");
            }
        }
        
        else {
            console.log("You can't play! Game is already over!");
        }


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

        //check vertically    
        if (GameBoard.board.every(row => row[0].getValue() === GameBoard.board[0][0].getValue() && GameBoard.board[0][0].getValue() !== "-")){
            isOver = true;
            winner = GameBoard.board[0][0].getValue() === "X" ? playerOne : playerTwo;
        }
        else if (GameBoard.board.every(row => row[1].getValue() === GameBoard.board[0][1].getValue() && GameBoard.board[0][1].getValue() !== "-")){
            isOver = true;
            winner = GameBoard.board[0][1].getValue() === "X" ? playerOne : playerTwo;
        }
        else if (GameBoard.board.every(row => row[2].getValue() === GameBoard.board[0][2].getValue() && GameBoard.board[0][2].getValue() !== "-")){
            isOver = true;
            winner = GameBoard.board[0][2].getValue() === "X" ? playerOne : playerTwo;
        }

        if(isOver) console.log(`Game is over! Winner is ${winner.getName()}`);
    } 

    return {
        play,
        checkWinCondition
    };
})();

GameController.play(1,1);
GameController.play(1,2);
GameController.play(3,1);
GameController.play(3,3);
GameController.play(2,1);
GameController.play(3,2);