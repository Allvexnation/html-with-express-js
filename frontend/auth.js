const API_BASE_URL = 'https://jhon-ladines-server-elec7.onrender.com/api/auth';

export async function registerUser(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        if (data.token) {
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

export function isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
}

export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function getToken() {
    return localStorage.getItem('jwt_token');
}

export function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(fieldId + '-eye');

    if (field.type === 'password') {
        field.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye');
    } else {
        field.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    }
    lucide.createIcons();
}

export function initLoginForm() {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');

        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;

        const result = await loginUser(username, password);

        if (result.success) {
            alert('Login successful!');
            console.log('Login successful:', result.data);
            window.location.href = 'home.html';
        } else {
            alert('Login failed: ' + result.error);
            loginBtn.textContent = 'Login';
            loginBtn.disabled = false;
        }
    });
}

export function initAuth() {
    lucide.createIcons();
    
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePassword('password'));
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        initLoginForm();
    }

    const regPasswordBtn = document.getElementById('regPasswordBtn');
    if (regPasswordBtn) {
        regPasswordBtn.addEventListener('click', () => togglePassword('regPassword'));
    }

    const confirmPasswordBtn = document.getElementById('confirmPasswordBtn');
    if (confirmPasswordBtn) {
        confirmPasswordBtn.addEventListener('click', () => togglePassword('confirmPassword'));
    }

    const dateOfBirth = document.getElementById('dateOfBirth');
    if (dateOfBirth) {
        dateOfBirth.addEventListener('change', function() {
            const dob = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            document.getElementById('age').value = age;
        });
    }

    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        initRegistrationForm();
    }
}

function initRegistrationForm() {
    // initSteps will be called from bundle.js after DOM is ready

    document.getElementById('registrationForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const genderRadio = document.querySelector('input[name="gender"]:checked');
        if (!genderRadio) {
            alert('Please select a gender');
            return;
        }

        const hobbiesRadio = document.querySelector('input[name="hobbies"]:checked');
        if (!hobbiesRadio) {
            alert('Please select a hobby');
            return;
        }

        const formData = {
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            cellNumber: document.getElementById('cellNumber').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            username: document.getElementById('regUsername').value,
            password: password,
            gender: genderRadio.value,
            hobbies: hobbiesRadio.value,
            agreement: document.getElementById('agreement').checked
        };

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Registering...';
        submitBtn.disabled = true;

        const result = await registerUser(formData);

        if (result.success) {
            // Auto-login after registration to get token
            const loginResult = await loginUser(formData.username, formData.password);
            
            if (loginResult.success) {
                alert('Registration successful!');
                window.location.href = 'home.html';
            } else {
                // If auto-login fails, still redirect but user may need to login again
                const userData = {
                    id: result.data[0]?.id || result.data.id,
                    username: formData.username,
                    email: formData.email,
                    fullName: formData.fullName
                };
                localStorage.setItem('user', JSON.stringify(userData));
                alert('Registration successful! Please login to continue.');
                window.location.href = 'index.html';
            }
        } else {
            alert('Registration failed: ' + result.error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
