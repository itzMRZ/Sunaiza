// Create clouds
const cloudsContainer = document.getElementById('clouds');
if (cloudsContainer) {
    for (let i = 0; i < 10; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const size = Math.random() * 100 + 50;
        cloud.style.width = size + 'px';
        cloud.style.height = size/2 + 'px';
        cloud.style.left = Math.random() * 100 + '%';
        cloud.style.top = Math.random() * 50 + '%';
        cloud.style.animationDuration = (Math.random() * 20 + 20) + 's';
        cloud.style.animationDelay = (Math.random() * 10) + 's';
        cloudsContainer.appendChild(cloud);
    }
}

// Update countdown
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const eventDate = new Date('June 12, 2025 19:00:00').getTime();
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Format numbers with leading zeros
            const formatTime = (num) => String(num).padStart(2, '0');

            countdownElement.innerHTML = `
                <div class="countdown-container">
                    <div class="time-unit">
                        <span class="time-number">${formatTime(days)}</span>
                        <div class="time-label">DAYS</div>
                    </div>
                    <span class="colon">:</span>
                    <div class="time-unit">
                        <span class="time-number">${formatTime(hours)}</span>
                        <div class="time-label">HOURS</div>
                    </div>
                    <span class="colon">:</span>
                    <div class="time-unit">
                        <span class="time-number">${formatTime(minutes)}</span>
                        <div class="time-label">MINS</div>                    </div>
                    <span class="colon">:</span>
                    <div class="time-unit">
                        <span class="time-number">${formatTime(seconds)}</span>
                        <div class="time-label">SECS</div>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = `
                <div style="background: linear-gradient(135deg, #FFB6C1, #FFC0CB); color: #FF1493; padding: 20px; border-radius: 20px; text-align: center; font-family: 'Comic Sans MS', cursive; font-size: 1.5rem; border: 3px solid #FF69B4;">
                    🎉 THE CELEBRATION IS TODAY! 🎉
                </div>
            `;
        }
    }
}

updateCountdown();
setInterval(updateCountdown, 1000); // Update every second for smooth countdown

// RSVP functionality
const rsvpButton = document.getElementById('rsvpBtn');
if (rsvpButton) {
    rsvpButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert("Thank you for your interest! Please send an email to parents@email.com to confirm your attendance.");
    });
}

// Advanced Butterfly Animation System
class ButterflyManager {
    constructor() {
        this.butterflies = [];
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.scrollPosition = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createButterflies();
        this.setupEventListeners();
        this.startAnimation();
    }    createButterflies() {
        const butterflyElements = document.querySelectorAll('.butterfly');

        butterflyElements.forEach((element, index) => {
            // Create predictable starting positions based on index
            const startX = (this.viewport.width / (butterflyElements.length + 1)) * (index + 1);
            const startY = this.viewport.height * (0.2 + (index % 3) * 0.3); // Three height levels

            const butterfly = {
                element: element,
                index: index,
                x: startX,
                y: startY,
                vx: 0.2, // Consistent gentle velocity
                vy: 0.1, // Consistent gentle velocity
                baseSpeed: 0.3, // Consistent base speed for all butterflies
                orbitalAngle: (index / butterflyElements.length) * Math.PI * 2, // Circular distribution
                orbitalRadius: 100 + (index % 3) * 50, // Varying orbital sizes
                centerX: startX,
                centerY: startY,
                phase: index * 0.5, // Staggered phases for variety
                waveAmplitude: 20 + (index % 2) * 10, // Gentle wave motion
                currentDirection: index % 2 === 0 ? 1 : -1, // Alternating directions
                rotation: 0,
                scale: 0.9, // Consistent scale
                lastDirectionChange: Date.now(),
                directionChangeInterval: 8000, // Consistent 8-second intervals
                isResting: false,
                restStartTime: 0
            };

            // Position butterfly initially
            this.positionButterfly(butterfly);
            this.butterflies.push(butterfly);
        });
    }

    setupEventListeners() {
        // Update viewport on resize
        window.addEventListener('resize', () => {
            this.viewport.width = window.innerWidth;
            this.viewport.height = window.innerHeight;
        });

        // Track scroll for gravity effect
        window.addEventListener('scroll', () => {
            this.scrollPosition.y = window.pageYOffset;
            this.updateGravity();
        });
    }    updateGravity() {
        const centerX = this.viewport.width / 2;
        const centerY = this.viewport.height / 2 + this.scrollPosition.y;

        this.butterflies.forEach(butterfly => {
            // Update orbital center to slowly drift toward viewport center
            const driftSpeed = 0.001;
            butterfly.centerX += (centerX - butterfly.centerX) * driftSpeed;
            butterfly.centerY += (centerY - butterfly.centerY) * driftSpeed;
        });
    }

    positionButterfly(butterfly) {
        // Allow full page positioning
        const x = Math.max(0, Math.min(butterfly.x, this.viewport.width - 25));
        const y = butterfly.y; // Allow Y to go beyond viewport for full page coverage

        butterfly.element.style.transform = `
            translate(${x}px, ${y}px)
            rotate(${butterfly.rotation}deg)
            scale(${butterfly.scale})
        `;
        butterfly.element.style.left = '0px';
        butterfly.element.style.top = '0px';
    }    updateButterfly(butterfly) {
        const now = Date.now();
        const time = now * 0.001; // Convert to seconds

        // Periodic direction changes (every 8 seconds)
        if (now - butterfly.lastDirectionChange > butterfly.directionChangeInterval) {
            butterfly.currentDirection *= -1; // Simply reverse direction
            butterfly.lastDirectionChange = now;
        }

        // Calculate smooth orbital movement
        butterfly.orbitalAngle += butterfly.currentDirection * butterfly.baseSpeed * 0.01;

        // Create figure-8 or circular patterns
        const orbitalX = Math.cos(butterfly.orbitalAngle) * butterfly.orbitalRadius;
        const orbitalY = Math.sin(butterfly.orbitalAngle * 2) * (butterfly.orbitalRadius * 0.5); // Figure-8 effect

        // Add gentle wave motion
        const waveX = Math.sin(time * 0.5 + butterfly.phase) * butterfly.waveAmplitude;
        const waveY = Math.cos(time * 0.3 + butterfly.phase) * (butterfly.waveAmplitude * 0.5);

        // Calculate target position
        const targetX = butterfly.centerX + orbitalX + waveX;
        const targetY = butterfly.centerY + orbitalY + waveY;

        // Smooth movement toward target
        const moveSpeed = 0.02;
        butterfly.x += (targetX - butterfly.x) * moveSpeed;
        butterfly.y += (targetY - butterfly.y) * moveSpeed;

        // Update velocity for rotation calculation
        butterfly.vx = (targetX - butterfly.x) * moveSpeed;
        butterfly.vy = (targetY - butterfly.y) * moveSpeed;

        // Keep butterflies within reasonable bounds
        const margin = 100;
        if (butterfly.x < margin) {
            butterfly.centerX += 2;
        } else if (butterfly.x > this.viewport.width - margin) {
            butterfly.centerX -= 2;
        }

        if (butterfly.y < margin) {
            butterfly.centerY += 2;
        } else if (butterfly.y > this.viewport.height + this.scrollPosition.y - margin) {
            butterfly.centerY -= 2;
        }

        // Smooth rotation based on movement direction
        if (Math.abs(butterfly.vx) > 0.01 || Math.abs(butterfly.vy) > 0.01) {
            const targetAngle = Math.atan2(butterfly.vy, butterfly.vx) * (180 / Math.PI);
            butterfly.rotation += (targetAngle - butterfly.rotation) * 0.05;
        }

        // Gentle wing flutter
        butterfly.scale = 0.9 + Math.sin(time * 3 + butterfly.phase) * 0.05;

        // Position the butterfly
        this.positionButterfly(butterfly);
    }

    startAnimation() {
        const animate = () => {
            this.butterflies.forEach(butterfly => {
                this.updateButterfly(butterfly);
            });
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Initialize butterfly manager when DOM is loaded
let butterflyManager;

// Initialize butterfly animation system
document.addEventListener('DOMContentLoaded', function() {
    // Wait for butterflies to be rendered
    setTimeout(() => {
        butterflyManager = new ButterflyManager();
    }, 100);
});

// Subtle mouse interaction for natural behavior
document.addEventListener('mousemove', function(e) {
    if (butterflyManager && butterflyManager.butterflies) {
        const mouseX = e.clientX;
        const mouseY = e.clientY + window.pageYOffset;

        // Add very gentle mouse influence
        butterflyManager.butterflies.forEach((butterfly, index) => {
            const dx = mouseX - butterfly.x;
            const dy = mouseY - butterfly.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Gentle center shifting when mouse is near
            if (distance < 150 && distance > 0) {
                const influenceStrength = ((150 - distance) / 150) * 0.3;
                // Slightly shift the orbital center away from mouse
                butterfly.centerX += -(dx / distance) * influenceStrength;
                butterfly.centerY += -(dy / distance) * influenceStrength;
            }
        });
    }
});

// Photo modal functionality
function enlargePhoto(img) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalImg.alt = img.alt;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Make gallery items interactive (keep for any remaining placeholders)
const placeholders = document.querySelectorAll('.placeholder');
placeholders.forEach((placeholder, index) => {
    placeholder.addEventListener('click', function() {
        alert(`Photo for month ${index+1} would be displayed here.`);
    });
});
