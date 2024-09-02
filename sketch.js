const othello = new Othello();

let scl;

function drawBoard() {
  background('darkgreen');

  stroke(255);
  for (let i = 1; i < 8; i++) {
    line(i * scl, 0, i * scl, height); // vertical
    line(0, i * scl, width, i * scl); // horizontal
  }

  noStroke();
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (othello.board[x][y] === null) continue;

      if (othello.board[x][y] === PLAYERS.white) {
        fill(255);
      } else {
        fill(0);
      }
      circle(x * scl + scl / 2, y * scl + scl / 2, scl - 20);
    }
  }

  const spots = othello.available();
  for (const { x, y } of spots) {
    if (othello.player === PLAYERS.white) {
      fill(255, 100);
    } else {
      fill(0, 100);
    }
    circle(x * scl + scl / 2, y * scl + scl / 2, scl - 20);
  }
}

function mousePressed() {
  const x = floor(mouseX / scl);
  const y = floor(mouseY / scl);

  console.log(x, y);
  if (x < 0 || x > 7 || y < 0 || y > 7) return;

  othello.select(x, y);
  drawBoard();
}

function setup() {
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.remove();
  createCanvas(800, 800);
  scl = width / 8;

  othello.init();

  drawBoard();
}
