const canvas = document.getElementById('wheelCanvas');
canvas.width = 600; // Adjust the width
canvas.height = 600; // Adjust the height
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const wheel = {
    segments: ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'],
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5'],
    currentAngle: 0,
    spinning: false,
    spinVelocity: 0,
    deceleration: 0.98,
    spin() {
        if (this.spinning) return;
        this.spinVelocity = Math.random() * 30 + 30; // Initial spin velocity
        this.spinning = true;
        this.animate();
    },
    animate() {
        if (!this.spinning) return;
        this.currentAngle += this.spinVelocity;
        this.spinVelocity *= this.deceleration;
        if (this.spinVelocity < 0.1) {
            this.spinVelocity = 0;
            this.spinning = false;
            this.displayResult();
        }
        this.currentAngle %= 360;
        this.draw();
        requestAnimationFrame(() => this.animate());
    },
    draw() {
        const segmentAngle = 360 / this.segments.length;
        for (let i = 0; i < this.segments.length; i++) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, (this.currentAngle + i * segmentAngle) * Math.PI / 180, (this.currentAngle + (i + 1) * segmentAngle) * Math.PI / 180);
            ctx.closePath();
            ctx.fillStyle = this.colors[i];
            ctx.fill();
            ctx.stroke();
        }
    },
    displayResult() {
        const segmentAngle = 360 / this.segments.length;
        const winningSegmentIndex = Math.floor((360 - this.currentAngle % 360) / segmentAngle) % this.segments.length;
        alert(`You won: ${this.segments[winningSegmentIndex]}!`);
    }
};

spinButton.addEventListener('click', () => {
    wheel.spin();
});

wheel.draw();