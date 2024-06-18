let pacman = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];

let inky = [
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0],
  [0, 0, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 0, 0],
  [0, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 0],
  [0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0],
  [0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0],
  [0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0],
  [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0]
];

let pixelSize = 7;
let pacmanSize = 100;
let numCircles = 10;
let circleSize = 50;
let circleSpacing = 50;
let character = pacman;
let grid = [];

function setup() {
  createCanvas(500, 500);
  noStroke();

  // Initialize the grid with circles
  for (let i = 0; i < numCircles; i++) {
    grid[i] = [];
    for (let j = 0; j < numCircles; j++) {
      grid[i][j] = true; // true means the circle is present
    }
  }
}

function draw() {
  background(0);

  // Draw the circles
  fill(255, 182, 193);
  for (let i = 0; i < numCircles; i++) {
    for (let j = 0; j < numCircles; j++) {
      if (grid[i][j]) {
        ellipse(i * circleSpacing + circleSize / 2, j * circleSpacing + circleSize / 2, circleSize);
      }
    }
  }

  // Draw the character following the mouse
  let pacmanX = constrain(mouseX - pacmanSize / 2, 0, width - pacmanSize);
  let pacmanY = constrain(mouseY - pacmanSize / 2, 0, height - pacmanSize);

  for (let y = 0; y < character.length; y++) {
    for (let x = 0; x < character[y].length; x++) {
      if (character[y][x] == 1) {
        fill(255, 255, 0); // Pacman color (yellow)
      } else if (character[y][x] == 2) {
        fill(0, 255, 255); // Inky body color (cyan)
      } else if (character[y][x] == 3) {
        fill(255); // Inky eye white
      } else if (character[y][x] == 4) {
        fill(0, 0, 255); // Inky eye pupil
      } else {
        fill(0); // Background color (black)
      }
      rect(pacmanX + x * pixelSize, pacmanY + y * pixelSize, pixelSize, pixelSize);
    }
  }

  // Check for eating circles
  for (let i = 0; i < numCircles; i++) {
    for (let j = 0; j < numCircles; j++) {
      let circleX = i * circleSpacing + circleSize / 2;
      let circleY = j * circleSpacing + circleSize / 2;
      if (dist(pacmanX + pacmanSize / 2, pacmanY + pacmanSize / 2, circleX, circleY) < circleSize / 2 + pacmanSize / 2) {
        grid[i][j] = false; // Pacman eats the circle
      }
    }
  }
}

function mousePressed() {
  let pacmanX = constrain(mouseX - pacmanSize / 2, 0, width - pacmanSize);
  let pacmanY = constrain(mouseY - pacmanSize / 2, 0, height - pacmanSize);

  let x = floor((mouseX - pacmanX) / pixelSize);
  let y = floor((mouseY - pacmanY) / pixelSize);

  
    }