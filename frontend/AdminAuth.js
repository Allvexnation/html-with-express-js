/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

const API_BASE = 'https://jhon-ladines-server-elec7.onrender.com/api';
const root = document.getElementById('root');

console.log('AdminAuth.js loaded');
console.log('Root element:', root);
console.log('Current pathname:', window.location.pathname);
console.log('Checking if pathname includes AdminLogin.html:', window.location.pathname.includes('AdminLogin.html'));
console.log('Checking if pathname includes adminlogin:', window.location.pathname.includes('adminlogin'));

function getAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
}

function getAdminToken() {
    return localStorage.getItem('adminToken');
}

function isAdminLoggedIn() {
    return !!localStorage.getItem('adminToken');
}

if ((window.location.pathname.includes('AdminLogin.html') || window.location.pathname.includes('adminlogin')) && isAdminLoggedIn()) {
    window.location.href = 'AdminDashboard.html';
}

function render() {
    console.log('render() called');
    console.log('Root element before render:', root);
    try {
        root.innerHTML = `
        <main class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row relative z-10 border border-white/20">
            <aside class="w-full md:w-1/2 p-8 flex flex-col justify-center bg-cover bg-center" style="background-image: url('assets/Overview3.jpg'); position: relative;">
                <div id="blurOverlay" class="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-500"></div>
                <div id="userProfile" class="hidden flex flex-col items-center justify-center h-full relative z-10">
                    <div class="w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white border-opacity-30 mb-4">
                        <img id="profileImage" src="" alt="Profile" class="w-full h-full object-cover hidden">
                        <i data-lucide="user" id="defaultAvatar" class="w-12 h-12 text-white"></i>
                    </div>
                    <h2 id="welcomeMessage" class="text-white text-2xl font-bold mb-2 text-center"></h2>
                    <p id="userEmail" class="text-white text-opacity-80 text-sm text-center"></p>
                </div>
                <div class="text-center text-white relative z-20">
                    <div class="mb-6">
                        <i data-lucide="shield" class="w-24 h-24 mx-auto opacity-90"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-2">Admin Portal</h2>
                    <p class="text-blue-100 text-lg">Secure access for administrators</p>
                </div>
            </aside>
            
            <section class="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">ADMIN LOGIN</h1>
                <p class="text-gray-600 mb-8">Enter your credentials to access the admin dashboard</p>
                
                <form id="adminLoginForm" class="space-y-6">
                    <div class="mb-4">
                        <label for="usernameOrEmail" class="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                        <input 
                            type="text" 
                            id="usernameOrEmail" 
                            name="usernameOrEmail" 
                            required
                            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Enter your username or email"
                        >
                    </div>
                    
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="Enter your password"
                            >
                            <button type="button" onclick="togglePassword('password')" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <i data-lucide="eye-off" id="password-eye" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        id="loginBtn"
                        class="inline-flex items-center justify-center w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                
                <footer class="mt-6 text-center">
                    <p class="text-gray-600 text-sm">
                        <a href="index.html" class="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all duration-200">
                            Back to Student Login
                        </a>
                    </p>
                </footer>
            </section>
        </main>
    `;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    console.log('Render completed successfully');
    } catch (error) {
        console.error('Render error:', error);
        root.innerHTML = '<div style="color: white; padding: 20px;">Error loading login form. Please refresh the page.</div>';
    }
}

window.togglePassword = function (fieldId) {
    const field = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(fieldId + '-eye');

    if (field.type === 'password') {
        field.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye');
    } else {
        field.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

async function adminLogin(usernameOrEmail, password) {
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

function adminLogout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    window.location.href = 'AdminLogin.html';
}

if (window.location.pathname.includes('AdminLogin.html') || window.location.pathname.includes('adminlogin')) {
    console.log('On AdminLogin.html page');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, calling render()');
            render();
        });
    } else {
        console.log('DOM already ready, calling render()');
        render();
    }
    // animateLoginCard();
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('submit', async function (e) {
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
