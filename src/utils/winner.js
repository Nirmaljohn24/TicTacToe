export const checkWinner = (board) => {

    const lines = [
        [0, 1, 2], //Top Row
        [3, 4, 5], //Middle Row
        [6, 7, 8], // Bottom Row

        [0, 3, 6],  // Left Column 
        [1, 4, 7], // Middle Column
        [2, 5, 8],  //Right Column

        [0, 4, 8], //Top-left to bottom-right diagonal
        [2, 4, 6] //Top-right to bottom-left diagonal
    ];

    // Loop through eacgh possible winning

    for (let line of lines) {
        const [a, b, c] = line;

        //Check if
        //1.There's something in board[a] (not null)
        //2. board[a] == board[b]
        //3. board[a] == board[c]

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line }
        }
    };

    //If no winner but all cells are filled, its a draw

    if (board.every(cell => cell !== null)) {
        return { winner: "Draw", line: [] }
    };

    //If no winner and the board is not full yet, return null (game continues)

    return null;
}