// Create clouds
const cloudsContainer = document.getElementById('clouds');
if (cloudsContainer) {
    for (let i = 0; i < 20; i++) { // Increased from 10 to 20 clouds
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const size = Math.random() * 120 + 60; // Slightly larger max size, min size 60
        cloud.style.width = size + 'px';
        cloud.style.height = size/2 + 'px';
        cloud.style.left = Math.random() * 100 + '%';
        cloud.style.top = Math.random() * 60 + '%'; // Spread them out a bit more vertically
        cloud.style.animationDuration = (Math.random() * 40 + 30) + 's'; // Slower: 30s to 70s duration
        cloud.style.animationDelay = (Math.random() * 20) + 's'; // Increased delay range
        cloud.style.opacity = 0.6 + Math.random() * 0.3; // Vary opacity for subtlety (0.6 to 0.9)
        cloudsContainer.appendChild(cloud);
    }
}

// Initialize countdown structure with enhanced design
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div class="countdown-container">
                <div class="time-unit" id="days-unit">
                    <span class="time-number" data-time="days">00</span>
                    <div class="time-label">DAYS</div>
                </div>
                <span class="colon">:</span>
                <div class="time-unit" id="hours-unit">
                    <span class="time-number" data-time="hours">00</span>
                    <div class="time-label">HOURS</div>
                </div>
                <span class="colon">:</span>
                <div class="time-unit" id="minutes-unit">
                    <span class="time-number" data-time="minutes">00</span>
                    <div class="time-label">MINS</div>
                </div>
                <span class="colon">:</span>
                <div class="time-unit" id="seconds-unit">
                    <span class="time-number" data-time="seconds">00</span>
                    <div class="time-label">SECS</div>
                </div>
            </div>
        `;
    }
}

// Enhanced countdown update with smooth transitions
function updateCountdown() {
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

        // Update only the number elements with animation check
        const timeUnits = [
            { element: document.querySelector('[data-time="days"]'), value: formatTime(days), unitId: 'days-unit' },
            { element: document.querySelector('[data-time="hours"]'), value: formatTime(hours), unitId: 'hours-unit' },
            { element: document.querySelector('[data-time="minutes"]'), value: formatTime(minutes), unitId: 'minutes-unit' },
            { element: document.querySelector('[data-time="seconds"]'), value: formatTime(seconds), unitId: 'seconds-unit' }
        ];

        timeUnits.forEach(({ element, value, unitId }) => {
            if (element && element.textContent !== value) {
                // Add brief flash animation when value changes
                const unit = document.getElementById(unitId);
                if (unit) {
                    unit.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        unit.style.transform = '';
                    }, 150);
                }
                element.textContent = value;
            }
        });
    } else {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div style="background: linear-gradient(135deg, #FFE4E6, #FEF2F2); color: #DC2626; padding: clamp(20px, 4vw, 30px); border-radius: clamp(20px, 4vw, 28px); text-align: center; font-family: 'Fredoka', 'Nunito', sans-serif; font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 700; border: 3px solid #F87171; box-shadow: 0 12px 30px rgba(220, 38, 38, 0.2); animation: celebrationPulse 1s infinite alternate;">
                    🎉 THE CELEBRATION IS TODAY! 🎉
                </div>
            `;
        }
    }
}

// RSVP functionality
const rsvpButton = document.getElementById('rsvpBtn');
if (rsvpButton) {
    rsvpButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://wa.me/qr/LCBNPCPOZS67M1', '_blank');
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
        // REMOVED: scrollPosition as butterflies are now viewport-contained
        this.origin = { x: this.viewport.width / 2, y: this.viewport.height / 2 }; // Default origin
        // No call to this.init() here, will be called after DOM is ready
    }    init() {
        console.log('Initializing ButterflyManager...');
        const babyContainer = document.querySelector('.photo-container');
        if (babyContainer) {
            const rect = babyContainer.getBoundingClientRect(); // Get viewport-relative coordinates
            this.origin = {
                x: rect.left + rect.width / 2, // X relative to viewport
                y: rect.top + rect.height / 2  // Y relative to viewport
            };
        } else {
            this.origin = {
                x: this.viewport.width / 2,
                y: this.viewport.height * 0.3
            };
            console.warn("Butterfly origin: '.photo-container' not found. Using fallback viewport center.");
        }
        this.createButterflies();
        this.setupEventListeners();
        this.startAnimation();
        console.log(`Initialized ${this.butterflies.length} butterflies`);
    }createButterflies() {
        const butterflyElements = document.querySelectorAll('.butterfly');
        // REMOVED: originX and originY as starting points will be more varied.

        butterflyElements.forEach((element, index) => {
            // Check if mobile for adjusted positioning
            const isMobile = this.viewport.width <= 768;

            // Determine starting side: left (true) or right (false)
            const startFromLeftSide = Math.random() < 0.5;
            let startX;
            if (startFromLeftSide) {
                const offScreenRange = isMobile ? 0.1 : 0.2; // Smaller off-screen range on mobile
                startX = (Math.random() * -offScreenRange - 0.05) * this.viewport.width; // Start off-screen left
            } else {
                const offScreenRange = isMobile ? 0.1 : 0.2; // Smaller off-screen range on mobile
                startX = (1.05 + Math.random() * offScreenRange) * this.viewport.width; // Start off-screen right
            }
            const startY = Math.random() * this.viewport.height; // Random Y position within viewport height

            const butterfly = {
                element: element,
                index: index,
                x: startX,
                y: startY,
                baseSpeed: 0.015 + Math.random() * 0.015, // Speed (0.015 to 0.03)
                orbitalAngle: Math.random() * Math.PI * 2,
                orbitalRadius: 60 + Math.random() * 80, // Orbits (60 to 140) - increased range
                // centerX and centerY will now be relative to viewport and updated to stay within
                centerX: this.viewport.width * (isMobile ? 0.25 : 0.2) + Math.random() * (this.viewport.width * (isMobile ? 0.5 : 0.6)), // Adjusted for mobile
                centerY: this.viewport.height * (isMobile ? 0.25 : 0.2) + Math.random() * (this.viewport.height * (isMobile ? 0.5 : 0.6)), // Adjusted for mobile
                phase: Math.random() * Math.PI * 2,
                waveAmplitude: 8 + Math.random() * 12, // Waves (8 to 20) - increased range
                currentDirection: Math.random() < 0.5 ? 1 : -1,
                rotation: Math.random() * 360,
                scale: isMobile ? (0.06 + Math.random() * 0.02) : (0.04 + Math.random() * 0.03), // Slightly larger on mobile for visibility
                lastDirectionChange: Date.now() - Math.random() * 12000,
                directionChangeInterval: 12000 + Math.random() * 10000 // Change 12-22 seconds - increased interval
            };            this.positionButterfly(butterfly);
            butterfly.element.style.opacity = '0.8'; // Make butterfly visible with proper opacity
            this.butterflies.push(butterfly);
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.viewport.width = window.innerWidth;
            this.viewport.height = window.innerHeight;
            // Re-evaluate butterfly positions or centers if needed on resize for strict viewport containment
            this.butterflies.forEach(b => {
                b.centerX = Math.min(Math.max(b.centerX, 0), this.viewport.width);
                b.centerY = Math.min(Math.max(b.centerY, 0), this.viewport.height);
            });
        });

        // REMOVED: Scroll event listener, as gravity is removed for viewport containment
    }

    // REMOVED: updateGravity method

    positionButterfly(butterfly) {
        const x = butterfly.x;
        const y = butterfly.y;

        butterfly.element.style.transform = `
            translate(${x}px, ${y}px)
            rotate(${butterfly.rotation}deg)
            scale(${butterfly.scale})
        `;
        butterfly.element.style.left = '0px';
        butterfly.element.style.top = '0px';
    }    updateButterfly(butterfly) {
        const now = Date.now();
        const time = now * 0.0006; // Time factor for wave motion, slightly slower for broader paths

        if (now - butterfly.lastDirectionChange > butterfly.directionChangeInterval) {
            butterfly.currentDirection *= (Math.random() < 0.5 ? 1 : -1); // 50/50 chance to reverse orbital direction
            butterfly.lastDirectionChange = now;
            butterfly.orbitalRadius = (70 + Math.random() * 100) * (0.7 + Math.random() * 0.6); // Orbits (70-170) * (0.7-1.3) - wider range

            // Adjust for mobile - smaller margins and movements
            const isMobile = this.viewport.width <= 768;
            const marginFactor = isMobile ? 0.3 : 0.8; // Smaller movement range on mobile
            const centerFactor = isMobile ? 0.4 : 0.6; // Keep butterflies more centered on mobile

            // Pick a new target orbital center anywhere within the viewport
            butterfly.centerX = this.viewport.width * (0.1 + Math.random() * marginFactor); // Adjusted for mobile
            butterfly.centerY = this.viewport.height * (0.1 + Math.random() * centerFactor); // Adjusted for mobile
            butterfly.baseSpeed = 0.015 + Math.random() * 0.015; // Re-randomize base speed slightly
            butterfly.waveAmplitude = 8 + Math.random() * 12; // Re-randomize wave amplitude
        }

        butterfly.orbitalAngle += butterfly.currentDirection * butterfly.baseSpeed * 0.15; // Adjusted speed factor

        const orbitalX = Math.cos(butterfly.orbitalAngle) * butterfly.orbitalRadius;
        const orbitalY = Math.sin(butterfly.orbitalAngle) * butterfly.orbitalRadius;

        const waveSpeedFactor = 0.5 + Math.random() * 0.25;
        const waveX = Math.sin(time * waveSpeedFactor + butterfly.phase) * butterfly.waveAmplitude;
        const waveY = Math.cos(time * waveSpeedFactor + butterfly.phase) * (butterfly.waveAmplitude * 0.5);

        let targetX = butterfly.centerX + orbitalX + waveX;
        let targetY = butterfly.centerY + orbitalY + waveY;

        const moveSpeed = 0.01 + Math.random() * 0.008; // (0.01 to 0.018) - slightly slower lerp for smoother, wider paths
        let dx = targetX - butterfly.x;
        let dy = targetY - butterfly.y;

        butterfly.x += dx * moveSpeed;
        butterfly.y += dy * moveSpeed;

        let currentVx = dx * moveSpeed;
        let currentVy = dy * moveSpeed;

        // Enhanced Viewport Containment for mobile
        const isMobile = this.viewport.width <= 768;
        const margin = isMobile ? 10 : -50; // Much tighter margins on mobile
        const vpWidth = this.viewport.width;
        const vpHeight = this.viewport.height;

        // If butterfly hits edge, reverse direction and place it back inside margin
        if (butterfly.x < margin) {
            butterfly.x = margin; // Place at margin
            butterfly.centerX = vpWidth * (isMobile ? 0.3 : 0.2) + Math.random() * (vpWidth * (isMobile ? 0.4 : 0.6)); // Pick new center more towards the other side
        } else if (butterfly.x > vpWidth - margin) {
            butterfly.x = vpWidth - margin; // Place at margin
            butterfly.centerX = vpWidth * (isMobile ? 0.3 : 0.2) + Math.random() * (vpWidth * (isMobile ? 0.4 : 0.6)); // Pick new center more towards the other side
        }

        if (butterfly.y < margin) {
            butterfly.y = margin;
            butterfly.centerY = vpHeight * (isMobile ? 0.3 : 0.2) + Math.random() * (vpHeight * (isMobile ? 0.4 : 0.6));
        } else if (butterfly.y > vpHeight - margin) {
            butterfly.y = vpHeight - margin;
            butterfly.centerY = vpHeight * (isMobile ? 0.3 : 0.2) + Math.random() * (vpHeight * (isMobile ? 0.4 : 0.6));
        }

        // Ensure orbital centers also stay roughly within viewport to guide butterflies back
        const centerMargin = isMobile ? margin * 2 : margin * 0.5;
        butterfly.centerX = Math.min(Math.max(butterfly.centerX, centerMargin), vpWidth - centerMargin); // Allow centers to be near edges
        butterfly.centerY = Math.min(Math.max(butterfly.centerY, centerMargin), vpHeight - centerMargin);

        if (Math.abs(currentVx) > 0.01 || Math.abs(currentVy) > 0.01) {
            const targetAngle = Math.atan2(currentVy, currentVx) * (180 / Math.PI);
            butterfly.rotation += (targetAngle - butterfly.rotation) * 0.06; // Slightly faster rotation adjustment
        }

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
let entranceAnimationManager;

// Initialize animation systems
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown
    initializeCountdown();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize entrance animations first
    entranceAnimationManager = new EntranceAnimationManager();
    // entranceAnimationManager.setupAnimations(); // This is called inside its constructor if designed that way, or explicitly if not.
                                                // Assuming setupAnimations is called by its constructor or an init method.

    // Initialize ButterflyManager and call its init method
    butterflyManager = new ButterflyManager();
    setTimeout(() => {
        if (butterflyManager) {
            butterflyManager.init(); // Call init here to ensure DOM is ready for origin calculation
        }
    }, 350); // Slightly increased delay to ensure .photo-container is definitely laid out
});

// Subtle mouse interaction for natural behavior
document.addEventListener('mousemove', function(e) {
    if (butterflyManager?.butterflies) {
        const mouseX = e.clientX;
        const mouseY = e.clientY + window.pageYOffset;

        butterflyManager.butterflies.forEach((butterfly, index) => {
            const dx = mouseX - butterfly.x;
            const dy = mouseY - butterfly.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Gentle nudge when mouse is very near
            if (distance < 75 && distance > 0) { // MODIFIED: Smaller distance for influence
                const influenceStrength = ((75 - distance) / 75) * 0.05; // MODIFIED: Much weaker influence
                // Directly nudge position very slightly away from mouse
                butterfly.x -= (dx / distance) * influenceStrength;
                butterfly.y -= (dy / distance) * influenceStrength;
            }
        });
    }
});

// Photo modal functionality
function enlargePhoto(imageSrc, imageAlt) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');

    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    modal.showModal();

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.close();

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Gallery event delegation
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');

    if (gallery) {
        gallery.addEventListener('click', function(e) {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                e.preventDefault();
                const imageSrc = galleryItem.dataset.src;
                const imageAlt = galleryItem.dataset.alt;
                enlargePhoto(imageSrc, imageAlt);
            }
        });

        // Handle keyboard navigation for gallery items
        gallery.addEventListener('keydown', function(e) {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const imageSrc = galleryItem.dataset.src;
                const imageAlt = galleryItem.dataset.alt;
                enlargePhoto(imageSrc, imageAlt);
            }
        });
    }

    // Modal event listeners
    const modal = document.getElementById('photoModal');
    const closeButton = modal?.querySelector('.close-modal');

    if (modal) {
        // Close when clicking on modal background
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

// Make gallery items interactive (keep for any remaining placeholders)
const placeholders = document.querySelectorAll('.placeholder');
placeholders.forEach((placeholder, index) => {
    placeholder.addEventListener('click', function() {
        alert(`Photo for month ${index+1} would be displayed here.`);
    });
});

// Enhanced Entrance Animations with Intersection Observer
class EntranceAnimationManager {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
    }

    setupAnimations() {
        this.animatedElements = document.querySelectorAll('.section-title, .intro-text, .event-details p, .countdown-container, .button-group button, .dress-code-item, .footer p, .gallery-photo'); // MODIFIED: Re-added .gallery-photo for entrance animation

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.animatedElements.forEach(element => {
            // Temporarily hide gallery photos if they are part of the animation
            if (element.classList.contains('gallery-photo')) {
                element.style.opacity = '0'; // Ensure they start hidden if animated
            }
            this.observer.observe(element);
        });

        // Handle elements that might already be in view on load
        this.animatedElements.forEach(element => {
            if (this.isElementInViewport(element) && !element.classList.contains('animated')) {
                this.animateElement(element);
                if (this.observer) { // Check if observer exists before unobserving
                    this.observer.unobserve(element);
                }
            }
        });

        // Special handling for gallery photos if we are NOT animating them via IntersectionObserver
        // This section was for debugging the scroll glitch by making them visible immediately.
        // If gallery photos are now animated (added back to animatedElements), this might be redundant or conflict.
        /*
        const galleryPhotos = document.querySelectorAll('.gallery-photo');
        galleryPhotos.forEach(photo => {
            photo.style.opacity = '1'; // Make them visible immediately
            photo.style.transform = 'translateY(0) scale(1)'; // Reset any animation transforms
        });
        */
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    animateElement(element) {
        // Add specific animations based on element type
        if (element.classList.contains('header')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)'; // MODIFIED
        } else if (element.classList.contains('photo-container')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)'; // MODIFIED
        } else if (element.classList.contains('details')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)'; // MODIFIED
        } else if (element.classList.contains('gallery')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';

            // REMOVED: Commented out staggered animation for gallery photos
            // as individual photos are handled by IntersectionObserver.
        } else if (element.classList.contains('dress-code-container')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)'; // MODIFIED
        } else if (element.classList.contains('gallery-photo')) {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.classList.add('animated');
        } else {
            // Default animation for other elements
            element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)'; // Keep a slight scale for a subtle effect
            element.classList.add('animated');
        }
    }
}

// Initialize entrance animation manager
