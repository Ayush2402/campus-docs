// Department Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userInfo = localStorage.getItem('bmsceUser');
    if (!userInfo) {
        window.location.href = 'login.html';
        return;
    }

    // Parse user info
    const currentUser = JSON.parse(userInfo);
    const userRole = currentUser.role;
    
    // Get selected department from session storage
    const selectedDepartment = sessionStorage.getItem('selectedDepartment');
    if (!selectedDepartment) {
        window.location.href = 'departments.html';
        return;
    }

    // Update page content based on selected department
    updateDepartmentPage(selectedDepartment, userRole);

    // Event listeners
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Add event listeners for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Quick action buttons
    document.getElementById('uploadBtn').addEventListener('click', handleUpload);
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('recentBtn').addEventListener('click', handleRecent);
    document.getElementById('downloadBtn').addEventListener('click', handleBulkDownload);
});

function updateDepartmentPage(department, userRole) {
    // Update page title
    document.title = `BMSCE CAMPUS DOC - ${department}`;
    
    // Update breadcrumb
    document.querySelector('.current-dept').textContent = department;
    
    // Update header
    document.querySelector('.dept-details h1').textContent = department;
    document.querySelector('.dept-details p').textContent = `Access and manage ${department} department documents`;
    
    // Update user role display
    document.getElementById('userRole').textContent = userRole;
    
    // Update department icon based on department
    updateDepartmentIcon(department);
    
    // Show/hide features based on user role
    updateFeaturesByRole(userRole);
}

function updateDepartmentIcon(department) {
    const iconElement = document.querySelector('.dept-icon-large i');
    
    // Map departments to icons
    const departmentIcons = {
        'Civil Engineering': 'fas fa-car',
        'Mechanical Engineering': 'fas fa-cogs',
        'Electrical and Electronics Engineering': 'fas fa-bolt',
        'Electronics and Communication Engineering': 'fas fa-broadcast-tower',
        'Industrial Engineering and Management': 'fas fa-industry',
        'Computer Science and Engineering': 'fas fa-laptop-code',
        'Electronics and Telecommunication Engineering': 'fas fa-satellite-dish',
        'Information Science and Engineering': 'fas fa-database',
        'Electronics and Instrumentation Engineering': 'fas fa-microchip',
        'Medical Electronics Engineering': 'fas fa-heartbeat',
        'Chemical Engineering': 'fas fa-flask',
        'Biotechnology': 'fas fa-dna',
        'Aerospace Engineering': 'fas fa-plane',
        'Computer Applications (MCA)': 'fas fa-desktop',
        'Machine Learning (AI and ML)': 'fas fa-brain',
        'Computer Science and Engineering (DS)': 'fas fa-chart-line',
        'Computer Science and Engineering (IoT and CS)': 'fas fa-wifi',
        'Artificial Intelligence and Data Science': 'fas fa-robot',
        'Computer Science and Business Systems': 'fas fa-briefcase',
        'Management Studies and Research Centre': 'fas fa-users',
        'Mathematics Department': 'fas fa-square-root-alt',
        'Physics Department': 'fas fa-atom',
        'Chemistry Department': 'fas fa-flask-vial'
    };
    
    if (departmentIcons[department]) {
        iconElement.className = departmentIcons[department];
    }
}

function updateFeaturesByRole(userRole) {
    const uploadBtn = document.getElementById('uploadBtn');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    // Hide upload functionality for regular users
    if (userRole === 'User') {
        uploadBtn.style.display = 'none';
        // Also hide upload-related quick actions
        actionBtns.forEach(btn => {
            if (btn.querySelector('i').classList.contains('fa-upload')) {
                btn.style.display = 'none';
            }
        });
    }
}

function handleCategoryClick(event) {
    const categoryCard = event.currentTarget;
    const category = categoryCard.getAttribute('data-category');
    const department = sessionStorage.getItem('selectedDepartment');
    
    // Store category info for next page
    sessionStorage.setItem('selectedCategory', category);
    sessionStorage.setItem('selectedDepartment', department);
    
    // Show loading state
    categoryCard.style.opacity = '0.7';
    categoryCard.querySelector('.btn-access').textContent = 'Loading...';
    
    // Simulate API call
    setTimeout(() => {
        // For now, show an alert with the category info
        // In a real app, this would navigate to a document list page
        alert(`Accessing ${category} documents for ${department} department.\n\nThis would open a document list page with:\n- Document search\n- Filter by year\n- Download options\n- Document preview`);
        
        // Reset button
        categoryCard.style.opacity = '1';
        categoryCard.querySelector('.btn-access').textContent = 'Access Documents';
    }, 1000);
}

function handleLogout() {
    // Clear all storage
    localStorage.removeItem('bmsceUser');
    sessionStorage.clear();
    
    // Redirect to login
    window.location.href = 'login.html';
}

function handleUpload() {
    const userInfo = JSON.parse(localStorage.getItem('bmsceUser'));
    if (userInfo.role === 'User') {
        alert('Upload functionality is only available for Admin and Super User roles.');
        return;
    }
    
    alert('Upload functionality would open here.\n\nFeatures:\n- File selection\n- Category selection\n- Year selection\n- Filename validation (UPPERCASE)\n- Upload progress');
}

function handleScan() {
    const userInfo = JSON.parse(localStorage.getItem('bmsceUser'));
    if (userInfo.role === 'User') {
        alert('Scan functionality is only available for Admin and Super User roles.');
        return;
    }
    
    // Open scan modal
    const scanModal = document.getElementById('scanModal');
    scanModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset modal to first step
    resetScanModal();
    
    // Start scanner detection
    detectScanners();
}
function handleSearch() {
    alert('Search functionality would open here.\n\nFeatures:\n- Search by document name\n- Filter by category\n- Filter by year\n- Advanced search options');
}

function handleRecent() {
    alert('Recent documents would be displayed here.\n\nFeatures:\n- Recently accessed documents\n- Quick access to frequently used files\n- Last modified dates');
}

function handleBulkDownload() {
    alert('Bulk download functionality would open here.\n\nFeatures:\n- Select multiple documents\n- Download as ZIP\n- Progress tracking\n- Download history');
}

// Add some visual feedback for category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}); 