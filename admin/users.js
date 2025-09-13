  // Modal functionality
  const modal = document.getElementById('userModal');
  const addUserBtn = document.getElementById('addUserBtn');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');
  const roleSelect = document.getElementById('role');
  
  // Show modal
  addUserBtn.addEventListener('click', () => {
      modal.classList.add('active');
  });
  
  // Hide modal
  function hideModal() {
      modal.classList.remove('active');
  }
  
  closeModal.addEventListener('click', hideModal);
  cancelBtn.addEventListener('click', hideModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          hideModal();
      }
  });
  
  // Role selection logic
  roleSelect.addEventListener('change', () => {
      const role = roleSelect.value;
      
      // Hide all groups first
      document.getElementById('mainDepartmentGroup').style.display = 'none';
      document.getElementById('mainClassGroup').style.display = 'none';
      document.getElementById('classGroup').style.display = 'none';
      document.getElementById('labGroup').style.display = 'none';
      
      // Show relevant group based on selection
      if (role === 'main_department') {
          document.getElementById('mainDepartmentGroup').style.display = 'block';
      } else if (role === 'main_class') {
          document.getElementById('mainClassGroup').style.display = 'block';
      } else if (role === 'class') {
          document.getElementById('classGroup').style.display = 'block';
      } else if (role === 'lab') {
          document.getElementById('labGroup').style.display = 'block';
      }
  });
  
  // Form submission
  submitBtn.addEventListener('click', () => {
      const form = document.getElementById('userForm');
      if (form.checkValidity()) {
          alert('User created successfully!');
          hideModal();
          form.reset();
          
          // Hide all conditional fields after submission
          document.getElementById('mainDepartmentGroup').style.display = 'none';
          document.getElementById('mainClassGroup').style.display = 'none';
          document.getElementById('classGroup').style.display = 'none';
          document.getElementById('labGroup').style.display = 'none';
      } else {
          alert('Please fill all required fields correctly.');
      }
  });
  
  // Simple logout functionality
  document.querySelector('.logout').addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
          alert('Logout successful!');
      }
  });

  // Search functionality
  const searchInput = document.querySelector('.user-search-input-container input');
  searchInput.addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('.users-table tbody tr');
      
      rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  });

  // Filter functionality
  const roleFilter = document.querySelectorAll('.filter-dropdown select')[0];
  const statusFilter = document.querySelectorAll('.filter-dropdown select')[1];
  
  function applyFilters() {
      const roleValue = roleFilter.value;
      const statusValue = statusFilter.value;
      const rows = document.querySelectorAll('.users-table tbody tr');
      
      rows.forEach(row => {
          const role = row.cells[1].textContent.toLowerCase();
          const status = row.cells[3].textContent.toLowerCase();
          
          const roleMatch = !roleValue || role.includes(roleValue);
          const statusMatch = !statusValue || status.includes(statusValue);
          
          if (roleMatch && statusMatch) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  }
  
  roleFilter.addEventListener('change', applyFilters);
  statusFilter.addEventListener('change', applyFilters);