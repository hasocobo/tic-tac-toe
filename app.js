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

    let activePlayer = playerOne;

    const play = (row, column) => {
        console.log("Playing round 1");

        GameBoard.board[row-1][column-1].changeValue(activePlayer.getSign());
        GameBoard.showValues();
    }

    return {
        play
    };
})();

GameController.play(1,1);
GameController.play(1,3);
GameController.play(3,3);
GameController.play(2,3);
GameController.play(1,2);
GameController.play(3,2);
GameBoard.showValues();
