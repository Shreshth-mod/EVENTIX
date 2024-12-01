// Select elements for the payment options and methods
const paymentOptions = document.querySelectorAll('.payment-options ul li');
const paymentMethods = document.querySelectorAll('.payment-method');

// Variables to hold pricing details (these can be dynamically adjusted)
let subtotal = 640;
let convenienceFee = 21;

// Highlight selected payment option
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove 'active' class from all options
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        // Add 'active' class to the clicked option
        option.classList.add('active');
    });
});

// Highlight selected payment method
paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        // Remove 'active' class from all methods
        paymentMethods.forEach(meth => meth.classList.remove('active'));
        // Add 'active' class to the clicked method
        method.classList.add('active');
        
        // Display confirmation for selected method (can be replaced with actual payment process)
        confirmPayment(method.querySelector('span').textContent);
    });
});

// Function to confirm payment with selected method
function confirmPayment(methodName) {
    alert(`You selected ${methodName}. Please proceed to payment.`);
}

// Calculate total payable amount and update UI
function updateAmountPayable() {
    const totalAmount = subtotal + convenienceFee;
    document.querySelector('.amount-payable').textContent = `Amount Payable Rs. ${totalAmount}`;
    document.querySelector('.price-breakdown .total span').textContent = `Rs. ${totalAmount}`;
}

// Call updateAmountPayable on page load
window.addEventListener('load', updateAmountPayable);
