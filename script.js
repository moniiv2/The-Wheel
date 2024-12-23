const canvas = document.getElementById('wheelCanvas');
canvas.width = 400; // Adjust the width
canvas.height = 400; // Adjust the height
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const prizesDiv = document.querySelector('.prizes');

const wheel = {
    segments: [
        { text: 'Lion', imgSrc: 'wheel-images/lion.png', quiz: [{ question: 'Lions are the only cats that live in prides.', options: ['True', 'False'], answer: 0 }, { question: "A male lion's mane is a sign of strength and health.", options: ['true', 'false'], answer: 0 }] },
        { text: 'Raccoon', imgSrc: 'wheel-images/racoon.png', quiz: [{ question: 'Raccoons are excellent climbers and often raid bird nests.', options: ['True', 'False'], answer: 0 }, { question: 'Raccoons are primarily nocturnal.', options: ['True', 'False'], answer: 0 }] },
        { text: 'Tiger', imgSrc: 'wheel-images/tiger.png', quiz: [{ question: 'Tigers are the largest living cat species.', options: ['True', 'False'], answer: 0 }, { question: 'Tigers are solitary animals including when mating.', options: ['True', 'False'], answer: 1 }] },
        { text: 'Baby Elephant', imgSrc: 'wheel-images/baby-elephant.png', quiz: [{ question: 'Baby elephants are called calves.', options: ['True', 'False'], answer: 0 }, { question: 'Baby elephants can stand within an hour of being born.', options: ['True', 'False'], answer: 0 }] },
        { text: 'Zebra', imgSrc: 'wheel-images/zebra.png', quiz: [{ question: 'Zebras have unique stripe patterns, like human fingerprints.', options: ['True', 'False'], answer: 0 }, { question: 'Zebras are primarily herbivores.', options: ['True', 'False'], answer: 0 }] },
        { text: 'Rat', imgSrc: 'wheel-images/rat.png', quiz: [{ question: 'Rats are excellent swimmers.', options: ['True', 'False'], answer: 0 }, { question: 'Rats can squeeze through surprisingly small holes.', options: ['True', 'False'], answer: 0 }] }
    ],
    colors: ['#ffd700', '#ff69b4', '#00ced1', '#32cd32', '#ff4500', '#D2E0FB'],
    currentAngle: 0,
    spinning: false,
    spinVelocity: 0,
    deceleration: 0.99,
    images: [],
    spin() {
        if (this.spinning) return;
        this.spinVelocity = Math.random() * 30 + 80; // Initial spin velocity
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
            const segment = this.segments[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, (this.currentAngle + i * segmentAngle) * Math.PI / 180, (this.currentAngle + (i + 1) * segmentAngle) * Math.PI / 180);
            ctx.closePath();
            ctx.fillStyle = this.colors[i];
            ctx.fill();
            ctx.stroke();

            // Draw image with border radius
            if (this.images[i]) {
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((this.currentAngle + (i + 0.5) * segmentAngle) * Math.PI / 180);
                ctx.beginPath();
                ctx.arc(canvas.width / 4, -10, 20, 0, Math.PI * 2, true); // Draw a circle for the border radius
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(this.images[i], canvas.width / 4 - 20, -30, 40, 40); // Adjust image size and position as needed
                ctx.restore();
            }

            // Draw text below the image
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((this.currentAngle + (i + 0.5) * segmentAngle) * Math.PI / 180);
            ctx.textAlign = "center";
            ctx.fillStyle = "#000";
            ctx.font = "bold 16px Arial";
            ctx.fillText(segment.text, canvas.width / 4, 30); // Position text below the image
            ctx.restore();
        }
    },
    displayResult() {
        const segmentAngle = 360 / this.segments.length;
        const winningSegmentIndex = Math.floor((360 - this.currentAngle % 360) / segmentAngle) % this.segments.length;
        const winningSegment = this.segments[winningSegmentIndex];
        alert(`You won: ${winningSegment.text}!`);
        
        // Remove the winning segment and its color
        this.segments.splice(winningSegmentIndex, 1);
        this.colors.splice(winningSegmentIndex, 1);
        this.images.splice(winningSegmentIndex, 1);
        
        // Display the quiz for the winning prize
        this.displayQuiz(winningSegment.quiz);
        
        // Redraw the wheel with the updated segments
        this.draw();
    },
    displayQuiz(quiz) {
        let currentQuestionIndex = 0;
        const showQuestion = (index) => {
            const question = quiz[index];
            prizesDiv.innerHTML = `
                <h3>${question.question}</h3>
                ${question.options.map((option, i) => `<button class="quiz-option" data-index="${i}">${option}</button>`).join('')}
            `;
            document.querySelectorAll('.quiz-option').forEach(button => {
                button.addEventListener('click', (e) => {
                    const selectedIndex = parseInt(e.target.getAttribute('data-index'));
                    if (selectedIndex === question.answer) {
                        alert('Correct!');
                        if (index < quiz.length - 1) {
                            showQuestion(index + 1);
                        } else {
                            alert('Quiz completed! Spin the wheel to go again.');
                        }
                    } else {
                        alert('Wrong answer. Try again!');
                    }
                });
            });
        };
        showQuestion(currentQuestionIndex);
    },
    preloadImages() {
        this.segments.forEach((segment, index) => {
            const img = new Image();
            img.src = segment.imgSrc;
            img.onload = () => {
                this.images[index] = img;
                if (this.images.length === this.segments.length) {
                    this.draw();
                }
            };
        });
    }
};

spinButton.addEventListener('click', () => {
    wheel.spin();
});

wheel.preloadImages();