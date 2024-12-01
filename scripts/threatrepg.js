// Select the elements for the days, languages, and showtimes
const days = document.querySelectorAll('.days div');
const languages = document.querySelectorAll('.language div');
const showtimes = document.querySelectorAll('.theater .showtimes div');

// Function to handle active day selection
function handleDayClick(event) {
    // Clear the active class from all days
    days.forEach(day => day.classList.remove('active'));
    
    // Add active class to the clicked day
    event.currentTarget.classList.add('active');
}

// Function to handle active language selection
function handleLanguageClick(event) {
    // Clear the active class from all languages
    languages.forEach(language => language.classList.remove('active'));
    
    // Add active class to the clicked language
    event.currentTarget.classList.add('active');
}

// Function to handle active showtime selection
function handleShowtimeClick(event) {
    // Remove the active class from all showtimes across all theaters
    showtimes.forEach(showtime => showtime.classList.remove('active'));
    
    // Add active class to the clicked showtime
    event.currentTarget.classList.add('active');
}

// Add event listeners for day selection
days.forEach(day => {
    day.addEventListener('click', handleDayClick);
});

// Add event listeners for language selection
languages.forEach(language => {
    language.addEventListener('click', handleLanguageClick);
});

// Add event listeners for showtime selection
showtimes.forEach(showtime => {
    showtime.addEventListener('click', handleShowtimeClick);
}); 