// DOM Elements
const userRoleElement = document.getElementById('userRole');
const logoutBtn = document.getElementById('logoutBtn');
const departmentCards = document.querySelectorAll('.department-card');

// User session management
let currentUser = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('bmsceUser');
    if (!userInfo) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Parse user info
    currentUser = JSON.parse(userInfo);
    
    // Update UI with user role
    updateUserInterface();
    
    // Add event listeners
    setupEventListeners();
});

// Update user interface based on role
function updateUserInterface() {
    if (!currentUser) return;
    
    // Update role display
    const roleDisplay = {
        'user': 'User',
        'admin': 'Admin',
        'superuser': 'Super User'
    };
    
    userRoleElement.textContent = roleDisplay[currentUser.role] || 'User';
    
    // Add role-specific styling
    userRoleElement.className = `user-role role-${currentUser.role}`;
}

// Setup event listeners
function setupEventListeners() {
    // Logout functionality
    logoutBtn.addEventListener('click', handleLogout);
    
    // Department card clicks
    departmentCards.forEach(card => {
        card.addEventListener('click', handleDepartmentClick);
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Handle department card click
function handleDepartmentClick(e) {
    const card = e.currentTarget;
    const departmentCode = card.dataset.dept;
    const departmentName = card.querySelector('h3').textContent;
    
    // Add loading state
    card.classList.add('loading');
    
    // Store department info in session
    sessionStorage.setItem('selectedDepartment', departmentName);
    
    // Simulate loading delay
    setTimeout(() => {
        // Navigate to department page
        window.location.href = 'department-page.html';
    }, 500);
}

// Handle logout
function handleLogout() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('bmsceUser');
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    switch(e.key) {
        case 'Escape':
            // Go back to login
            window.location.href = 'login.html';
            break;
        case 'Enter':
            // If a department card is focused, click it
            const focusedCard = document.querySelector('.department-card:focus');
            if (focusedCard) {
                focusedCard.click();
            }
            break;
    }
}

// Add focus management for accessibility
departmentCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Access ${card.querySelector('h3').textContent} documents`);
    
    // Add focus styles
    card.addEventListener('focus', () => {
        card.style.outline = '2px solid #059669';
        card.style.outlineOffset = '2px';
    });
    
    card.addEventListener('blur', () => {
        card.style.outline = 'none';
    });
});

// Add search functionality (for future implementation)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search departments...';
    searchInput.className = 'search-input';
    
    // Add search input to page header
    const pageHeader = document.querySelector('.page-header .container');
    pageHeader.appendChild(searchInput);
    
    // Add search event listener
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        departmentCards.forEach(card => {
            const departmentName = card.querySelector('h3').textContent.toLowerCase();
            const departmentDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (departmentName.includes(searchTerm) || departmentDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Add department statistics (for future implementation)
function addDepartmentStats() {
    const stats = {
        'CV': { documents: 45, lastUpdated: '2 days ago' },
        'MECH': { documents: 38, lastUpdated: '1 day ago' },
        'EEE': { documents: 52, lastUpdated: '3 days ago' },
        'ECE': { documents: 41, lastUpdated: '1 week ago' },
        'IEM': { documents: 29, lastUpdated: '4 days ago' },
        'CSE': { documents: 67, lastUpdated: '1 day ago' },
        'ETE': { documents: 33, lastUpdated: '2 days ago' },
        'ISE': { documents: 48, lastUpdated: '5 days ago' },
        'EIE': { documents: 36, lastUpdated: '1 week ago' },
        'MEE': { documents: 25, lastUpdated: '3 days ago' },
        'CHEM': { documents: 31, lastUpdated: '2 days ago' },
        'BT': { documents: 28, lastUpdated: '1 week ago' },
        'AERO': { documents: 22, lastUpdated: '4 days ago' },
        'MCA': { documents: 35, lastUpdated: '1 day ago' },
        'AI_ML': { documents: 42, lastUpdated: '2 days ago' },
        'CSE_DS': { documents: 39, lastUpdated: '3 days ago' },
        'CSE_IOT': { documents: 44, lastUpdated: '1 day ago' },
        'AIDS': { documents: 51, lastUpdated: '2 days ago' },
        'CSBS': { documents: 37, lastUpdated: '1 week ago' },
        'MSRC': { documents: 26, lastUpdated: '5 days ago' },
        'MATH': { documents: 23, lastUpdated: '1 week ago' },
        'PHYSICS': { documents: 19, lastUpdated: '3 days ago' },
        'CHEMISTRY': { documents: 21, lastUpdated: '2 days ago' }
    };
    
    // Add stats to department cards
    departmentCards.forEach(card => {
        const deptCode = card.dataset.dept;
        const deptStats = stats[deptCode];
        
        if (deptStats) {
            const statsDiv = document.createElement('div');
            statsDiv.className = 'dept-stats';
            statsDiv.innerHTML = `
                <span class="doc-count">${deptStats.documents} documents</span>
                <span class="last-updated">Updated ${deptStats.lastUpdated}</span>
            `;
            
            card.appendChild(statsDiv);
        }
    });
}

// Add role-based permissions
function addRoleBasedPermissions() {
    if (!currentUser) return;
    
    // Hide certain features based on role
    if (currentUser.role === 'user') {
        // Users can only view documents
        departmentCards.forEach(card => {
            card.querySelector('p').textContent += ' (View Only)';
        });
    } else if (currentUser.role === 'admin') {
        // Admins can upload and manage
        departmentCards.forEach(card => {
            card.querySelector('p').textContent += ' (Upload & Manage)';
        });
    } else if (currentUser.role === 'superuser') {
        // Super users have full access
        departmentCards.forEach(card => {
            card.querySelector('p').textContent += ' (Full Access)';
        });
    }
}

// Add breadcrumb navigation
function addBreadcrumbNavigation() {
    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.innerHTML = `
        <a href="index.html">Home</a>
        <span class="separator">/</span>
        <span class="current">Departments</span>
    `;
    
    const pageHeader = document.querySelector('.page-header .container');
    pageHeader.insertBefore(breadcrumb, pageHeader.firstChild);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add these features after basic initialization
    setTimeout(() => {
        addSearchFunctionality();
        addDepartmentStats();
        addRoleBasedPermissions();
        addBreadcrumbNavigation();
    }, 100);
});

// Add CSS for new features
const additionalStyles = `
    .search-input {
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 0.875rem;
        margin-top: 1rem;
    }
    
    .dept-stats {
        margin-top: 1rem;
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .doc-count {
        display: block;
        font-weight: 600;
        color: #059669;
    }
    
    .last-updated {
        display: block;
        font-size: 0.7rem;
    }
    
    .breadcrumb {
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    
    .breadcrumb a {
        color: #059669;
        text-decoration: none;
    }
    
    .breadcrumb .separator {
        margin: 0 0.5rem;
        color: #6b7280;
    }
    
    .breadcrumb .current {
        color: #6b7280;
    }
    
    .role-user { background: #059669; }
    .role-admin { background: #dc2626; }
    .role-superuser { background: #7c3aed; }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 