document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');

    // --- Correct Credentials (FOR DEMO PURPOSES) ---
    // In a real application, you would never store this in the front-end.
    // This would be checked by sending the data to a secure backend server.
    const CORRECT_EMAIL = "student@example.com";
    const CORRECT_PASSWORD = "password123";

    // --- Toggle Form Logic ---
    registerToggle.addEventListener('click', () => {
        loginToggle.classList.remove('active');
        registerToggle.classList.add('active');
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    loginToggle.addEventListener('click', () => {
        registerToggle.classList.remove('active');
        loginToggle.classList.add('active');
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // --- Helper Functions for Validation ---
    const setError = (input, message) => {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector('small.error-text');
        formGroup.classList.add('error');
        errorText.innerText = message;
    };

    const setSuccess = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        const errorText = formGroup.querySelector('small.error-text');
        errorText.innerText = '';
    };
    
    // --- UPDATED Login Form Validation Logic ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from reloading the page

        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        let isLoginValid = true;

        // Reset previous error messages
        setSuccess(emailInput);
        setSuccess(passwordInput);
        loginMessage.textContent = '';
        loginMessage.className = 'message';

        // Check if fields are empty
        if (emailValue === '') {
            setError(emailInput, 'Email is required');
            isLoginValid = false;
        }

        if (passwordValue === '') {
            setError(passwordInput, 'Password is required');
            isLoginValid = false;
        }

        // If both fields are filled, then check credentials
        if (isLoginValid) {
            if (emailValue === CORRECT_EMAIL && passwordValue === CORRECT_PASSWORD) {
                // --- SUCCESS ---
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.classList.add('success');
                
                // Simulate redirecting to the next page (e.g., dashboard.html)
                setTimeout(() => {
                    // In a real application, you would redirect like this:
                    // window.location.href = '/dashboard.html'; 
                    alert('Successfully logged in! You would now be taken to your dashboard.');
                    loginForm.reset();
                    loginMessage.textContent = '';
                }, 2000);

            } else {
                // --- FAILURE ---
                loginMessage.textContent = 'Invalid email or password. Please try again.';
                loginMessage.classList.add('error');
            }
        }
    });

    // (The registration form logic can remain the same as before)
    // ...
});