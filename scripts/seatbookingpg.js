// Select all the showtime elements
const showtimeElements = document.querySelectorAll('.showtime');

// Handle showtime selection
showtimeElements.forEach(showtime => {
    showtime.addEventListener('click', () => {
        // Remove the 'selected' class from all showtime elements
        showtimeElements.forEach(st => st.classList.remove('selected'));
        // Add the 'selected' class to the clicked showtime element
        showtime.classList.add('selected');
    });
});

// Select all seat elements
const seatElements = document.querySelectorAll('.seat:not(.sold)');

// Array to store selected seats
let selectedSeats = [];

// Handle seat selection
seatElements.forEach(seat => {
    seat.addEventListener('click', () => {
        // Toggle the 'selected' class for the clicked seat
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            // Remove the seat number from the selectedSeats array
            selectedSeats = selectedSeats.filter(s => s !== seat.textContent);
        } else {
            seat.classList.add('selected');
            // Add the seat number to the selectedSeats array
            selectedSeats.push(seat.textContent);
        }
        
        // Update the pay button based on selected seats
        updatePayButton();
    });
});

// Function to update the pay button text
function updatePayButton() {
    const payButton = document.querySelector('.pay-button button');
    const selectedCount = selectedSeats.length;
    if (selectedCount > 0) {
        // Calculate the total price based on seat types and counts
        const totalPrice = calculateTotalPrice();
        payButton.textContent = `Pay Rs. ${totalPrice} for ${selectedCount} seat(s)`;
    } else {
        payButton.textContent = 'Pay';
    }
}

// Function to calculate total price based on selected seats
function calculateTotalPrice() {
    let totalPrice = 0;
    selectedSeats.forEach(seatNumber => {
        const seatElement = document.querySelector(`.seat.selected:nth-child(${seatNumber})`);
        if (seatElement.classList.contains('vip')) {
            totalPrice += 520;
        } else if (seatElement.classList.contains('premium')) {
            totalPrice += 320;
        } else if (seatElement.classList.contains('executive')) {
            totalPrice += 300;
        }
    });
    return totalPrice;
}

// Add functionality to reset seats on page load
function resetSelection() {
    seatElements.forEach(seat => seat.classList.remove('selected'));
    selectedSeats = [];
    updatePayButton();
}

// Call resetSelection on page load
window.addEventListener('load', resetSelection);

// Function to save selected seats to the database
function saveSelectedSeats() {
    const selectedSeatDetails = selectedSeats.map(seatNumber => {
        const seatElement = document.querySelector(`.seat.selected:nth-child(${seatNumber})`);
        let category = 'Standard';
        if (seatElement.classList.contains('vip')) category = 'VIP';
        else if (seatElement.classList.contains('premium')) category = 'Premium';
        else if (seatElement.classList.contains('executive')) category = 'Executive';

        return {
            seatNumber,
            category,
        };
    });

    const selectedShowtime = document.querySelector('.showtime.selected').textContent;

    fetch('/api/save-seats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selectedSeats: selectedSeatDetails,
            showtime: selectedShowtime,
        }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Notify the user
            window.location.href = '/paymentpage';
        })
        .catch(error => {
            console.error('Error saving seats:', error);
        });
}


document.querySelector('.pay-button button').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    saveSelectedSeats();
});
