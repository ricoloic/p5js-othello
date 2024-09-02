const PLAYERS = {
  white: 1,
  black: 2,
};

function Othello() {}

Othello.prototype.init = function () {
  this.player = PLAYERS.black;

  this.board = [];
  for (let x = 0; x < 8; x++) {
    this.board[x] = [];
    for (let y = 0; y < 8; y++) {
      this.board[x][y] = null;
    }
  }

  this.board[3][3] = PLAYERS.white;
  this.board[4][3] = PLAYERS.black;
  this.board[4][4] = PLAYERS.white;
  this.board[3][4] = PLAYERS.black;
};

Othello.prototype.available = function () {
  const list = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (this.board[x][y] !== null) continue;

      const spots = this.between(x, y);
      if (spots.length === 0) continue;

      list.push({ x, y });
    }
  }
  return list;
};

Othello.prototype.select = function (x, y) {
  if (this.board[x][y] !== null) return;

  const spots = this.between(x, y);
  if (spots.length === 0) return;

  for (const spot of spots) {
    this.board[spot.x][spot.y] = this.player;
  }
  this.board[x][y] = this.player;

  if (this.player === PLAYERS.white) {
    this.player = PLAYERS.black;
  } else {
    this.player = PLAYERS.white;
  }
};

Othello.prototype.between = function (x, y) {
  if (this.board[x][y] !== null) return [];

  let spots = [];
  let temp = [];
  let connected = false;
  let ox = x;
  let oy = y;

  const reset = () => {
    temp = [];
    connected = false;
    ox = x;
    oy = y;
  };

  const spotting = () => {
    if (ox === 8 || ox === -1 || oy === 8 || oy === -1) return false;
    const spot = this.board[ox][oy];
    if (spot === null) return false;
    if (spot === this.player) {
      connected = true;
      return false;
    }
    temp.push({ x: ox, y: oy });
    return true;
  };

  // horizontal right
  while (true) {
    ox++;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // horizontal left
  while (true) {
    ox--;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // vertical bottom
  while (true) {
    oy++;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // vertical top
  while (true) {
    oy--;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // diagonal top right
  while (true) {
    ox++;
    oy--;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // diagonal top left
  while (true) {
    ox--;
    oy--;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // diagonal bottom right
  while (true) {
    ox++;
    oy++;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  // diagonal bottom left
  while (true) {
    ox--;
    oy++;
    if (!spotting()) break;
  }
  if (connected) spots = spots.concat(temp);
  reset();

  return spots;
};
