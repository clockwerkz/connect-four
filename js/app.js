const grid = document.querySelector('.grid');
const gameGrid = new Array(5);
for (let i=0; i<gameGrid.length; i++) {
  gameGrid[i] = [];
}

grid.addEventListener('click', (e)=>{
  let index  = parseInt(e.target.dataset.value);
  dropNewChip('red', index, e.target);
  let rnd = Math.floor(Math.random()*5);
  console.log(rnd);
  let column_pos = rnd+1;
  let column = document.querySelector(`#col-${column_pos}`);
  //dropNewChip('yellow', rnd, column);
})

function dropNewChip(color, index, column) {
  let chip = document.createElement('div');
  chip.classList.add('chip',`chip--${color}`);
  column.prepend(chip);
  let y = gameGrid[index].length;
  gameGrid[index][y] = color;
  console.log(checkForWin(color,index, y));
}


function checkForWin(color, x, y) {
  debugger;
  let colorCount = 0;
  let ptrX = x;
  let ptrY = y;
  
  //Check from left to right
  while (gameGrid[ptrX][ptrY] === color && ptrX<gameGrid.length) {
    colorCount+=1;
    ptrX+=1;
  }
  console.log('colorCount when adding', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
  colorCount = 0;
  ptrX = x;
  //Check from right to left
  while (gameGrid[ptrX][ptrY] === color && ptrX>=0) {
    colorCount+=1;
    ptrX-=1;
  }
  console.log('colorCount when subtracting', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
  colorCount = 0;
  ptrX = x;
   //Check from bottom to top
  while (gameGrid[ptrX][ptrY] === color && ptrY>=0) {
    colorCount+=1;
    ptrY-=1;
  }
  console.log('colorCount when going from top to bottom', colorCount);
  if (colorCount === 4) {
     return true;
    //game over
  }
  ptrX= x;
  ptrY = y;
  colorCount=0;
  //Check diagonally left to right up direction
  while (gameGrid[ptrX][ptrY] === color && ptrX<gameGrid.length && ptrY<gameGrid[ptrX].length) {
    colorCount+=1;
    ptrX+=1;
    ptrY+=1;
  }
  console.log('colorCount when diagonally adding upward', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
  ptrX= x;
  ptrY = y;
  colorCount=0;
  //Check diagonally left to right down direction
  while (gameGrid[ptrX][ptrY] === color && ptrX<gameGrid.length && ptrY>=0) {
    colorCount+=1;
    ptrX+=1;
    ptrY-=1;
  }
  console.log('colorCount when diagonally adding downward', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
  ptrX= x;
  ptrY = y;
  colorCount=0;
  //Check diagonally right to left downward
  while (gameGrid[ptrX][ptrY] === color && ptrX>=0 && ptrY>=0) {
    colorCount+=1;
    ptrX-=1;
    ptrY-=1;
  }
  console.log('colorCount when diagonally down subtracting', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
  ptrX= x;
  ptrY = y;
  colorCount=0;
  //Check diagonally right to left upward
  while (gameGrid[ptrX][ptrY] === color && ptrX>=0 && ptrY<gameGrid[ptrX].length) {
    colorCount+=1;
    ptrX-=1;
    ptrY+=1;
  }
  //console.log('colorCount when diagonally up subtracting', colorCount);
  if (colorCount === 4) {
      return true;
    //game over
  }
}

