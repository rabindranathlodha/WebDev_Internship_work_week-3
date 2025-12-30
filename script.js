/* -----------------------------------------------------------
   SECTION 1: GLOBAL VARIABLES & SELECTORS
----------------------------------------------------------- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('.contact-form');
const heroGreeting = document.querySelector('.hero h1'); // To modify the "Hi" text
const footerText = document.querySelector('footer p');

/* -----------------------------------------------------------
   SECTION 2: REUSABLE FUNCTIONS
----------------------------------------------------------- */

// FUNCTION: Toggle CSS class on an element
function toggleClass(element, className) {
    element.classList.toggle(className);
}

// FUNCTION: Remove CSS class from an element
function removeClass(element, className) {
    element.classList.remove(className);
}

// FUNCTION: Display Error Message
// Uses DOM manipulation to create or update an error message element
function showError(inputElement, message) {
    const parent = inputElement.parentElement;
    let error = parent.querySelector('.error-msg');
    
    // If error message doesn't exist, create it
    if (!error) {
        error = document.createElement('small');
        error.className = 'error-msg';
        parent.appendChild(error);
    }
    
    // DOM Manipulation: Update content and style
    error.innerText = message;
    error.style.color = "#ff6b6b";
    inputElement.style.borderColor = "#ff6b6b";
}

// FUNCTION: Clear Error Message
function clearError(inputElement) {
    const parent = inputElement.parentElement;
    const error = parent.querySelector('.error-msg');
    
    if (error) {
        error.remove(); // Remove from DOM
    }
    inputElement.style.borderColor = "#233554"; // Reset to original border color
}

// FUNCTION: Validate Email Format using Regex
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// FUNCTION: Dynamic Greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

/* -----------------------------------------------------------
   SECTION 3: INTERACTIVE FEATURES
----------------------------------------------------------- */

// FEATURE 1: Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        toggleClass(navLinks, 'active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        removeClass(navLinks, 'active');
    });
});

// FEATURE 2: Form Validation with Error Messages
if (form) {
    form.addEventListener('submit', function(e) {
        let isFormValid = true;
        
        // 1. Validate Name
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isFormValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Validate Email
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isFormValid = false;
        } else {
            clearError(emailInput);
        }

        // 3. Validate Message
        const messageInput = form.querySelector('textarea[name="message"]');
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isFormValid = false;
        } else {
            clearError(messageInput);
        }

        // If invalid, prevent submission
        if (!isFormValid) {
            e.preventDefault();
        }
    });
}

// FEATURE 3: Dynamic Content Updates (Time & Copyright)
window.addEventListener('load', () => {
    // Update Greeting (DOM Manipulation)
    // Replaces "Hi" with "Good Morning/Evening"
    if(heroGreeting) {
        const currentText = heroGreeting.innerHTML;
        const timeGreeting = getGreeting();
        // Replace the static "Hi" but keep the rest
        if(currentText.includes("Hi")) {
            heroGreeting.innerHTML = currentText.replace("Hi", timeGreeting);
        }
    }

    // Update Footer Year automatically
    const year = new Date().getFullYear();
    if(footerText) {
        footerText.innerHTML = `&copy; ${year} Alex Dev. All rights reserved.`;
    }
});

// FEATURE 4: Continuous Typewriter Effect
const words = ["Rabindranath Lodha"];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.querySelector(".typewriter");
    if (!heading) return; // Guard clause if element missing

    const currentWord = words[i];
    const currentText = heading.textContent;
    
    if (!heading.classList.contains("deleting")) {
        heading.textContent = currentWord.substring(0, currentText.length + 1);
        if (heading.textContent === currentWord) {
            heading.classList.add("deleting");
            timer = setTimeout(typeWriter, 2000);
        } else {
            timer = setTimeout(typeWriter, 150);
        }
    } else {
        heading.textContent = currentWord.substring(0, currentText.length - 1);
        if (heading.textContent === "") {
            heading.classList.remove("deleting");
            i = (i + 1) % words.length;
            timer = setTimeout(typeWriter, 500);
        } else {
            timer = setTimeout(typeWriter, 100);
        }
    }
}
window.addEventListener('load', typeWriter);

// FEATURE 5: Scroll Reveal Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));