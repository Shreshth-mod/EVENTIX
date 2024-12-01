// Utility function to debounce user input (for search)
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Search functionality: filters cards based on the input query
function searchCards(query) {
    const cards = document.querySelectorAll('.card');
    query = query.toLowerCase();

    cards.forEach(card => {
        const titleElement = card.querySelector('.card-title');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        if (title.includes(query) || query === "") {
            card.style.display = "block";  // Show matching cards
        } else {
            card.style.display = "none";  // Hide non-matching cards
        }
    });
}

// Handle the hover effect on cards to add scaling and shadow effects
function addHoverEffect(card) {
    card.addEventListener('mouseenter', () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
    });
}

// Handle geolocation and display the location or a fallback message
function getLocation() {
    const locationElement = document.querySelector('.location');
    if (!locationElement) return; // Ensure locationElement exists

    // Check if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const { latitude, longitude } = position.coords;
                locationElement.textContent = `Location: Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            function (error) {
                // Handle geolocation errors
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.textContent = "Location: Permission denied. Please allow geolocation access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.textContent = "Location: Position unavailable. Unable to retrieve your location.";
                        break;
                    case error.TIMEOUT:
                        locationElement.textContent = "Location: Request timed out. Please try again.";
                        break;
                    default:
                        locationElement.textContent = "Location: An unknown error occurred.";
                        break;
                }
            }
        );
    } else {
        locationElement.textContent = "Location: Geolocation is not supported by this browser.";
    }
}

// Redirect user to the corresponding page on signup or login
function handleAuthButtonClick(action) {
    const redirectUrls = {
        signup: 'signup.html',
        login: 'login.html',
    };
    window.location.href = redirectUrls[action] || '#';
}

// Initialize all event listeners
function initializeEventListeners() {
    // Search functionality with debounce
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((event) => searchCards(event.target.value), 300));
    }

    // Hover effects on cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => addHoverEffect(card));

    // Geolocation
    getLocation();

    // Auth button actions (Sign up / Log in)
    const signupButton = document.querySelector('.auth-buttons .signup');
    const loginButton = document.querySelector('.auth-buttons .login');
    if (signupButton) signupButton.addEventListener('click', () => handleAuthButtonClick('signup'));
    if (loginButton) loginButton.addEventListener('click', () => handleAuthButtonClick('login'));
}

// Run initialization on page load
document.addEventListener('DOMContentLoaded', initializeEventListeners);
