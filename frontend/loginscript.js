document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Toggle forms
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

    // ✅ Backend API base URL
    const API_BASE = "http://localhost:8080/auth";

    // ✅ Save token helper
    function saveToken(token) {
        if (token) {
            localStorage.setItem("token", token);
            console.log("🔑 Token saved:", token);
        } else {
            console.error("❌ No token received from backend");
        }
    }

    
    // ✅ Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok && data.token) {
                saveToken(data.token); // save JWT
                
                // --- ADD THIS LINE ---
                // Save the user object to localStorage so other pages can access it
                localStorage.setItem("user", JSON.stringify(data.user)); 
                
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.className = "message success";
                setTimeout(() => {
                    window.location.href = "studentprofile.html";
                }, 1000);
            } else {
                loginMessage.textContent = data.message || "Login failed";
                loginMessage.className = "message error";
            }
        } catch (err) {
            console.error("❌ Login error:", err);
            loginMessage.textContent = "Server error, please try again.";
            loginMessage.className = "message error";
        }
    });


    // ✅ Register
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const stream = document.getElementById('register-stream').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match";
            registerMessage.className = "message error";
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, stream })
            });
            const data = await res.json();

            if (res.ok && data.token) {
                // ✅ Optional: Auto-login after signup
                saveToken(data.token);
                registerMessage.textContent = "Signup successful! Redirecting...";
                registerMessage.className = "message success";
                setTimeout(() => {
                    window.location.href = "studentprofile.html";
                }, 1000);
            } else if (res.ok) {
                registerMessage.textContent = "Registration successful! You can now log in.";
                registerMessage.className = "message success";
                setTimeout(() => {
                    registerForm.reset();
                    loginToggle.click(); // switch to login form
                }, 2000);
            } else {
                registerMessage.textContent = data.message || "Registration failed";
                registerMessage.className = "message error";
            }
        } catch (err) {
            console.error("❌ Signup error:", err);
            registerMessage.textContent = "Server error, please try again.";
            registerMessage.className = "message error";
        }
    });
});
