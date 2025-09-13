document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const adminLoginForm = document.getElementById('admin-login-form');
    const loginMessage = document.getElementById('login-message');

    // --- Hard-coded Admin Credentials (for demonstration only) ---
    // In a real application, NEVER store credentials in client-side code.
    // This should be validated on a secure server.
    const CORRECT_ADMIN_ID = 'admin';
    const CORRECT_ADMIN_PASS = 'P@ssword!2025';

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
        errorText.innerText = ''; // Clear error message
    };
    
    // --- Admin Login Form Submission ---
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        
        let isValid = true;
        const adminIdInput = document.getElementById('admin-id');
        const adminPasswordInput = document.getElementById('admin-password');
        
        const adminIdValue = adminIdInput.value.trim();
        const adminPasswordValue = adminPasswordInput.value.trim();

        // Reset previous states
        setSuccess(adminIdInput);
        setSuccess(adminPasswordInput);
        loginMessage.textContent = '';
        loginMessage.className = 'message';

        // Validate inputs
        if (adminIdValue === '') {
            setError(adminIdInput, 'Admin ID is required');
            isValid = false;
        }

        if (adminPasswordValue === '') {
            setError(adminPasswordInput, 'Password is required');
            isValid = false;
        }

        // If inputs are not empty, check credentials
        if (isValid) {
            if (adminIdValue === CORRECT_ADMIN_ID && adminPasswordValue === CORRECT_ADMIN_PASS) {
                // Successful login
                loginMessage.textContent = 'Login Successful! Redirecting to dashboard...';
                loginMessage.classList.add('success');
                
                console.log('Admin authentication successful.');

                // Simulate redirect to the admin dashboard after 2 seconds
                setTimeout(() => {
                    // In a real application, you would redirect to the admin panel
                    // window.location.href = '/admin/dashboard.html';
                    alert('Redirecting to Admin Dashboard!');
                    adminLoginForm.reset();
                    loginMessage.textContent = '';
                }, 2000);

            } else {
                // Failed login
                loginMessage.textContent = 'Invalid credentials. Please try again.';
                loginMessage.classList.add('error');
                console.error('Admin authentication failed: Invalid credentials.');
            }
        }
    });
});