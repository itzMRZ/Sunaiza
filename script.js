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
let lazyLoadingManager;

// Initialize systems when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown
    initializeCountdown();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize Photo Modal Manager
    window.photoModalManager = new PhotoModalManager();

    // Initialize entrance animations
    entranceAnimationManager = new EntranceAnimationManager();

    // Initialize Advanced Lazy Loading Manager
    lazyLoadingManager = new LazyLoadingManager();

    // Initialize ButterflyManager - will be lazy loaded by LazyLoadingManager
    butterflyManager = new ButterflyManager();
    window.butterflyManager = butterflyManager; // Make globally accessible
    window.entranceAnimationManager = entranceAnimationManager; // Make globally accessible
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

// ===== MODAL FUNCTIONALITY (CONSOLIDATED) =====
class PhotoModalManager {
    constructor() {
        this.modal = document.getElementById('photoModal');
        this.modalImg = document.getElementById('modalImage');
        this.closeButton = null;
        this.isClosing = false;
        this.init();
    }    init() {
        if (!this.modal || !this.modalImg) {
            console.warn('Modal elements not found');
            return;
        }

        // Ensure modal is closed on initialization
        if (this.modal.hasAttribute('open')) {
            this.modal.close();
        }

        this.closeButton = this.modal.querySelector('.close-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button click
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }

        // Click outside modal to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.hasAttribute('open')) {
                this.closeModal();
            }
        });

        // Gallery event delegation
        const gallery = document.querySelector('.gallery');
        if (gallery) {
            gallery.addEventListener('click', (e) => {
                const galleryItem = e.target.closest('.gallery-item');
                if (galleryItem) {
                    e.preventDefault();
                    const imageSrc = galleryItem.dataset.src;
                    const imageAlt = galleryItem.dataset.alt;
                    this.openModal(imageSrc, imageAlt);
                }
            });

            // Keyboard navigation for gallery items
            gallery.addEventListener('keydown', (e) => {
                const galleryItem = e.target.closest('.gallery-item');
                if (galleryItem && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    const imageSrc = galleryItem.dataset.src;
                    const imageAlt = galleryItem.dataset.alt;
                    this.openModal(imageSrc, imageAlt);
                }
            });
        }

        // Handle photo container click (baby photo)
        const babyPhoto = document.getElementById('babyPhoto');
        if (babyPhoto) {
            babyPhoto.addEventListener('click', () => {
                this.openModal(babyPhoto.src, babyPhoto.alt || 'Sunaiza');
            });
            babyPhoto.style.cursor = 'pointer';
        }
    }

    openModal(imageSrc, imageAlt) {
        if (this.isClosing) return;

        this.modalImg.src = imageSrc;
        this.modalImg.alt = imageAlt;

        // Show modal
        this.modal.showModal();

        // Add opening animation class
        this.modal.classList.remove('closing');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        this.closeButton?.focus();

        // Add touch event listeners for mobile
        this.addTouchSupport();
    }

    closeModal() {
        if (this.isClosing) return;

        this.isClosing = true;

        // Add closing animation
        this.modal.classList.add('closing');

        // Wait for animation to complete
        setTimeout(() => {
            this.modal.close();
            this.modal.classList.remove('closing');

            // Restore body scroll
            document.body.style.overflow = 'auto';

            // Clear image to free memory
            this.modalImg.src = '';
            this.modalImg.alt = '';

            this.isClosing = false;

            // Remove touch listeners
            this.removeTouchSupport();
        }, 200);
    }

    addTouchSupport() {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;

            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;

            // If swipe down distance is significant, close modal
            if (deltaY > 100) {
                this.closeModal();
                isDragging = false;
            }
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        this.modal.addEventListener('touchstart', handleTouchStart, { passive: true });
        this.modal.addEventListener('touchmove', handleTouchMove, { passive: true });
        this.modal.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Store references for cleanup
        this.touchHandlers = { handleTouchStart, handleTouchMove, handleTouchEnd };
    }

    removeTouchSupport() {
        if (this.touchHandlers) {
            this.modal.removeEventListener('touchstart', this.touchHandlers.handleTouchStart);
            this.modal.removeEventListener('touchmove', this.touchHandlers.handleTouchMove);
            this.modal.removeEventListener('touchend', this.touchHandlers.handleTouchEnd);
            this.touchHandlers = null;
        }
    }
}

// Legacy functions for backward compatibility
function enlargePhoto(imageSrc, imageAlt) {
    if (window.photoModalManager) {
        window.photoModalManager.openModal(imageSrc, imageAlt);
    }
}

function closeModal() {
    if (window.photoModalManager) {
        window.photoModalManager.closeModal();
    }
}

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

// Advanced Lazy Loading Manager
class LazyLoadingManager {    constructor() {
        this.imageObserver = null;
        this.deferredElements = new Set();
        this.loadedElements = new Set();
        this.isIntersecting = false;
        this.connectionSpeed = this.detectConnectionSpeed();
        this.preloadQueue = [];
        this.userInteractionLevel = 'normal'; // Track user engagement
        this.loadingPriority = new Map(); // Priority queue for loading
        this.init();
    }

    detectConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                // Return 'fast' for 4g, 'medium' for 3g, 'slow' for 2g
                switch(connection.effectiveType) {
                    case '4g': return 'fast';
                    case '3g': return 'medium';
                    case '2g': 
                    case 'slow-2g': return 'slow';
                    default: return 'medium';
                }
            }
        }
        return 'medium'; // Default fallback
    }    init() {
        this.setupImageLazyLoading();
        this.setupMapLazyLoading();
        this.setupProgressiveFeatureLoading();
        this.setupLoadingPlaceholders();        this.setupPrefetching();        this.setupContentLazyLoading();
        this.trackUserEngagement();
        this.setupFallbackLoading();
        
        // Setup retry mechanism for failed loads
        setTimeout(() => this.retryFailedLoads(), 15000);
    }setupImageLazyLoading() {
        // Adjust rootMargin based on connection speed
        const rootMargin = this.connectionSpeed === 'fast' ? '100px' : 
                          this.connectionSpeed === 'medium' ? '50px' : '25px';
        
        const options = {
            root: null,
            rootMargin: rootMargin,
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImageWithAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all gallery images and dress code images
        const lazyImages = document.querySelectorAll('.gallery-photo, .dress-code-item img');
        lazyImages.forEach(img => {
            this.deferredElements.add(img);
            this.addLoadingPlaceholder(img);
            this.imageObserver.observe(img);
        });
    }    loadImageWithAnimation(img) {
        if (this.loadedElements.has(img)) return;
        
        this.loadedElements.add(img);
        
        // Create a fade-in animation with connection-aware timing
        const animationDuration = this.connectionSpeed === 'slow' ? '0.3s' : '0.6s';
        img.style.transition = `opacity ${animationDuration} ease-out, transform ${animationDuration} ease-out`;
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        
        // Add loading class for CSS animations
        img.classList.add('lazy-loading');
          const handleLoad = () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded', 'loading-fade-in');
            this.removeLoadingPlaceholder(img);
            
            // Update accessibility attributes
            img.removeAttribute('aria-label');
            img.setAttribute('aria-label', img.alt || 'Loaded image');
            
            // Trigger a reflow to ensure smooth animation
            img.offsetHeight;
        };

        const handleError = () => {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-error');
            this.removeLoadingPlaceholder(img);
            console.warn('Failed to load image:', img.src);
        };

        if (img.complete && img.naturalHeight !== 0) {
            handleLoad();
        } else {
            img.addEventListener('load', handleLoad, { once: true });
            img.addEventListener('error', handleError, { once: true });
            
            // Add timeout for slow connections
            if (this.connectionSpeed === 'slow') {
                setTimeout(() => {
                    if (img.classList.contains('lazy-loading')) {
                        handleError();
                    }
                }, 10000); // 10 second timeout for slow connections
            }
        }
    }    addLoadingPlaceholder(img) {
        const container = img.closest('.gallery-item, .dress-code-item');
        if (!container) return;

        const placeholder = document.createElement('div');
        placeholder.className = 'lazy-placeholder';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-shimmer"></div>
            </div>
        `;
        
        container.style.position = 'relative';
        container.appendChild(placeholder);

        // Add loading state announcement for screen readers
        img.setAttribute('aria-label', 'Image loading...');
    }

    removeLoadingPlaceholder(img) {
        const container = img.closest('.gallery-item, .dress-code-item');
        if (!container) return;

        const placeholder = container.querySelector('.lazy-placeholder');
        if (placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => placeholder.remove(), 300);
        }
    }

    setupMapLazyLoading() {
        const mapContainer = document.querySelector('.location-map');
        if (!mapContainer) return;

        const mapObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadGoogleMap();
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        mapObserver.observe(mapContainer);
        this.addMapPlaceholder(mapContainer);
    }    loadGoogleMap() {
        const mapContainer = document.querySelector('.location-map');
        if (!mapContainer) return;

        const iframe = mapContainer.querySelector('iframe');
        if (iframe && !iframe.src) {
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 0.8s ease-out';
            
            // Get the map URL from data-src attribute
            const mapSrc = iframe.dataset.src || iframe.getAttribute('data-original-src');
            if (mapSrc) {
                iframe.src = mapSrc;
                
                iframe.addEventListener('load', () => {
                    iframe.style.opacity = '1';
                    this.removeMapPlaceholder();
                }, { once: true });

                // Fallback timeout in case iframe fails to load
                setTimeout(() => {
                    if (iframe.style.opacity === '0') {
                        iframe.style.opacity = '1';
                        this.removeMapPlaceholder();
                    }
                }, 5000);
            } else {
                // Fallback: remove placeholder if no valid src is found
                this.removeMapPlaceholder();
                console.warn('No valid map source found for lazy loading');
            }
        }
    }

    addMapPlaceholder(mapContainer) {
        const placeholder = document.createElement('div');
        placeholder.className = 'map-placeholder';
        placeholder.innerHTML = `
            <div class="map-placeholder-content">
                <div class="map-icon">📍</div>
                <div class="map-text">Loading map...</div>
                <div class="map-shimmer"></div>
            </div>
        `;
        mapContainer.appendChild(placeholder);
    }

    removeMapPlaceholder() {
        const placeholder = document.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => placeholder.remove(), 500);
        }
    }

    setupProgressiveFeatureLoading() {
        // Delay non-critical features based on user interaction or time
        const deferredFeatures = [
            { delay: 1000, feature: () => this.initializeButterflyAnimations() },
            { delay: 1500, feature: () => this.initializeAdvancedAnimations() },
            { delay: 2000, feature: () => this.initializePerformanceOptimizations() }
        ];

        deferredFeatures.forEach(({ delay, feature }) => {
            setTimeout(feature, delay);
        });

        // Load features on first interaction
        const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll'];
        const handleFirstInteraction = () => {
            this.initializeInteractiveFeatures();
            interactionEvents.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction);
            });
        };

        interactionEvents.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
        });
    }

    initializeButterflyAnimations() {
        if (window.butterflyManager && !window.butterflyManager.initialized) {
            window.butterflyManager.init();
            window.butterflyManager.initialized = true;
        }
    }

    initializeAdvancedAnimations() {
        if (window.entranceAnimationManager && !window.entranceAnimationManager.initialized) {
            window.entranceAnimationManager.setupAnimations();
            window.entranceAnimationManager.initialized = true;
        }
    }

    initializeInteractiveFeatures() {
        // Initialize mouse interaction for butterflies with better performance
        if (window.butterflyManager?.butterflies) {
            let lastMouseMoveTime = 0;
            const throttleDelay = 16; // ~60fps

            const throttledMouseMove = (e) => {
                const now = performance.now();
                if (now - lastMouseMoveTime < throttleDelay) return;
                lastMouseMoveTime = now;

                this.handleMouseInteraction(e);
            };

            document.addEventListener('mousemove', throttledMouseMove, { passive: true });
        }
    }

    handleMouseInteraction(e) {
        if (!window.butterflyManager?.butterflies) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY + window.pageYOffset;

        window.butterflyManager.butterflies.forEach((butterfly) => {
            const dx = mouseX - butterfly.x;
            const dy = mouseY - butterfly.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 75 && distance > 0) {
                const influenceStrength = ((75 - distance) / 75) * 0.03;
                butterfly.x -= (dx / distance) * influenceStrength;
                butterfly.y -= (dy / distance) * influenceStrength;
            }
        });
    }    initializePerformanceOptimizations() {
        // Reduce animation frequency when page is not visible
        let animationPaused = false;
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !animationPaused) {
                animationPaused = true;
                this.pauseNonEssentialAnimations();
            } else if (!document.hidden && animationPaused) {
                animationPaused = false;
                this.resumeAnimations();
            }
        });

        // Optimize animations on slower devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            this.enableLowPerformanceMode();
        }

        // Add memory pressure monitoring
        this.monitorMemoryUsage();
        
        // Setup performance logging for debugging
        this.logPerformanceMetrics();
    }

    monitorMemoryUsage() {
        if ('memory' in performance) {
            const checkMemory = () => {
                const memory = performance.memory;
                const usedMemory = memory.usedJSHeapSize / 1048576; // Convert to MB
                const totalMemory = memory.totalJSHeapSize / 1048576;
                
                // If memory usage is high, enable low performance mode
                if (usedMemory > 100 || (usedMemory / totalMemory) > 0.8) {
                    if (!document.body.classList.contains('low-performance')) {
                        console.log('High memory usage detected, enabling low performance mode');
                        this.enableLowPerformanceMode();
                    }
                }
            };

            // Check memory every 30 seconds
            setInterval(checkMemory, 30000);
        }
    }

    logPerformanceMetrics() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            setTimeout(() => {
                const navigationEntries = performance.getEntriesByType('navigation');
                const paintEntries = performance.getEntriesByType('paint');
                
                if (navigationEntries.length > 0) {
                    const nav = navigationEntries[0];
                    console.log('🎭 Birthday Website Performance Metrics:');
                    console.log(`📊 DOM Content Loaded: ${Math.round(nav.domContentLoadedEventEnd)}ms`);
                    console.log(`🎨 Load Complete: ${Math.round(nav.loadEventEnd)}ms`);
                }

                if (paintEntries.length > 0) {
                    paintEntries.forEach(entry => {
                        console.log(`🖼️ ${entry.name}: ${Math.round(entry.startTime)}ms`);
                    });
                }

                // Log lazy loading statistics
                console.log(`🦋 Lazy Loading Stats:`);
                console.log(`📷 Total Images: ${this.deferredElements.size}`);
                console.log(`✅ Loaded Images: ${this.loadedElements.size}`);                console.log(`🌐 Connection Speed: ${this.connectionSpeed}`);
                console.log(`👤 User Engagement: ${this.userInteractionLevel}`);
            }, 2000);
        }
    }

    // Fallback method for browsers without Intersection Observer
    setupFallbackLoading() {
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, using fallback loading');
            
            // Load all images with a delay for older browsers
            const lazyImages = document.querySelectorAll('.gallery-photo, .dress-code-item img');
            lazyImages.forEach((img, index) => {
                setTimeout(() => {
                    this.loadImageWithAnimation(img);
                }, index * 500);
            });

            // Load map after a delay
            setTimeout(() => {
                this.loadGoogleMap();
            }, 3000);
        }
    }

    // Error recovery and retry mechanism
    retryFailedLoads() {
        const failedImages = document.querySelectorAll('.lazy-error');
        if (failedImages.length > 0) {
            console.log(`Retrying ${failedImages.length} failed image loads`);
            
            failedImages.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.remove('lazy-error');
                    this.loadImageWithAnimation(img);
                }, index * 1000);
            });
        }
    }

    pauseNonEssentialAnimations() {
        document.querySelectorAll('.butterfly').forEach(butterfly => {
            butterfly.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.butterfly').forEach(butterfly => {
            butterfly.style.animationPlayState = 'running';
        });
    }    enableLowPerformanceMode() {
        document.body.classList.add('low-performance');
        
        // Reduce butterfly count
        const butterflies = document.querySelectorAll('.butterfly');
        butterflies.forEach((butterfly, index) => {
            if (index % 2 === 0) { // Keep every other butterfly
                butterfly.style.display = 'none';
            }
        });
    }

    setupPrefetching() {
        // Only prefetch on fast connections and when page is idle
        if (this.connectionSpeed === 'fast' && 'requestIdleCallback' in window) {
            const prefetchImages = () => {
                const visibleImages = document.querySelectorAll('.gallery-photo:not(.lazy-loaded)');
                visibleImages.forEach((img, index) => {
                    // Prefetch only the next 2-3 images that are likely to be viewed soon
                    if (index < 3) {
                        requestIdleCallback(() => {
                            const prefetchLink = document.createElement('link');
                            prefetchLink.rel = 'prefetch';
                            prefetchLink.href = img.src;
                            document.head.appendChild(prefetchLink);
                        });
                    }
                });
            };

            // Start prefetching after initial load
            setTimeout(prefetchImages, 3000);
        }
    }

    setupCriticalResourceHints() {
        // Add resource hints for critical assets
        const resourceHints = [
            { rel: 'dns-prefetch', href: '//www.google.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        resourceHints.forEach(hint => {
            if (!document.querySelector(`link[href="${hint.href}"]`)) {
                const link = document.createElement('link');
                link.rel = hint.rel;
                link.href = hint.href;
                if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
                document.head.appendChild(link);
            }
        });
    }    setupLoadingPlaceholders() {
        // Add CSS for placeholders if not already present
        if (!document.querySelector('#lazy-loading-styles')) {
            const style = document.createElement('style');
            style.id = 'lazy-loading-styles';
            style.textContent = `
                .lazy-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #f3f4f6;
                    border-radius: 18px;
                    overflow: hidden;
                    z-index: 1;
                    transition: opacity 0.3s ease;
                }

                .placeholder-content {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .placeholder-content::before {
                    content: '🦋';
                    font-size: 2rem;
                    opacity: 0.3;
                    animation: float 2s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .placeholder-shimmer {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.6),
                        transparent
                    );
                    animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                .map-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #f5f3ff, #e9d5ff);
                    border-radius: 18px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                    transition: opacity 0.5s ease;
                }

                .map-placeholder-content {
                    text-align: center;
                    color: #8b5cf6;
                    font-family: 'Fredoka', 'Nunito', sans-serif;
                }

                .map-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    animation: mapPulse 2s infinite;
                }

                .map-text {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .map-shimmer {
                    width: 200px;
                    height: 4px;
                    background: #e9d5ff;
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                }

                .map-shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(139, 92, 246, 0.6),
                        transparent
                    );
                    animation: shimmer 1.5s infinite;
                }

                @keyframes mapPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .lazy-loading {
                    opacity: 0 !important;
                    transform: scale(0.95) !important;
                }

                .lazy-loaded {
                    opacity: 1 !important;
                    transform: scale(1) !important;
                    transition: all 0.6s ease-out !important;
                }

                .lazy-error {
                    opacity: 0.5 !important;
                    filter: grayscale(100%);
                }

                .low-performance .butterfly {
                    animation-duration: 20s !important;
                }

                .low-performance .cloud {
                    animation-duration: 60s !important;
                }

                /* Add smooth loading states for better UX */
                .loading-fade-in {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Network-specific optimizations */
                .connection-slow .lazy-placeholder {
                    background: linear-gradient(135deg, #fef7cd, #fbbf24);
                }                .connection-slow .placeholder-content::before {
                    content: '⏳';
                }

                /* Footer butterfly animations */
                @keyframes gentle-float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    33% { 
                        transform: translateY(-8px) rotate(2deg); 
                    }
                    66% { 
                        transform: translateY(-4px) rotate(-1deg); 
                    }
                }

                .footer-butterfly {
                    transition: all 0.3s ease;
                }

                .footer-butterfly:hover {
                    transform: scale(1.1) rotate(5deg);
                }

                /* Content loading animation */
                .content-loaded {
                    animation: slideInFromBottom 0.8s ease-out;
                }

                @keyframes slideInFromBottom {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Add connection class for CSS optimizations
        document.body.classList.add(`connection-${this.connectionSpeed}`);
          // Setup resource hints
        this.setupCriticalResourceHints();
    }

    setupContentLazyLoading() {
        // Setup lazy loading for non-critical content sections
        const lazyContentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('content-loaded');
                    
                    // Load any deferred content
                    if (element.classList.contains('footer')) {
                        this.loadFooterContent(element);
                    }
                    
                    lazyContentObserver.unobserve(element);
                }
            });
        }, { rootMargin: '50px' });

        // Observe footer and other non-critical sections
        const lazyContent = document.querySelectorAll('.footer, .dress-code-container');
        lazyContent.forEach(element => {
            lazyContentObserver.observe(element);
        });
    }

    loadFooterContent(footer) {
        // Animate footer butterflies when they come into view
        const footerButterflies = footer.querySelectorAll('.footer-butterfly');
        footerButterflies.forEach((butterfly, index) => {
            setTimeout(() => {
                butterfly.style.animation = 'gentle-float 3s ease-in-out infinite';
                butterfly.style.animationDelay = `${index * 0.5}s`;            }, index * 200);
        });
    }

    trackUserEngagement() {
        let interactionCount = 0;
        let scrollDepth = 0;
        
        const trackInteraction = () => {
            interactionCount++;
            if (interactionCount > 5) {
                this.userInteractionLevel = 'high';
                this.adjustLoadingStrategy();
            }
        };

        const trackScroll = () => {
            const currentScrollDepth = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (currentScrollDepth > scrollDepth) {
                scrollDepth = currentScrollDepth;
                if (scrollDepth > 50) {
                    this.userInteractionLevel = 'engaged';
                    this.prioritizeRemainingContent();
                }
            }
        };

        // Track various user interactions
        ['click', 'touch', 'keydown'].forEach(event => {
            document.addEventListener(event, trackInteraction, { passive: true });
        });

        document.addEventListener('scroll', trackScroll, { passive: true });
    }

    adjustLoadingStrategy() {
        if (this.userInteractionLevel === 'high' && this.connectionSpeed === 'fast') {
            // Aggressively preload remaining content
            const unloadedImages = document.querySelectorAll('.gallery-photo:not(.lazy-loaded)');
            unloadedImages.forEach((img, index) => {
                if (index < 5) { // Preload next 5 images
                    setTimeout(() => this.loadImageWithAnimation(img), index * 100);
                }
            });
        }
    }

    prioritizeRemainingContent() {
        // Load map and footer content if user is engaged
        const mapContainer = document.querySelector('.location-map');
        if (mapContainer && !mapContainer.querySelector('iframe').src) {
            this.loadGoogleMap();
        }
    }
}

// Initialize entrance animation manager
