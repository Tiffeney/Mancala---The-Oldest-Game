const player1 = 'player1',
      player2 = 'player2'
      
let loopedCell,
    currentPlayer = player1,
    board = [
      { type: 'big',        numStones: 0, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player1  },
      { type: 'big',        numStones: 0, owner: player1  },
      { type: 'normal',     numStones: 4, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player2  },
      { type: 'normal',     numStones: 4, owner: player2  }
    ]

const playerCanDrop = (player, position) => {
  let cell = board[position]
  return !(cell.type == 'big' && cell.owner != player)
}

const go = (player, source) => {  
    let position = source;

    while(position <= 13) {
      let numSourceStones = board[source].numStones
      if (playerCanDrop(player, position) == false) {
        position++
      }

      if (numSourceStones > 0) {
        numSourceStones = numSourceStones - 1 // "pick up the stone"
        board[source].numStones = numSourceStones

        loopedCell = board[position] // "drop the stone"
        loopedCell.numStones++
      } else {
        return board
      }

      if (position == 13 && numSourceStones > 0) {
        position = 0
      } else {
        position++
      }
    }
}

const playerWon = (player) => {
  let numberOfCellsWithStones = 0

  board.forEach((cell) => {
    if (cell.owner === player && cell.numStones > 0 && cell.type != 'big') {
      numberOfCellsWithStones++;
    }
  })

  return numberOfCellsWithStones === 0
}

// POPULATE THE BOARD
const toggleCells = () => {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.classList.toggle("inactive")
    })
}

const determinePlayer = () => currentPlayer === player1 ? player2 : player1

const renderBoard = (board) => {
    board.forEach((cell, idx) => {
        let boardCell = document.getElementById(idx)
        boardCell.innerText = cell.numStones
    })

    if (loopedCell.type !== 'big') {
        currentPlayer = determinePlayer()
        toggleCells()
    }
 }

 const uiBoardCells = document.querySelectorAll('.cell')
 uiBoardCells.forEach((uiCell) => {
    let source = uiCell.getAttribute('id');
    uiCell.addEventListener('click', () => {
        go(currentPlayer, source)
        renderBoard(board)
        if (playerWon(currentPlayer)) {
            alert(currentPlayer + ' ' + 'won!')
        }
    })
 })

 renderBoard(board) 