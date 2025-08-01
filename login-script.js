// DOM Elements
const roleSelection = document.getElementById('roleSelection');
const loginForm = document.getElementById('loginForm');
const loginTitle = document.getElementById('loginTitle');
const loginSubtitle = document.getElementById('loginSubtitle');
const backToRoles = document.getElementById('backToRoles');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginButton = document.getElementById('loginForm');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

let currentRole = '';

// Role Selection
document.querySelectorAll('.btn-role').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const roleCard = button.closest('.role-card');
        const role = roleCard.dataset.role;
        
        // Set current role
        currentRole = role;
        
        // Update form title and subtitle based on role
        switch(role) {
            case 'user':
                loginTitle.textContent = 'User Login';
                loginSubtitle.textContent = 'Sign in to view and download documents';
                break;
            case 'admin':
                loginTitle.textContent = 'Admin Login';
                loginSubtitle.textContent = 'Sign in to upload and manage documents';
                break;
            case 'superuser':
                loginTitle.textContent = 'Super User Login';
                loginSubtitle.textContent = 'Sign in for full system administration';
                break;
        }
        
        // Hide role selection and show login form
        roleSelection.style.display = 'none';
        loginForm.style.display = 'block';
    });
});

// Back to roles button
backToRoles.addEventListener('click', () => {
    loginForm.style.display = 'none';
    roleSelection.style.display = 'flex';
    currentRole = '';
    
    // Clear form
    emailInput.value = '';
    passwordInput.value = '';
    clearErrors();
});

// Password toggle
passwordToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = passwordToggle.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function clearErrors() {
    clearError(emailError);
    clearError(passwordError);
}

// Real-time validation
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
    } else {
        clearError(emailError);
    }
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    console.log('Password input:', password); // Debug log
    if (password && !validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters');
    } else {
        clearError(passwordError);
    }
});

// Ensure password input is focusable and working
passwordInput.addEventListener('focus', () => {
    console.log('Password field focused');
});

passwordInput.addEventListener('blur', () => {
    console.log('Password field blurred');
});

// Prevent any interference with password field
passwordInput.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Password field clicked');
});

// Prevent form from stealing focus
loginForm.addEventListener('focusin', (e) => {
    if (e.target === passwordInput) {
        console.log('Password field gained focus naturally');
    }
});

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    if (!email) {
        showError(emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordError, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check for specific test credentials
    const testEmail = 'ayushsahu.ai22@bmsce.ac.in';
    const testPassword = 'pass1234';
    
    if (email === testEmail && password === testPassword) {
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Store user info in localStorage
            const userInfo = {
                email: email,
                role: currentRole,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('bmsceUser', JSON.stringify(userInfo));
            
            // Show success message
            showSuccessMessage();
            
            // Redirect to departments page after a short delay
            setTimeout(() => {
                window.location.href = 'departments.html';
            }, 1000);
            
        } catch (error) {
            console.error('Login error:', error);
            showError(emailError, 'Login failed. Please try again.');
            
            // Reset button state
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    } else {
        // Show error for invalid credentials
        showError(emailError, 'Invalid email or password. Please use: ayushsahu.ai22@bmsce.ac.in / pass1234');
        
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
});

// Success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Login successful! Redirecting...</span>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #059669;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginForm.style.display === 'block') {
        backToRoles.click();
    }
});

// Remove auto-focus behavior that interferes with password field

// Remember me functionality
const rememberCheckbox = document.getElementById('remember');
const savedEmail = localStorage.getItem('rememberedEmail');

if (savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
}

rememberCheckbox.addEventListener('change', () => {
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

// Forgot password functionality
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Please contact the IT department to reset your password.');
});

// Social login buttons (if they exist)
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social login functionality will be implemented in the full version.');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const userInfo = localStorage.getItem('bmsceUser');
    if (userInfo) {
        // Redirect to departments page
        window.location.href = 'departments.html';
    }
}); 