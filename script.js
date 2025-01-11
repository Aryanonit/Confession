// Add these at the start of your script.js
const backgroundMusic = document.getElementById('backgroundMusic');
const yesClickSound = document.getElementById('yesClickSound');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// Music toggle function
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '🔈';
    } else {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Auto-play music on first interaction
document.body.addEventListener('click', () => {
    if (!isMusicPlaying) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
        isMusicPlaying = true;
    }
}, { once: true });

function createFloatingHearts() {
    const background = document.querySelector('.background');
    const heartSVG = `
        <svg class="heart-svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSVG;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        background.appendChild(heart);
    }
}

createFloatingHearts();

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const message = document.getElementById('message');
const loading = document.querySelector('.loading');
const question = document.getElementById('question');

// Yes button click handler
yesBtn.addEventListener('click', () => {
    yesClickSound.play();  // Play the click sound
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    question.style.display = 'none';
    loading.style.display = 'block';

    setTimeout(() => {
        loading.style.display = 'none';
        message.textContent = "Thank you Queen! You got a Pookie! 👑✨💖";
        message.classList.remove('hidden');
        message.style.opacity = '1';
        
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        
        function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff9999', '#ffb366', '#ffff66']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff9999', '#ffb366', '#ffff66']
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }
        frame();
    }, 2000);
});

// No button hover handler
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});