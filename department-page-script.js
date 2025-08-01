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

// Scan Modal Functionality
let currentStep = 1;
let maxSteps = 4;
let selectedScanner = null;
let scannedDocument = null;

function initializeScanModal() {
    // Modal close functionality
    document.getElementById('closeScanModal').addEventListener('click', closeScanModal);
    document.getElementById('scanModal').addEventListener('click', (e) => {
        if (e.target.id === 'scanModal') {
            closeScanModal();
        }
    });
    
    // Step navigation
    document.getElementById('nextStep').addEventListener('click', nextStep);
    document.getElementById('prevStep').addEventListener('click', prevStep);
    
    // Scanner functionality
    document.getElementById('refreshScanners').addEventListener('click', detectScanners);
    document.getElementById('scannerSelect').addEventListener('change', handleScannerSelection);
    
    // Scan controls
    document.getElementById('startScan').addEventListener('click', startScanning);
    document.getElementById('previewScan').addEventListener('click', previewScan);
    document.getElementById('rescan').addEventListener('click', rescanDocument);
    document.getElementById('downloadScan').addEventListener('click', downloadScannedDocument);
    
    // Document name auto-uppercase
    document.getElementById('docName').addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

function closeScanModal() {
    const scanModal = document.getElementById('scanModal');
    scanModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset modal state
    setTimeout(() => {
        resetScanModal();
    }, 300);
}

function resetScanModal() {
    currentStep = 1;
    selectedScanner = null;
    scannedDocument = null;
    
    // Reset all steps
    for (let i = 1; i <= maxSteps; i++) {
        document.getElementById(`step${i}`).classList.remove('active');
    }
    document.getElementById('step1').classList.add('active');
    
    // Reset buttons
    document.getElementById('prevStep').style.display = 'none';
    document.getElementById('nextStep').style.display = 'inline-flex';
    document.getElementById('downloadScan').style.display = 'none';
    
    // Reset form
    document.getElementById('scannerSelect').innerHTML = '<option value="">Detecting scanners...</option>';
    document.getElementById('docCategory').value = '';
    document.getElementById('docYear').value = '';
    document.getElementById('docName').value = '';
    
    // Reset preview
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = `
        <div class="preview-placeholder">
            <i class="fas fa-file-image"></i>
            <p>Document preview will appear here</p>
        </div>
    `;
    previewArea.classList.remove('has-preview');
    
    // Reset scan controls
    document.getElementById('startScan').style.display = 'inline-flex';
    document.getElementById('previewScan').style.display = 'none';
    document.getElementById('rescan').style.display = 'none';
    document.getElementById('scanProgress').style.display = 'none';
}

function nextStep() {
    if (currentStep < maxSteps) {
        // Validate current step
        if (!validateCurrentStep()) {
            return;
        }
        
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Show next step
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update buttons
        updateStepButtons();
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update buttons
        updateStepButtons();
    }
}

function updateStepButtons() {
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const downloadBtn = document.getElementById('downloadScan');
    
    // Show/hide previous button
    prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    
    // Show/hide next/download button
    if (currentStep === maxSteps) {
        nextBtn.style.display = 'none';
        downloadBtn.style.display = scannedDocument ? 'inline-flex' : 'none';
    } else {
        nextBtn.style.display = 'inline-flex';
        downloadBtn.style.display = 'none';
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!selectedScanner) {
                alert('Please select a scanner before proceeding.');
                return false;
            }
            break;
        case 2:
            // Settings are optional, always valid
            break;
        case 3:
            const category = document.getElementById('docCategory').value;
            const year = document.getElementById('docYear').value;
            const name = document.getElementById('docName').value;
            
            if (!category || !year || !name) {
                alert('Please fill in all document information fields.');
                return false;
            }
            break;
        case 4:
            if (!scannedDocument) {
                alert('Please scan a document before proceeding.');
                return false;
            }
            break;
    }
    return true;
}

function detectScanners() {
    const scannerSelect = document.getElementById('scannerSelect');
    const scannerStatus = document.getElementById('scannerStatus');
    
    // Show loading state
    scannerSelect.innerHTML = '<option value="">Detecting scanners...</option>';
    scannerStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Searching for connected scanners...</span>';
    scannerStatus.className = 'scanner-status';
    
    // Simulate scanner detection
    setTimeout(() => {
        // Mock scanner list (in real implementation, this would use Web APIs or browser extensions)
        const mockScanners = [
            { id: 'hp_deskjet_3630', name: 'HP DeskJet 3630 Series' },
            { id: 'canon_pixma_mg3600', name: 'Canon PIXMA MG3600 Series' },
            { id: 'epson_l3150', name: 'Epson L3150 Series' },
            { id: 'brother_dcp_l2540dw', name: 'Brother DCP-L2540DW' }
        ];
        
        if (mockScanners.length > 0) {
            scannerSelect.innerHTML = '<option value="">Select a scanner</option>';
            mockScanners.forEach(scanner => {
                const option = document.createElement('option');
                option.value = scanner.id;
                option.textContent = scanner.name;
                scannerSelect.appendChild(option);
            });
            
            scannerStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Found ' + mockScanners.length + ' scanner(s)</span>';
            scannerStatus.className = 'scanner-status success';
        } else {
            scannerSelect.innerHTML = '<option value="">No scanners found</option>';
            scannerStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>No scanners detected. Please check connections.</span>';
            scannerStatus.className = 'scanner-status error';
        }
    }, 2000);
}

function handleScannerSelection(e) {
    selectedScanner = e.target.value;
    if (selectedScanner) {
        const scannerStatus = document.getElementById('scannerStatus');
        scannerStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Scanner selected: ' + e.target.options[e.target.selectedIndex].text + '</span>';
        scannerStatus.className = 'scanner-status success';
    }
}

function startScanning() {
    const startBtn = document.getElementById('startScan');
    const progressDiv = document.getElementById('scanProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Disable scan button and show progress
    startBtn.disabled = true;
    progressDiv.style.display = 'block';
    
    // Simulate scanning process
    let progress = 0;
    const scanSteps = [
        'Initializing scanner...',
        'Warming up scanner...',
        'Scanning document...',
        'Processing image...',
        'Finalizing document...'
    ];
    
    const scanInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        const stepIndex = Math.floor((progress / 100) * scanSteps.length);
        if (stepIndex < scanSteps.length) {
            progressText.textContent = scanSteps[stepIndex];
        }
        
        if (progress >= 100) {
            clearInterval(scanInterval);
            completeScan();
        }
    }, 300);
}

function completeScan() {
    const progressDiv = document.getElementById('scanProgress');
    const previewArea = document.getElementById('previewArea');
    const startBtn = document.getElementById('startScan');
    const previewBtn = document.getElementById('previewScan');
    const rescanBtn = document.getElementById('rescan');
    
    // Hide progress
    progressDiv.style.display = 'none';
    
    // Create mock scanned document (in real implementation, this would be the actual scanned image)
    const mockScannedImage = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <rect width="400" height="300" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
            <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#6c757d">
                Scanned Document Preview
            </text>
            <text x="200" y="180" text-anchor="middle" font-family="Arial" font-size="12" fill="#6c757d">
                ${new Date().toLocaleString()}
            </text>
        </svg>
    `);
    
    // Store scanned document
    scannedDocument = {
        image: mockScannedImage,
        format: document.getElementById('scanFormat').value,
        quality: document.getElementById('scanQuality').value,
        timestamp: new Date().toISOString()
    };
    
    // Show preview
    previewArea.innerHTML = `<img src="${mockScannedImage}" alt="Scanned Document" class="preview-image">`;
    previewArea.classList.add('has-preview');
    
    // Update buttons
    startBtn.style.display = 'none';
    previewBtn.style.display = 'inline-flex';
    rescanBtn.style.display = 'inline-flex';
    startBtn.disabled = false;
    
    // Update step buttons
    updateStepButtons();
    
    // Show success message
    showNotification('Document scanned successfully!', 'success');
}

function previewScan() {
    if (scannedDocument) {
        // Open preview in new window
        const previewWindow = window.open('', '_blank', 'width=800,height=600');
        previewWindow.document.write(`
            <html>
                <head>
                    <title>Document Preview</title>
                    <style>
                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }
                        .preview-container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        img { max-width: 100%; height: auto; border: 1px solid #ddd; }
                        .info { margin-bottom: 20px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="preview-container">
                        <div class="info">
                            <h3>Document Preview</h3>
                            <p><strong>Quality:</strong> ${scannedDocument.quality} DPI</p>
                            <p><strong>Format:</strong> ${scannedDocument.format.toUpperCase()}</p>
                            <p><strong>Scanned:</strong> ${new Date(scannedDocument.timestamp).toLocaleString()}</p>
                        </div>
                        <img src="${scannedDocument.image}" alt="Scanned Document">
                    </div>
                </body>
            </html>
        `);
    }
}

function rescanDocument() {
    // Reset scan state
    scannedDocument = null;
    
    // Reset preview
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = `
        <div class="preview-placeholder">
            <i class="fas fa-file-image"></i>
            <p>Document preview will appear here</p>
        </div>
    `;
    previewArea.classList.remove('has-preview');
    
    // Reset buttons
    document.getElementById('startScan').style.display = 'inline-flex';
    document.getElementById('previewScan').style.display = 'none';
    document.getElementById('rescan').style.display = 'none';
    
    // Update step buttons
    updateStepButtons();
}

function downloadScannedDocument() {
    if (!scannedDocument) {
        alert('No document to download.');
        return;
    }
    
    // Get document information
    const category = document.getElementById('docCategory').value;
    const year = document.getElementById('docYear').value;
    const docName = document.getElementById('docName').value;
    const format = document.getElementById('scanFormat').value;
    const department = sessionStorage.getItem('selectedDepartment') || 'UNKNOWN';
    
    // Create filename
    const filename = `${year}_${department.replace(/\s+/g, '_').toUpperCase()}_${category}_${docName}.${format}`;
    
    // Convert image to blob and download
    if (format === 'pdf') {
        // For PDF, we would use a library like jsPDF
        downloadAsPDF(scannedDocument.image, filename);
    } else {
        // For image formats
        downloadAsImage(scannedDocument.image, filename);
    }
    
    // Show success message
    showNotification(`Document downloaded as ${filename}`, 'success');
    
    // Close modal after download
    setTimeout(() => {
        closeScanModal();
    }, 2000);
}

function downloadAsImage(imageData, filename) {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadAsPDF(imageData, filename) {
    // Simple PDF creation (in real implementation, use jsPDF library)
    // For now, we'll download as image with PDF extension
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : '#1e40af'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);