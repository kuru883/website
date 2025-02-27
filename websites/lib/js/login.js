document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission and page refresh

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Show the alert box with animation
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.add('show'); // Show the alert with animation

    // Optionally, hide the alert after a few seconds with slide-out animation
    setTimeout(() => {
        alertBox.classList.remove('show'); // Hide the alert
        alertBox.classList.add('hide'); // Apply slide-out animation
    }, 3000); // Keep alert visible for 3 seconds
});
