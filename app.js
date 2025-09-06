// Application Data
const appData = {
  statistics: {
    total_verifications: 45678,
    institutions_connected: 127,
    fraud_detected: 89,
    success_rate: 98.7
  },
  sample_certificates: [
    {
      id: "JH/2024/BCA/001234",
      student_name: "Rahul Kumar Singh",
      institution: "Ranchi University",
      degree: "Bachelor of Computer Applications",
      year: 2024,
      grade: "First Division",
      status: "Verified"
    },
    {
      id: "JH/2023/MBA/005678",
      student_name: "Priya Sharma",
      institution: "Birsa Agricultural University",
      degree: "Master of Business Administration",
      year: 2023,
      grade: "First Division with Distinction",
      status: "Verified"
    }
  ],
  institutions: [
    {
      name: "Ranchi University",
      code: "RU001",
      location: "Ranchi",
      certificates_issued: 15234,
      integration_status: "Active"
    },
    {
      name: "Birsa Agricultural University",
      code: "BAU002", 
      location: "Ranchi",
      certificates_issued: 8967,
      integration_status: "Active"
    },
    {
      name: "National Institute of Technology Jamshedpur",
      code: "NITJ003",
      location: "Jamshedpur", 
      certificates_issued: 12456,
      integration_status: "Pending"
    }
  ],
  fraud_alerts: [
    {
      id: "FA001",
      type: "Tampered Grade",
      institution: "Unknown",
      detected_date: "2025-09-05",
      severity: "High",
      description: "Grade modification detected in MBA certificate"
    },
    {
      id: "FA002", 
      type: "Forged Signature",
      institution: "Fake University XYZ",
      detected_date: "2025-09-04",
      severity: "Critical",
      description: "Invalid institutional signature detected"
    }
  ]
};

// Global state
let currentSection = 'home';
let uploadedFile = null;
let verificationData = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    initializeNavigation();
    initializeCharts();
    initializeFileUpload();
    initializeTabs();
    initializeInstitutionData();
    initializeFraudAlerts();
    setupEventListeners();
});

// Navigation System
function initializeNavigation() {
    console.log('Initializing navigation...');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const currentSectionSpan = document.getElementById('current-section');

    // Main navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            console.log('Navigation clicked:', targetSection);
            if (targetSection) {
                showSection(targetSection);
                updateNavigation(targetSection);
                updateBreadcrumb(targetSection);
            }
        });
    });

    // Quick access cards
    const accessCards = document.querySelectorAll('.access-card');
    accessCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Quick access clicked:', target);
            if (target) {
                showSection(target);
                updateNavigation(target);
                updateBreadcrumb(target);
            }
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll('[data-action]');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            console.log('Hero button clicked:', action);
            if (action === 'verify-now') {
                showSection('verify');
                updateNavigation('verify');
                updateBreadcrumb('verify');
            }
        });
    });

    console.log('Navigation initialized');
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    const sections = document.querySelectorAll('.section');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        currentSection = sectionId;
        console.log('Section shown:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
    }
}

function updateNavigation(sectionId) {
    console.log('Updating navigation for:', sectionId);
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });
}

function updateBreadcrumb(sectionId) {
    const currentSectionSpan = document.getElementById('current-section');
    if (currentSectionSpan) {
        const sectionNames = {
            'home': 'Home',
            'verify': 'Certificate Verification',
            'institution': 'Institution Portal',
            'student': 'Student Portal',
            'admin': 'Admin Panel',
            'help': 'Help & Support'
        };
        currentSectionSpan.textContent = sectionNames[sectionId] || 'Unknown';
    }
}

// Charts Initialization
function initializeCharts() {
    console.log('Initializing charts...');
    
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Verifications',
                    data: [1200, 1900, 3000, 2500, 3200, 4100, 3800, 4200, 4500],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Institution Distribution Chart
    const institutionCtx = document.getElementById('institutionChart');
    if (institutionCtx) {
        new Chart(institutionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ranchi University', 'BAU', 'NIT Jamshedpur', 'Others'],
                datasets: [{
                    data: [15234, 8967, 12456, 8341],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Monthly Chart for Institution Portal
    setTimeout(() => {
        const monthlyCtx = document.getElementById('monthlyChart');
        if (monthlyCtx) {
            new Chart(monthlyCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Verifications',
                        data: [450, 620, 780, 590, 720, 850],
                        backgroundColor: '#1FB8CD'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Department Chart
        const departmentCtx = document.getElementById('departmentChart');
        if (departmentCtx) {
            new Chart(departmentCtx, {
                type: 'pie',
                data: {
                    labels: ['Engineering', 'Arts', 'Science', 'Commerce', 'Management'],
                    datasets: [{
                        data: [35, 20, 25, 10, 10],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // State Chart for Admin Panel
        const stateCtx = document.getElementById('stateChart');
        if (stateCtx) {
            new Chart(stateCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Verified',
                            data: [850, 920, 1100, 1200],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)'
                        },
                        {
                            label: 'Fraud Detected',
                            data: [5, 8, 12, 15],
                            borderColor: '#DB4545',
                            backgroundColor: 'rgba(219, 69, 69, 0.1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
        }
    }, 100);

    console.log('Charts initialized');
}

// File Upload System
function initializeFileUpload() {
    console.log('Initializing file upload...');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const proceedBtn = document.getElementById('proceedBtn');

    if (!uploadArea || !fileInput) {
        console.log('Upload elements not found');
        return;
    }

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Proceed button
    if (proceedBtn) {
        proceedBtn.addEventListener('click', startVerification);
    }

    console.log('File upload initialized');
}

function handleFileSelect(file) {
    console.log('File selected:', file.name);
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, JPG, or PNG file.');
        return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        return;
    }

    uploadedFile = file;
    
    // Update UI
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="upload-icon">✅</div>
        <h3>File Selected</h3>
        <p><strong>${file.name}</strong></p>
        <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
    `;

    const proceedBtn = document.getElementById('proceedBtn');
    proceedBtn.style.display = 'block';
}

// Verification Process
function startVerification() {
    if (!uploadedFile) return;

    console.log('Starting verification process...');
    // Move to step 2
    updateVerificationStep(2);
    
    // Simulate OCR processing
    setTimeout(() => {
        simulateOCRProcessing();
    }, 1000);
}

function updateVerificationStep(stepNumber) {
    console.log('Moving to step:', stepNumber);
    
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    const verifySteps = document.querySelectorAll('.verify-step');

    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });

    // Show corresponding content
    verifySteps.forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
}

function simulateOCRProcessing() {
    console.log('Simulating OCR processing...');
    const progressBar = document.getElementById('ocrProgress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showOCRResults();
            }, 500);
        }
    }, 200);
}

function showOCRResults() {
    console.log('Showing OCR results...');
    const extractedData = document.getElementById('extractedData');
    const ocrResults = document.getElementById('ocrResults');
    
    if (!extractedData || !ocrResults) {
        console.error('OCR result elements not found');
        return;
    }
    
    // Generate mock OCR data
    const mockData = {
        'Student Name': 'Rahul Kumar Singh',
        'Institution': 'Ranchi University',
        'Degree': 'Bachelor of Computer Applications',
        'Year': '2024',
        'Grade': 'First Division',
        'Certificate ID': 'JH/2024/BCA/001234'
    };

    verificationData = mockData;

    ocrResults.innerHTML = Object.entries(mockData).map(([key, value]) => `
        <div class="data-item">
            <div class="data-label">${key}</div>
            <div class="data-value">${value}</div>
        </div>
    `).join('');

    extractedData.style.display = 'block';
    
    // Automatically proceed to verification
    setTimeout(() => {
        updateVerificationStep(3);
        startBlockchainVerification();
    }, 2000);
}

function startBlockchainVerification() {
    console.log('Starting blockchain verification...');
    const checks = [
        { id: 'check-database', text: 'Institutional database verified ✓', delay: 1000 },
        { id: 'check-blockchain', text: 'Blockchain signature valid ✓', delay: 2000 },
        { id: 'check-fraud', text: 'No fraud indicators detected ✓', delay: 3000 }
    ];

    checks.forEach(check => {
        setTimeout(() => {
            const element = document.getElementById(check.id);
            if (element) {
                const icon = element.querySelector('.check-icon');
                if (icon) {
                    icon.textContent = '✅';
                }
                element.classList.add('completed');
            }
        }, check.delay);
    });

    // Move to results
    setTimeout(() => {
        updateVerificationStep(4);
        showVerificationResults();
    }, 4000);
}

function showVerificationResults() {
    console.log('Showing verification results...');
    const resultsContainer = document.getElementById('verificationResults');
    
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }
    
    // Generate verification results
    const isVerified = Math.random() > 0.2; // 80% chance of being verified
    const authenticityScore = isVerified ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 40) + 20;
    
    const resultHtml = `
        <div class="result-status ${isVerified ? 'verified' : 'fraud'}">
            <div class="result-icon">${isVerified ? '✅' : '❌'}</div>
            <h2>${isVerified ? 'Certificate Verified' : 'Verification Failed'}</h2>
            <div class="authenticity-score">${authenticityScore}%</div>
            <p>Authenticity Score</p>
        </div>
        
        <div class="verification-details">
            <h3>Verification Details</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>Transaction ID:</strong>
                    <span style="font-family: monospace;">0x${Math.random().toString(16).substr(2, 8)}</span>
                </div>
                <div class="detail-item">
                    <strong>Verified At:</strong>
                    <span>${new Date().toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <strong>Institution Status:</strong>
                    <span class="status status--success">Verified Partner</span>
                </div>
                <div class="detail-item">
                    <strong>Digital Signature:</strong>
                    <span>${isVerified ? 'Valid' : 'Invalid'}</span>
                </div>
            </div>
        </div>
        
        <div class="result-actions">
            <button class="btn btn--primary">Download Report</button>
            <button class="btn btn--outline">Share Results</button>
            <button class="btn btn--outline" onclick="resetVerification()">Verify Another</button>
        </div>
    `;
    
    resultsContainer.innerHTML = resultHtml;
}

function resetVerification() {
    console.log('Resetting verification...');
    // Reset to step 1
    updateVerificationStep(1);
    
    // Reset upload area
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.innerHTML = `
            <div class="upload-icon">📄</div>
            <h3>Drop your certificate here</h3>
            <p>Or click to browse files</p>
            <p class="upload-note">Supports PDF, JPG, PNG (Max 10MB)</p>
        `;
    }
    
    const proceedBtn = document.getElementById('proceedBtn');
    if (proceedBtn) {
        proceedBtn.style.display = 'none';
    }
    
    // Reset data
    uploadedFile = null;
    verificationData = null;
}

// Tab System
function initializeTabs() {
    console.log('Initializing tabs...');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Institution Data Management
function initializeInstitutionData() {
    console.log('Initializing institution data...');
    const certificatesTableBody = document.getElementById('certificatesTableBody');
    if (!certificatesTableBody) return;

    const mockCertificates = [
        {
            id: 'JH/2024/BCA/001234',
            name: 'Rahul Kumar Singh',
            degree: 'BCA',
            year: '2024',
            status: 'Verified'
        },
        {
            id: 'JH/2024/MBA/001235',
            name: 'Priya Sharma',
            degree: 'MBA',
            year: '2024',
            status: 'Pending'
        },
        {
            id: 'JH/2023/BTech/001236',
            name: 'Amit Kumar',
            degree: 'B.Tech',
            year: '2023',
            status: 'Verified'
        }
    ];

    certificatesTableBody.innerHTML = mockCertificates.map(cert => `
        <tr>
            <td style="font-family: monospace;">${cert.id}</td>
            <td>${cert.name}</td>
            <td>${cert.degree}</td>
            <td>${cert.year}</td>
            <td>
                <span class="status ${cert.status === 'Verified' ? 'status--success' : 'status--warning'}">
                    ${cert.status}
                </span>
            </td>
            <td>
                <button class="btn btn--outline btn--sm">Edit</button>
                <button class="btn btn--primary btn--sm">View</button>
            </td>
        </tr>
    `).join('');
}

// Fraud Alerts Management
function initializeFraudAlerts() {
    console.log('Initializing fraud alerts...');
    const fraudAlerts = document.getElementById('fraudAlerts');
    if (!fraudAlerts) return;

    fraudAlerts.innerHTML = appData.fraud_alerts.map(alert => `
        <div class="alert-item ${alert.severity.toLowerCase()}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${alert.type}</strong>
                    <p style="margin: 4px 0; font-size: 12px; opacity: 0.8;">${alert.description}</p>
                    <small>${alert.detected_date}</small>
                </div>
                <span class="status ${alert.severity === 'Critical' ? 'status--error' : 'status--warning'}">
                    ${alert.severity}
                </span>
            </div>
        </div>
    `).join('');
}

// Additional Event Listeners
function setupEventListeners() {
    console.log('Setting up additional event listeners...');
    
    // Search functionality
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('Searching for:', this.value);
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Privacy controls
    const privacyCheckboxes = document.querySelectorAll('.control-item input[type="checkbox"]');
    privacyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.control-item').querySelector('label');
            console.log('Privacy setting updated:', label ? label.textContent : 'Unknown', this.checked);
        });
    });

    // Download buttons and other interactive elements
    setTimeout(() => {
        attachDynamicEventListeners();
    }, 500);

    console.log('Event listeners set up');
}

function attachDynamicEventListeners() {
    // QR Code Generation buttons
    const qrButtons = document.querySelectorAll('button');
    qrButtons.forEach(btn => {
        if (btn.textContent.includes('Generate') && btn.textContent.includes('QR')) {
            btn.addEventListener('click', generateQRCode);
        }
    });

    // Live chat button
    const chatButtons = document.querySelectorAll('button');
    chatButtons.forEach(btn => {
        if (btn.textContent.includes('Live Chat')) {
            btn.addEventListener('click', function() {
                alert('Live chat feature would be integrated with customer support system.');
            });
        }
    });

    // Download buttons
    const downloadButtons = document.querySelectorAll('button');
    downloadButtons.forEach(btn => {
        if (btn.textContent.includes('Download')) {
            btn.addEventListener('click', function() {
                const fileName = this.textContent.includes('Template') ? 'certificate_template.csv' : 'verification_report.pdf';
                console.log('Downloading:', fileName);
                showNotification(`Downloading ${fileName}...`);
            });
        }
    });
}

// QR Code Generation
function generateQRCode() {
    console.log('Generating QR code...');
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    if (qrPlaceholder) {
        qrPlaceholder.innerHTML = `
            <div style="width: 120px; height: 120px; background: #000; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; text-align: center;">
                QR CODE<br>
                Certificate:<br>
                JH/2024/BCA/001234
            </div>
        `;
        showNotification('QR Code generated successfully!', 'success');
    }
}

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    const colors = {
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: var(--color-surface);
        border: 1px solid ${colors[type] || colors.info};
        color: ${colors[type] || colors.info};
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
        max-width: 300px;
        font-size: 14px;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Export functions for global access
window.resetVerification = resetVerification;
window.generateQRCode = generateQRCode;
window.showSection = showSection;
window.updateNavigation = updateNavigation;