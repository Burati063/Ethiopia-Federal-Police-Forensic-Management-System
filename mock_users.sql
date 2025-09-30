-- Mock users for testing role-based login

INSERT INTO users (full_name, username, email, phone, password, role) VALUES
('Admin User', 'admin', 'admin@forensic.gov.et', '1234567890', '$2y$10$hashedpasswordhere', 'admin'),
('Custodia Officer', 'custodia_user', 'custodia@forensic.gov.et', '0987654321', '$2y$10$hashedpasswordhere', 'custodia'),
('Lab Technician', 'lab_user', 'lab@forensic.gov.et', '1122334455', '$2y$10$hashedpasswordhere', 'lab');

-- Note: Replace '$2y$10$hashedpasswordhere' with bcrypt hashes of your chosen passwords.
-- For example, you can use 'password123' hashed with bcrypt for all three users for testing.
