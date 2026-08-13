const API_BASE = 'http://localhost:5000/api';
const root = document.getElementById('root');

// Check if admin is already logged in (only on login page)
if (window.location.pathname.includes('AdminLogin.html') && isAdminLoggedIn()) {
    window.location.href = 'AdminDashboard.html';
}

// Render login page
function render() {
    root.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
            <!-- Left Side - Image -->
            <div class="md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-8">
                <div class="text-center text-white">
                    <div class="mb-6">
                        <svg class="w-24 h-24 mx-auto opacity-90" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                    </div>
                    <h2 class="text-3xl font-bold mb-2">Admin Portal</h2>
                    <p class="text-purple-100 text-lg">Secure access for administrators</p>
                </div>
            </div>
            
            <!-- Right Side - Form -->
            <div class="md:w-1/2 p-8 md:p-12">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">ADMIN LOGIN</h1>
                <p class="text-gray-600 mb-8">Enter your credentials to access the admin dashboard</p>
                
                <form id="adminLoginForm" class="space-y-6">
                    <div>
                        <label for="usernameOrEmail" class="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                        <input 
                            type="text" 
                            id="usernameOrEmail" 
                            name="usernameOrEmail" 
                            required
                            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="Enter your username or email"
                        >
                    </div>
                    
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                placeholder="Enter your password"
                            >
                            <button type="button" onclick="togglePassword('password')" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <svg id="password-eye" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        id="loginBtn"
                        class="inline-flex items-center justify-center w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                
                <div class="mt-6 text-center">
                    <p class="text-gray-600 text-sm">
                        <a href="index.html" class="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-all duration-200">
                            Back to Student Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Toggle password visibility
window.togglePassword = function(fieldId) {
    const field = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(fieldId + '-eye');

    if (field.type === 'password') {
        field.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        `;
    } else {
        field.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        `;
    }
};

// API Functions
export async function adminLogin(usernameOrEmail, password) {
    try {
        const response = await fetch(`${API_BASE}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store admin data in localStorage
            localStorage.setItem('admin', JSON.stringify(data.admin));
            localStorage.setItem('adminToken', data.token);
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Login failed' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function getAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
}

export function getAdminToken() {
    return localStorage.getItem('adminToken');
}

export function isAdminLoggedIn() {
    return !!localStorage.getItem('adminToken');
}

export function adminLogout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    window.location.href = 'AdminLogin.html';
}

// Initialize (only on login page)
if (window.location.pathname.includes('AdminLogin.html')) {
    render();
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('submit', async function(e) {
        if (e.target.id === 'adminLoginForm') {
            e.preventDefault();
            const usernameOrEmail = document.getElementById('usernameOrEmail').value;
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');

            loginBtn.textContent = 'Logging in...';
            loginBtn.disabled = true;

            const result = await adminLogin(usernameOrEmail, password);

            if (result.success) {
                alert('Admin login successful!');
                window.location.href = 'AdminDashboard.html';
            } else {
                alert('Login failed: ' + result.error);
                loginBtn.textContent = 'Login';
                loginBtn.disabled = false;
            }
        }
    });
});
