// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
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
        
        // In a real application, you would filter the table data here
        console.log(`Filtering by status: ${statusValue}, type: ${typeValue}, search: ${searchValue}`);
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
// Department classification data structure
const departmentData = {
    forensic: {
        name: "Forensic Laboratory Department",
        mainClasses: {
            fingerprint: {
                name: "Fingerprint & Crime Record Main Class",
                classes: [
                    "Peaceful People Fingerprint Class",
                    "Digital Fingerprint Investigation Class",
                    "Crime Record Fingerprint Investigation Class",
                    "Hidden Fingerprint Investigation Class"
                ]
            },
            biochemistry: {
                name: "Forensic & Biochemistry Main Class",
                classes: [
                    "Fire and Explosion Investigation Class",
                    "Chemistry and Toxicology Investigation class",
                    "Biology Investigation Class",
                    "DNA Investigation class"
                ]
            },
            physical: {
                name: "Physical Forensic Main Class",
                classes: [
                    "Weapon and Footprint Class",
                    "Digital Investigation Class",
                    "Police Document Investigation Class",
                    "Court Document Investigation Class"
                ]
            }
        }
    },
    crime: {
        name: "Crime Area Investigation Department",
        mainClasses: {
            crime: {
                name: "Crime Area Investigation Main Class",
                classes: [
                    "Cremation Investigation Class",
                    "Crime Area Investigation Class",
                    "Photography Investigation Class"
                ]
            }
        }
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
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
        const cls = document.getElementById('class').value;
        
        if (!mainDept || !mainClass || !cls) {
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
        
        // In a real application, you would filter the table data here
        console.log(`Filtering by status: ${statusValue}, type: ${typeValue}, search: ${searchValue}`);
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
    document.getElementById('class').selectedIndex = 0;
    document.getElementById('class').disabled = true;
    
    // Clear options
    document.getElementById('mainClass').innerHTML = '<option value="">Select Main Class</option>';
    document.getElementById('class').innerHTML = '<option value="">Select Class</option>';
}

// Update main class options based on selected department
function updateMainClass() {
    const mainDeptSelect = document.getElementById('mainDepartment');
    const mainClassSelect = document.getElementById('mainClass');
    const classSelect = document.getElementById('class');
    
    const selectedDept = mainDeptSelect.value;
    
    // Reset class selection
    classSelect.innerHTML = '<option value="">Select Class</option>';
    classSelect.disabled = true;
    
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

// Update class options based on selected main class
function updateClass() {
    const mainDeptSelect = document.getElementById('mainDepartment');
    const mainClassSelect = document.getElementById('mainClass');
    const classSelect = document.getElementById('class');
    
    const selectedDept = mainDeptSelect.value;
    const selectedMainClass = mainClassSelect.value;
    
    if (!selectedDept || !selectedMainClass) {
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classSelect.disabled = true;
        return;
    }
    
    // Enable and populate class dropdown
    classSelect.disabled = false;
    classSelect.innerHTML = '<option value="">Select Class</option>';
    
    const classes = departmentData[selectedDept].mainClasses[selectedMainClass].classes;
    
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.toLowerCase().replace(/\s+/g, '-');
        option.textContent = cls;
        classSelect.appendChild(option);
    });
}