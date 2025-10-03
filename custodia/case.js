// Department classification data structure
let departmentData = {};
let casesData = [];

function loadDepartmentData() {
    return fetch('departments.json')
        .then(response => response.json())
        .then(data => {
            departmentData = data;
        })
        .catch(error => console.error('Error loading department data:', error));
}

function loadCasesData() {
    return fetch('cases.json')
        .then(response => response.json())
        .then(data => {
            casesData = data;
            renderCases(casesData);
        })
        .catch(error => console.error('Error loading cases data:', error));
}

function renderCases(cases) {
    const tbody = document.querySelector('.case-list table tbody');
    tbody.innerHTML = '';
    cases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${caseItem.senderOrganization}</td>
            <td>${caseItem.investigationType}</td>
            <td>${caseItem.assignedTo}</td>
            <td><span class="status ${caseItem.status}">${caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}</span></td>
            <td><button class="action-btn"><i class="fas fa-eye"></i></button></td>
        `;
        tbody.appendChild(row);
    });
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([loadDepartmentData(), loadCasesData()]).then(() => {
    const modal = document.getElementById('newCaseModal');
    const registerCaseBtn = document.getElementById('registerCaseBtn');
    const cancelBtn = document.getElementById('cancelNewCase');
    const closeModalBtn = document.querySelector('.close-modal');
    const caseForm = document.getElementById('newCaseForm');
    const generateCaseNumberBtn = document.getElementById('generateCaseNumber');

    // Open modal
    registerCaseBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        generateCaseNumber(); // Generate initial case number
        resetDepartmentSelection(); // Reset department selection
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
    }

    cancelBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Generate case number
    generateCaseNumberBtn.addEventListener('click', generateCaseNumber);
    
    function generateCaseNumber() {
        const now = new Date();
        const randomNum = Math.floor(100 + Math.random() * 900);
        const caseNumber = `CSE-${now.getFullYear()}-${randomNum}`;
        document.getElementById('caseNumber').value = caseNumber;
    }

    // Form submission
    caseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Handle other organization field
        const senderOrg = document.getElementById('senderOrganization').value;
        let orgValue = senderOrg;
        
        if (senderOrg === 'other') {
            const otherOrg = document.getElementById('otherOrganization').value;
            if (!otherOrg) {
                alert('Please specify the organization name');
                return;
            }
            orgValue = otherOrg;
        }
        
        // Validate department classification
        const mainDept = document.getElementById('mainDepartment').value;
        const mainClass = document.getElementById('mainClass').value;
        const laboratory = document.getElementById('laboratory').value;
        
        if (!mainDept || !mainClass || !laboratory) {
            alert('Please complete the department classification');
            return;
        }
        
        alert('New case registered successfully!');
        closeModal();
        // In a real application, you would send the form data to a server here
    });

    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchCase');

    function applyFilters() {
        const statusValue = statusFilter.value;
        const typeValue = typeFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        let filteredCases = casesData;

        if (statusValue !== 'all') {
            filteredCases = filteredCases.filter(caseItem => caseItem.status === statusValue);
        }

        if (typeValue !== 'all') {
            filteredCases = filteredCases.filter(caseItem => caseItem.investigationType.toLowerCase().includes(typeValue));
        }

        if (searchValue) {
            filteredCases = filteredCases.filter(caseItem =>
                caseItem.id.toLowerCase().includes(searchValue) ||
                caseItem.title.toLowerCase().includes(searchValue)
            );
        }

        renderCases(filteredCases);
    }
    
    statusFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-button:not(.disabled)');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.pagination-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button if it's a number button
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Here you would typically make an AJAX request to fetch the next page of data
            // For this example, we'll just log the page number
            if (this.textContent && !this.querySelector('i')) {
                console.log('Page changed to:', this.textContent);
            }
        });
    });
    });
});

// Toggle other organization field
function toggleOtherOrganization() {
    const senderOrg = document.getElementById('senderOrganization').value;
    const otherOrgGroup = document.getElementById('otherOrganizationGroup');
    
    if (senderOrg === 'other') {
        otherOrgGroup.style.display = 'block';
    } else {
        otherOrgGroup.style.display = 'none';
        document.getElementById('otherOrganization').value = '';
    }
}

// Reset department selection when modal is opened
function resetDepartmentSelection() {
    document.getElementById('mainDepartment').selectedIndex = 0;
    document.getElementById('mainClass').selectedIndex = 0;
    document.getElementById('mainClass').disabled = true;
    document.getElementById('laboratory').selectedIndex = 0;
    document.getElementById('laboratory').disabled = true;
    
    // Clear options
    document.getElementById('mainClass').innerHTML = '<option value="">Select Main Class</option>';
    document.getElementById('laboratory').innerHTML = '<option value="">Select Laboratory</option>';
}

// Update main class options based on selected department
function updateMainClass() {
    const mainDeptSelect = document.getElementById('mainDepartment');
    const mainClassSelect = document.getElementById('mainClass');
    const laboratorySelect = document.getElementById('laboratory');
    
    const selectedDept = mainDeptSelect.value;
    
    // Reset laboratory selection
    laboratorySelect.innerHTML = '<option value="">Select Laboratory</option>';
    laboratorySelect.disabled = true;
    
    if (!selectedDept) {
        mainClassSelect.innerHTML = '<option value="">Select Main Class</option>';
        mainClassSelect.disabled = true;
        return;
    }
    
    // Enable and populate main class dropdown
    mainClassSelect.disabled = false;
    mainClassSelect.innerHTML = '<option value="">Select Main Class</option>';
    
    const mainClasses = departmentData[selectedDept].mainClasses;
    
    for (const key in mainClasses) {
        if (mainClasses.hasOwnProperty(key)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = mainClasses[key].name;
            mainClassSelect.appendChild(option);
        }
    }
}

// Update laboratory options based on selected main class
function updateLaboratory() {
    const mainDeptSelect = document.getElementById('mainDepartment');
    const mainClassSelect = document.getElementById('mainClass');
    const laboratorySelect = document.getElementById('laboratory');
    
    const selectedDept = mainDeptSelect.value;
    const selectedMainClass = mainClassSelect.value;
    
    if (!selectedDept || !selectedMainClass) {
        laboratorySelect.innerHTML = '<option value="">Select Laboratory</option>';
        laboratorySelect.disabled = true;
        return;
    }
    
    // Enable and populate laboratory dropdown
    laboratorySelect.disabled = false;
    laboratorySelect.innerHTML = '<option value="">Select Laboratory</option>';
    
    const laboratories = departmentData[selectedDept].mainClasses[selectedMainClass].classes;
    
    laboratories.forEach(lab => {
        const option = document.createElement('option');
        option.value = lab.toLowerCase().replace(/\s+/g, '-');
        option.textContent = lab;
        laboratorySelect.appendChild(option);
    });
}