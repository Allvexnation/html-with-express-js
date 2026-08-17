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

function animateLoginCard() {
    const card = document.querySelector('main');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px) scale(0.8) rotateX(20deg)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }, 100);
    }

    const leftPanel = document.querySelector('aside');
    if (leftPanel) {
        leftPanel.style.opacity = '0';
        leftPanel.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            leftPanel.style.opacity = '1';
        }, 300);
    }

    const rightPanel = document.querySelector('section');
    if (rightPanel) {
        rightPanel.style.opacity = '0';
        rightPanel.style.transform = 'translateX(50px)';
        rightPanel.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            rightPanel.style.opacity = '1';
            rightPanel.style.transform = 'translateX(0)';
        }, 400);
    }

    const heading = document.querySelector('section h1');
    if (heading) {
        heading.style.opacity = '0';
        heading.style.transform = 'scale(0) rotate(-10deg)';
        heading.style.transition = 'opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            heading.style.opacity = '1';
            heading.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }

    const subheading = document.querySelector('section p.mb-8');
    if (subheading) {
        subheading.style.opacity = '0';
        subheading.style.transform = 'translateX(-30px)';
        subheading.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            subheading.style.opacity = '1';
            subheading.style.transform = 'translateX(0)';
        }, 600);
    }

    const formGroups = document.querySelectorAll('form .mb-4');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px) rotate(-5deg) scale(0.9)';
        group.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        }, 700 + (index * 100));
    });

    const primaryBtn = document.querySelector('form button[type="submit"]');
    if (primaryBtn) {
        primaryBtn.style.opacity = '0';
        primaryBtn.style.transform = 'scale(0) translateY(20px)';
        primaryBtn.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            primaryBtn.style.opacity = '1';
            primaryBtn.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => {
                primaryBtn.style.animation = 'pulse 2s infinite';
            }, 500);
        }, 700 + (formGroups.length * 100) + 100);
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }, 700 + (formGroups.length * 100) + 200);
    }

    const shieldIcon = document.querySelector('aside .text-center i[data-lucide="shield"]');
    if (shieldIcon) {
        shieldIcon.style.opacity = '0';
        shieldIcon.style.transform = 'scale(0) rotate(-180deg)';
        shieldIcon.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            shieldIcon.style.opacity = '0.9';
            shieldIcon.style.transform = 'scale(1) rotate(0deg)';
            setTimeout(() => {
                shieldIcon.style.animation = 'pulse 2s infinite';
            }, 500);
        }, 200);
    }

    const adminHeading = document.querySelector('aside .text-center h2.text-3xl');
    if (adminHeading) {
        adminHeading.style.opacity = '0';
        adminHeading.style.transform = 'translateY(-30px) scale(0.8)';
        adminHeading.style.transition = 'opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            adminHeading.style.opacity = '1';
            adminHeading.style.transform = 'translateY(0) scale(1)';
        }, 400);
    }

    const adminSubtitle = document.querySelector('aside .text-center p.text-blue-100');
    if (adminSubtitle) {
        adminSubtitle.style.opacity = '0';
        adminSubtitle.style.transform = 'translateY(20px)';
        adminSubtitle.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            adminSubtitle.style.opacity = '1';
            adminSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
}


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

export function adminLogout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    window.location.href = 'AdminLogin.html';
}

if (window.location.pathname.includes('AdminLogin.html') || window.location.pathname.includes('adminlogin')) {
    render();
    animateLoginCard();
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

