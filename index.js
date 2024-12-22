/*

const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');

let wheelData = [
  { label: 'Prize 1', color: '#FF0000' },
  { label: 'Prize 2', color: '#00FF00' },
  { label: 'Prize 3', color: '#0000FF' },
  // Add more prizes as needed
];

const canvasContext = wheelCanvas.getContext('2d');
const wheelRadius = 150;
const sliceAngle = 2 * Math.PI / wheelData.length;

// Function to draw the wheel
function drawWheel() {
  canvasContext.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  let angle = 0;
  for (const slice of wheelData) {
    canvasContext.beginPath();
    canvasContext.arc(wheelRadius, wheelRadius, wheelRadius, angle, angle + sliceAngle);
    canvasContext.lineTo(wheelRadius, wheelRadius);
    canvasContext.fillStyle = slice.color;
    canvasContext.fill();
    angle += sliceAngle;

    // Write the label on the slice
    canvasContext.fillStyle = 'black';
    canvasContext.font = '12px Arial';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.fillText(slice.label, wheelRadius, wheelRadius);
  }
}

// Function to spin the wheel
function spinWheel() {
  if (wheelData.length === 0) {
    alert("No more prizes left!");
    return;
  }

  const randomAngle = Math.random() * 360;
  const spinDuration = 5000; // Adjust the spin duration as needed
  const spinStep = 10; // Adjust the spin step for smoother animation

  let currentAngle = 0;
  const spinInterval = setInterval(() => {
    currentAngle += spinStep;
    canvasContext.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    canvasContext.rotate(spinStep * Math.PI / 180);
    drawWheel();

    if (currentAngle >= randomAngle) {
      clearInterval(spinInterval);
      // Calculate the winning slice based on the final angle
      const winningSliceIndex = Math.floor(currentAngle / sliceAngle) % wheelData.length;
      const winningSlice = wheelData[winningSliceIndex];
      alert(`You won: ${winningSlice.label}`);

      // Remove the winning slice from the wheelData array
      wheelData.splice(winningSliceIndex, 1);

      // Redraw the wheel with the updated data
      drawWheel();
    }
  }, spinDuration / (randomAngle / spinStep));
}

// Initial drawing of the wheel
drawWheel();

// Event listener for the spin button
spinButton.addEventListener('click', spinWheel);

*/

const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');

const wheelData = [
  { label: 'Prize 1', color: '#FF0000' },
  { label: 'Prize 2', color: '#00FF00' },
  { label: 'Prize 3', color: '#0000FF' },
  // Add more prizes as needed
];

const canvasContext = wheelCanvas.getContext('2d');
const wheelRadius = 150;
const sliceAngle = 2 * Math.PI / wheelData.length;

// Function to draw the wheel
function drawWheel() {
  canvasContext.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  let angle = 0;
  for (const slice of wheelData) {
    canvasContext.beginPath();
    canvasContext.arc(wheelRadius, wheelRadius, wheelRadius, angle, angle + sliceAngle);
    canvasContext.lineTo(wheelRadius, wheelRadius);
    canvasContext.fillStyle = slice.color;
    canvasContext.fill();
    angle += sliceAngle;

    // Write the label on the slice
    canvasContext.fillStyle = 'black';
    canvasContext.font = '12px Arial';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.fillText(slice.label, wheelRadius, wheelRadius);
  }
}

// Function to spin the wheel
function spinWheel() {
  const randomAngle = Math.random() * 360;
  const spinDuration = 5000; // Adjust the spin duration as needed
  const spinStep = 10; // Adjust the spin step for smoother animation

  let currentAngle = 0;
  const spinInterval = setInterval(() => {
    currentAngle += spinStep;
    canvasContext.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    canvasContext.rotate(spinStep * Math.PI / 180);
    drawWheel();

    if (currentAngle >= randomAngle) {
      clearInterval(spinInterval);
      // Calculate the winning slice based on the final angle
      const winningSliceIndex = Math.floor(currentAngle / sliceAngle) % wheelData.length;
      const winningSlice = wheelData[winningSliceIndex];
      alert(`You won: ${winningSlice.label}`);
    }
  }, spinDuration / (randomAngle / spinStep));
}

// Initial drawing of the wheel
drawWheel();

// Event listener for the spin button
spinButton.addEventListener('click', spinWheel);