document.addEventListener('DOMContentLoaded', function() {
    let usersData = [];
    let filteredUsers = [];

    // Load users data
    fetch('../json/users.json')
        .then(response => response.json())
        .then(users => {
            usersData = users;
            filteredUsers = [...users];
            updateStats(users);
            populateUserTable(filteredUsers);
            initializeFilters();
        })
        .catch(error => console.error('Error loading users:', error));

    function updateStats(users) {
        const total = users.length;
        const active = users.filter(u => u.status === 'Active').length;
        const admin = users.filter(u => u.role === 'ADMIN').length;
        const inactive = users.filter(u => u.status === 'Inactive').length;

        document.getElementById('total-users').textContent = total;
        document.getElementById('active-users').textContent = active;
        document.getElementById('admin-users').textContent = admin;
        document.getElementById('inactive-users').textContent = inactive;
    }

    function populateUserTable(users) {
        const tbody = document.querySelector('.users-table tbody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            const roleDisplay = getRoleDisplay(user.role);
            const statusClass = user.status.toLowerCase();
            const statusIcon = user.status === 'Active' ? 'fa-check-circle' : 'fa-times-circle';
            const statusColor = user.status === 'Active' ? 'status-active' : 'status-inactive';

            row.innerHTML = `
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                        <div class="user-details">
                            <div class="user-name">${user.name}</div>
                            <div class="user-username">@${user.username}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="role-info">
                        <div class="role">${roleDisplay}</div>
                        <div class="department">${user.department}</div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <div class="email">${user.email}</div>
                        <div class="phone">${user.phone}</div>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${statusColor}">
                        <i class="fas ${statusIcon}"></i> ${user.status}
                    </span>
                </td>
                <td>${user.lastLogin}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-user="${user.username}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" data-user="${user.username}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function getRoleDisplay(role) {
        const roleMap = {
            'ADMIN': 'Administrator',
            'CUSTODIA OFFICER': 'Custodia Officer',
            'LAB TECHNICIAN': 'Lab Technician',
            'DEPARTMENT HEAD': 'Department Head',
            'VIEW ONLY': 'View Only'
        };
        return roleMap[role] || role;
    }

    function initializeFilters() {
        const searchInput = document.querySelector('.user-search-input-container input');
        const roleFilter = document.querySelector('.filter-dropdown select:nth-child(1)');
        const statusFilter = document.querySelector('.filter-dropdown select:nth-child(2)');

        function applyFilters() {
            const searchValue = searchInput.value.toLowerCase();
            const roleValue = roleFilter.value;
            const statusValue = statusFilter.value;

            filteredUsers = usersData.filter(user => {
                const matchesSearch = user.name.toLowerCase().includes(searchValue) ||
                                     user.username.toLowerCase().includes(searchValue) ||
                                     user.email.toLowerCase().includes(searchValue);
                const matchesRole = !roleValue || getRoleDisplay(user.role).toLowerCase().includes(roleValue);
                const matchesStatus = !statusValue || user.status.toLowerCase() === statusValue;

                return matchesSearch && matchesRole && matchesStatus;
            });

            populateUserTable(filteredUsers);
            updateStats(filteredUsers);
        }

        searchInput.addEventListener('input', applyFilters);
        roleFilter.addEventListener('change', applyFilters);
        statusFilter.addEventListener('change', applyFilters);
    }

    // Modal handling
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const submitBtn = document.getElementById('submitBtn');
    const userForm = document.getElementById('userForm');
    const roleSelect = document.getElementById('role');

    addUserBtn.addEventListener('click', () => {
        userModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    function closeModalHandler() {
        userModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        userForm.reset();
        hideDepartmentFields();
    }

    closeModal.addEventListener('click', closeModalHandler);
    cancelBtn.addEventListener('click', closeModalHandler);

    // Click outside modal to close
    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
            closeModalHandler();
        }
    });

    // Role change handler for showing/hiding department fields
    roleSelect.addEventListener('change', function() {
        hideDepartmentFields();
        const role = this.value;
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

    function hideDepartmentFields() {
        document.getElementById('mainDepartmentGroup').style.display = 'none';
        document.getElementById('mainClassGroup').style.display = 'none';
        document.getElementById('classGroup').style.display = 'none';
        document.getElementById('labGroup').style.display = 'none';
    }

    // Form submission
    submitBtn.addEventListener('click', function() {
        if (userForm.checkValidity()) {
            const formData = new FormData(userForm);
            const newUser = {
                name: formData.get('fullName'),
                username: formData.get('username'),
                role: formData.get('role').toUpperCase(), // Adjust as needed
                department: getDepartmentFromForm(formData),
                email: formData.get('email'),
                phone: formData.get('phone'),
                status: 'Active',
                lastLogin: new Date().toLocaleDateString()
            };

            // In real app, save to server/JSON. For demo:
            usersData.push(newUser);
            filteredUsers.push(newUser);
            populateUserTable(filteredUsers);
            updateStats(usersData);

            console.log('New user added:', newUser);
            alert('User created successfully!');
            closeModalHandler();
        } else {
            userForm.reportValidity();
        }
    });

    function getDepartmentFromForm(formData) {
        let dept = '';
        const role = formData.get('role');
        if (role === 'main_department') {
            dept = document.getElementById('mainDepartment').options[document.getElementById('mainDepartment').selectedIndex].text;
        } else if (role === 'main_class') {
            dept = document.getElementById('mainClass').options[document.getElementById('mainClass').selectedIndex].text;
        } else if (role === 'class') {
            dept = document.getElementById('class').options[document.getElementById('class').selectedIndex].text;
        } else if (role === 'lab') {
            dept = document.getElementById('lab').options[document.getElementById('lab').selectedIndex].text;
        }
        return dept || 'General';
    }

    // Action buttons (edit/delete) - demo
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            const username = e.target.closest('.edit-btn').dataset.user;
            alert(`Edit user: ${username}`);
        } else if (e.target.closest('.delete-btn')) {
            const username = e.target.closest('.delete-btn').dataset.user;
            if (confirm(`Delete user ${username}?`)) {
                const index = usersData.findIndex(u => u.username === username);
                if (index > -1) {
                    usersData.splice(index, 1);
                    filteredUsers = usersData.filter(u => filteredUsers.some(fu => fu.username === u.username));
                    populateUserTable(filteredUsers);
                    updateStats(usersData);
                    alert('User deleted successfully!');
                }
            }
        }
    });
});
