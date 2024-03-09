const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray) {
    this.field = fieldArray; // Holds the field array in a instance variable 
    this.playerX = 0; //stores coordinates for player x
    this.playerY = 0; //stores coordinates for player y
  }

//Method to clear the console after each move.
  clearConsole() {
    console.log('\x1Bc');
  }

  // Method to print the current field being used
  print () {
        
      this.clearConsole();

        for (let row = 0; row < this.field.length; row++) {
    let rowArray = this.field[row].slice(); // Create a copy of the row
    if (row === this.playerY) {
      // Replace the character at the player's position with '*'
      rowArray[this.playerX] = '*';
    }
    const rowString = rowArray.join('');
    console.log(rowString);
    }
  }



// Method to move the player around the field
  move(direction) {
    if (direction === 'w' && this.playerY > 0) {
       this.playerY--;
    } else if (direction === 's' && this.playerY < this.field.length - 1) {
      this.playerY++;
    } else if (direction === 'a' && this.playerX > 0) {
      this.playerX--;
    } else if (direction === 'd' && this.playerX < this.field[0].length - 1) {
      this.playerX++;
    } else {
      console.log('Invalid direction.')
      return;
    }

  if (this.field[this.playerY][this.playerX] === '^') {
        setTimeout(() => {
          this.resetGame();
        }, 2000);
        return;
    } else if (this.field[this.playerY][this.playerX] === 'O') {
        setTimeout(() => {
          this.resetGame();
        }, 2000);
        return;
    } 

    if (this.outOfBounds()) {
        setTimeout(() => {
          this.resetGame();
        }, 2000);
        return;
    }

    

    this.updateField();

  }

  //update to visualize the path for player.
  updateField(){
    this.field[this.playerY][this.playerX] = '*';
  }



// Method showing when player is either past the [row] / [col] index of the arrays.
  outOfBounds() {
    const numberOfRows = this.field.length;
    const numberOfCols = this.field[0].length;

    if (
      this.playerX < 0 ||
      this.playerX > numberOfCols ||
      this.playerY < 0 ||
      this.playerY > numberOfRows
    ) {
      return true;
    } else {
      return false;
    }
}
 

    resetGame() {
    this.playerX = 0;
    this.playerY = 0;
    this.developField();
}

isGameOver() {
    return (
    this.field[this.playerY][this.playerX] === 'O' || this.outOfBounds() === true
    );

}

isGameWon() {
    return this.field[this.playerY][this.playerX] === '^'; 

}



playerWonScoreBoard() {

}

 

//Define layout for field & setting player initial posistion.
  developField () {
    this.field = [
  ['*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░',],
];

  this.playerX = 0;
  this.playerY = 0;

  this.definingHatAndHoles();

  }




definingHatAndHoles () {
  const numberOfRows = this.field.length;
  const numberOfCols = this.field[0].length;

  // Random position for hat '^'
  const hatX = Math.floor(Math.random() * numberOfCols);
  const hatY = Math.floor(Math.random() * numberOfRows);

  // Random position for holes.
  const numHoles = 20;
  const holePositions = [];

  while (holePositions.length < numHoles) {
  const holeX = Math.floor(Math.random() * numberOfCols);
  const holeY = Math.floor(Math.random() * numberOfRows);

    if (holeX !== this.playerX || holeY !== this.playerY) {
      holePositions.push({ x: holeX, y: holeY });
    }
  }

  this.field[this.playerY][this.playerX] = '*';
  this.field[hatY][hatX] = '^';

  holePositions.forEach((holePosition) => {
    this.field[holePosition.y][holePosition.x] = 'O';
    });
  }

}

const initialField = new Field;


initialField.developField();

initialField.print();

function getUserInput(){
  rl.question('Just like any other game use these to move (w, s, a, d): ', (direction) => {
    if (direction === 'w' || direction === 's' || direction === 'a' || direction === 'd') {
    initialField.move(direction);
    initialField.print();

    if (initialField.isGameOver()) {
        console.log('Game over!');
        rl.close(); // Close the readline interface to exit the game
      } else if (initialField.isGameWon()) {
        console.log('Congratulations! You found the hat!');
        rl.close(); // Close the readline interface to exit the game
      } else {
        getUserInput(); 
      }

    } else {
      console.log('Invalid input. Please enter w, s, a , or d.');
      getUserInput();
    }



  });
}

getUserInput();
