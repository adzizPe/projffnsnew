// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('#menu');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navbarNav.classList.toggle('active');
            menuToggle.classList.toggle('bx-x');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-nav') && !e.target.closest('#menu')) {
            if (navbarNav) {
                navbarNav.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('bx-x');
            }
        }
    });
    
    // Close mobile menu when clicking on a menu item
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navbarNav) {
                navbarNav.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('bx-x');
            }
            
            // Handle home link specifically
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Make sure all sections are visible when clicking home
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.classList.add('start-animation');
                    }, 100);
                });
                
                // Update active class for navigation
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Initialize animated background with GIFs
    initAnimatedBackground();
    
    // Improved smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Show the target section if it's hidden
                    target.style.display = 'block';
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add animation class
                    setTimeout(() => {
                        target.classList.add('start-animation');
                    }, 100);
                    
                    // Update active class for navigation
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Make sure all sections are visible on initial load
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'block';
    });
    
    // Trigger animation for visible sections on load
    setTimeout(() => {
        const viewportHeight = window.innerHeight;
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom >= 0) {
                section.classList.add('start-animation');
            }
        });
    }, 300);
    
    // Add music button if an audio element exists
    if (document.getElementById("bg-music")) {
        addMusicButton();
    }
    
    // Add animated cursor effect
    document.addEventListener("mousemove", function(e) {
        createCursorEffect(e);
    });
});

// Function to add custom cursor effect
function createCursorEffect(e) {
    let cursorEffect = document.createElement("div");
    cursorEffect.classList.add("custom-cursor");
    document.body.appendChild(cursorEffect);

    cursorEffect.style.left = `${e.pageX}px`;
    cursorEffect.style.top = `${e.pageY}px`;

    setTimeout(() => {
        cursorEffect.remove();
    }, 500);
}

// Function to add music button (commented out in original, preserved for reference)
function addMusicButton() {
    var audio = document.getElementById("bg-music");
    
    if (!document.getElementById("playButton") && audio) {
        let btn = document.createElement("button");
        btn.innerText = "Play Music";
        btn.id = "playButton";
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.right = "20px";
        btn.style.padding = "10px 20px";
        btn.style.background = "#ff4757";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.style.zIndex = "9999";
        btn.style.boxShadow = "0 4px 15px rgba(255, 71, 87, 0.3)";
        btn.style.transition = "all 0.3s ease";
        
        btn.addEventListener("mouseenter", function() {
            btn.style.background = "#ff6b81";
            btn.style.transform = "translateY(-3px)";
        });
        
        btn.addEventListener("mouseleave", function() {
            btn.style.background = "#ff4757";
            btn.style.transform = "translateY(0)";
        });

        document.body.appendChild(btn);

        btn.addEventListener("click", function() {
            audio.play();
            btn.remove(); // Remove button after playing
        });
    }
}

// Function to initialize animated background with GIFs
function initAnimatedBackground() {
    // Array of GIF paths - replace with your actual paths
    const images = [
        "assets/animasi0.gif",
        "assets/animasi1.gif",
        "assets/animasi2.gif",
        "assets/animasi3.gif",
        "assets/animasi4.gif",
        "assets/animasi5.gif",
        "assets/animasi6.gif",
        "assets/animasi7.gif",
        "assets/animasi8.gif",
        "assets/animasi9.gif",
        "assets/animasi10.gif",
        "assets/animasi11.gif",
        "assets/animasi12.gif"
    ];
    
    // Create or get the background container
    let bgContainer = document.querySelector('.animated-bg');
    if (!bgContainer) {
        bgContainer = document.createElement("div");
        bgContainer.classList.add("animated-bg");
        document.body.appendChild(bgContainer);
    }
    
    // Function to create and add GIF elements
    function createBgElement() {
        let bgImage = document.createElement("img");
        
        // Select a random image from the array
        bgImage.src = images[Math.floor(Math.random() * images.length)];
        
        // Position the image randomly along the width
        bgImage.style.left = Math.random() * window.innerWidth + "px";
        bgImage.style.top = "-60px"; // Start above the viewport
        
        // Set random animation duration for varied movement
        const duration = 15 + Math.random() * 10; // 15-25 seconds
        bgImage.style.animationDuration = duration + "s";
        
        // Add loading and error handling
        bgImage.onload = () => {
            bgContainer.appendChild(bgImage);
            
            // Remove image after animation completes
            setTimeout(() => {
                bgImage.remove();
            }, duration * 1000); // Convert to milliseconds
        };
        
        bgImage.onerror = () => {
            console.error("Failed to load GIF:", bgImage.src);
        };
    }
    
    // Start adding GIFs at intervals
    setInterval(createBgElement, 1500); // Add new GIF every 1.5 seconds
    
    // Add initial GIFs
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBgElement();
        }, i * 300); // Stagger the initial GIFs
    }
}

// Improved section animation on scroll
window.onscroll = function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const header = document.querySelector('.navbar');
    
    // Add sticky class to header
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
    
    // Animate sections when they come into view
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top > offset && top < offset + height) {
            // Make sure section is visible
            sec.style.display = 'block';
            sec.classList.add('start-animation');
            
            // Highlight active navigation link
            if (id) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
    
    // Check if scrolled to top, then highlight home link
    if (window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
    
    // Parallax effect on scroll
    const scrollPosition = window.scrollY;
    
    // Hero parallax effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.display = 'block'; // Ensure hero is always visible
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    }
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.feature-card, .footer-about, .footer-links, .footer-social');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// JavaScript for managing ad section
document.addEventListener('DOMContentLoaded', function() {
    // Setting up video placeholders to be clickable
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
      placeholder.addEventListener('click', function() {
        const parent = this.parentElement;
        const videoSrc = this.getAttribute('data-video-src') || 'path/to/default-video.mp4';
        
        // Create new video element
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.src = videoSrc;
        video.poster = this.querySelector('img').src;
        video.className = 'ad-video';
        
        // Replace placeholder with actual video
        parent.replaceChild(video, this);
      });
    });
    
    // Function for ad rotation (if needed)
    function rotateAds() {
      const adSlots = document.querySelectorAll('.ad-slot');
      adSlots.forEach(slot => {
        // Example logic for ad rotation based on time or events
        // This can be implemented according to needs
      });
    }
    
    // Example of fetching ads from API (can be customized)
    async function fetchAds() {
      try {
        // Example: const response = await fetch('/api/ads');
        // const ads = await response.json();
        // Then place ads in appropriate slots
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    }
    
    // Example function for admins to add ads (for implementation in admin panel)
    function createAdPlaceholder(config) {
      // Example config: {type: 'image', src: 'image.jpg', link: 'https://...', sponsor: 'Name'}
      const adSlot = document.createElement('div');
      adSlot.className = 'ad-slot';
      adSlot.setAttribute('data-size', config.size || 'medium');
      
      // Create ad structure
      const adContent = document.createElement('div');
      adContent.className = 'ad-content';
      
      if (config.type === 'video') {
        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.setAttribute('data-video-src', config.src);
        
        const thumbnail = document.createElement('img');
        thumbnail.src = config.thumbnail || config.src.replace('.mp4', '-thumb.jpg');
        thumbnail.alt = config.sponsor + ' Video';
        
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '<i class="fas fa-play-circle"></i>';
        
        placeholder.appendChild(thumbnail);
        placeholder.appendChild(playIcon);
        adContent.appendChild(placeholder);
      } else {
        // Default: image
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.sponsor + ' Advertisement';
        adContent.appendChild(img);
      }
      
      // Ad info
      const adInfo = document.createElement('div');
      adInfo.className = 'ad-info';
      
      const sponsor = document.createElement('span');
      sponsor.className = 'ad-sponsor';
      sponsor.textContent = config.sponsor;
      
      const cta = document.createElement('a');
      cta.className = 'ad-cta';
      cta.href = config.link || '#';
      cta.textContent = config.ctaText || 'Info';
      
      adInfo.appendChild(sponsor);
      adInfo.appendChild(cta);
      
      // Assemble everything
      adSlot.appendChild(adContent);
      adSlot.appendChild(adInfo);
      
      return adSlot;
    }
    
    // Example usage:
    // const newAd = createAdPlaceholder({
    //   type: 'image',
    //   src: 'path/to/ad.jpg',
    //   sponsor: 'New Sponsor',
    //   link: 'https://example.com',
    //   ctaText: 'Visit',
    //   size: 'medium'
    // });
    // document.querySelector('.ad-grid').appendChild(newAd);
    
    // Function for ad analytics (simple example)
    function trackAdClick(adElement, sponsorName) {
      adElement.addEventListener('click', function() {
        console.log(`Ad click tracked: ${sponsorName}`);
        // Here you can add code for analytics tracking
        // For example: gtag('event', 'ad_click', {'sponsor': sponsorName});
      });
    }
    
    // Tracking for all existing ads
    document.querySelectorAll('.ad-slot').forEach(ad => {
      const sponsor = ad.querySelector('.ad-sponsor');
      if (sponsor) {
        trackAdClick(ad.querySelector('.ad-cta'), sponsor.textContent);
      }
    });
});