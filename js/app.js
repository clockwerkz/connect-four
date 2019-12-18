const grid = document.querySelector('.grid');
const gameGrid = [
  [0, 0, 0, 0 ],
  [0, 0, 0, 0 ],
  [0, 0, 0, 0 ],
  [0, 0, 0, 0 ],
  [0, 0, 0, 0 ]
];

columnPtr = [0, 0, 0, 0, 0]; //Keeps track of the "height" of each column

grid.addEventListener('click', (e)=>{
  let index  = parseInt(e.target.dataset.value);
  dropNewChip('red', index, e.target);
  let rnd = Math.floor(Math.random()*5);
  let column = document.querySelector(`#col-${rnd+1}`);
  dropNewChip('yellow', rnd, column);
})

function dropNewChip(color, index, column) {
  let chip = document.createElement('div');
  chip.classList.add('chip',`chip--${color}`);
  column.prepend(chip);
  let y = columnPtr[index]++;
  gameGrid[index][y] = color;
  console.log(checkForWin(color));
}


function checkForWin(plyr) {
  //check Horizontally
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i][j+1] === plyr && gameGrid[i][j+2] === plyr && gameGrid[i][j+3] === plyr ) {
        console.log('horizontal',i, j);
        return true;
      }
    }
  }
  //check Vertically
  for (let i = 0; i < gameGrid.length-3; i++) {
    for (let j=0; j < gameGrid[i].length; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i+1][j] === plyr && gameGrid[i+2][j] === plyr && gameGrid[i+3][j] === plyr ) {
        console.log('vertical', i, j);
        return true;
      }
    }
  }

  //upward slope
  for (let i = gameGrid.length-1; i > 2; i--) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i-1][j+1] === plyr && gameGrid[i-2][j+2] === plyr && gameGrid[i-3][j+3] === plyr ) {
        console.log('upward slope', i, j);
        return true;
      }
    }
  }

  //downward slope
  for (let i = 0; i < gameGrid.length-3; i++) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i+1][j+1] === plyr && gameGrid[i+2][j+2] === plyr && gameGrid[i+3][j+3] === plyr ) {
        console.log('downward slope', i, j);
        return true;
      }
    }
  }
  return false;
}


