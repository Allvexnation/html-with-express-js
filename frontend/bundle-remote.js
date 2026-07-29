/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

// Token functions
const TOKEN_KEY = 'jwt_token';

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function isAuthenticated() {
    const token = getToken();
    return token !== null && token !== undefined && token !== '';
}

// Animation functions
function initAnimation() {
    const gridBg = document.querySelector('.grid-bg');
    const tileSize = 40;
    
    gridBg.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridBg.appendChild(gridContainer);
    
    const numTilesX = Math.ceil(window.innerWidth / tileSize) + 1;
    const numTilesY = Math.ceil(window.innerHeight / tileSize) + 1;
    
    const tiles = [];
    
    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile';
            tile.style.left = `${x * tileSize}px`;
            tile.style.top = `${y * tileSize}px`;
            tile.dataset.x = x;
            tile.dataset.y = y;
            gridContainer.appendChild(tile);
            tiles.push(tile);
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        const x = Math.floor(e.clientX / tileSize);
        const y = Math.floor(e.clientY / tileSize);
        
        const currentTile = tiles.find(tile => 
            parseInt(tile.dataset.x) === x && parseInt(tile.dataset.y) === y
        );
        if (currentTile) {
            currentTile.style.backgroundColor = '#ffffff';
            currentTile.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
            currentTile.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
        }
    });
    
    function randomFill() {
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        if (randomTile) {
            randomTile.style.backgroundColor = '#dddddd';
            randomTile.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
            randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
            
            setTimeout(() => {
                randomTile.style.backgroundColor = 'transparent';
                randomTile.style.boxShadow = 'none';
            }, 1000 + Math.random() * 2000);
        }
        
        setTimeout(randomFill, 100 + Math.random() * 200);
    }
    
    randomFill();

    window.triggerRedBlink = () => {
        const blinkCount = 10;
        let blinks = 0;

        const blink = () => {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            if (randomTile) {
                randomTile.style.backgroundColor = '#ff0000';
                randomTile.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
                randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
                
                setTimeout(() => {
                    randomTile.style.backgroundColor = 'transparent';
                    randomTile.style.boxShadow = 'none';
                }, 500);
            }

            blinks++;
            if (blinks < blinkCount) {
                setTimeout(blink, 300);
            }
        };

        blink();
    };

    window.triggerGreenBlink = () => {
        const blinkCount = 5;
        let blinks = 0;

        const blink = () => {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            if (randomTile) {
                randomTile.style.backgroundColor = '#22c55e';
                randomTile.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.8)';
                randomTile.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
                
                setTimeout(() => {
                    randomTile.style.backgroundColor = 'transparent';
                    randomTile.style.boxShadow = 'none';
                }, 500);
            }

            blinks++;
            if (blinks < blinkCount) {
                setTimeout(blink, 200);
            }
        };

        blink();
    };
    
    window.addEventListener('resize', () => {
        const newNumTilesX = Math.ceil(window.innerWidth / tileSize) + 1;
        const newNumTilesY = Math.ceil(window.innerHeight / tileSize) + 1;
        
        if (newNumTilesX !== numTilesX || newNumTilesY !== numTilesY) {
            gridContainer.innerHTML = '';
            tiles.length = 0;
            for (let y = 0; y < newNumTilesY; y++) {
                for (let x = 0; x < newNumTilesX; x++) {
                    const tile = document.createElement('div');
                    tile.className = 'grid-tile';
                    tile.style.left = `${x * tileSize}px`;
                    tile.style.top = `${y * tileSize}px`;
                    tile.dataset.x = x;
                    tile.dataset.y = y;
                    gridContainer.appendChild(tile);
                    tiles.push(tile);
                }
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimation);
} else {
    initAnimation();
}

window.initAnimation = initAnimation;

// Validation functions
const validationRules = {
    username: (value) => {
        return value.trim().length >= 3;
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    },
    password: (value) => {
        return value.trim().length >= 6;
    }
};

const errorMessages = {
    username: 'Username must be at least 3 characters long',
    email: 'Please enter a valid email address',
    password: 'Password must be at least 6 characters long',
    default: 'This field cannot be empty'
};

function validateField(input) {
    const fieldName = input.name;
    const value = input.value;
    const formId = input.form.id;

    if (!value || value.trim() === '') {
        updateFieldStyle(input, false);
        showError(errorMessages.default);
        return false;
    }

    if (fieldName === 'email') {
        input.value = input.value.toLowerCase();
        
        input.value = input.value.replace(/[^a-z0-9@._-]/g, '');
        
        const validator = validationRules.email;
        const isValid = validator(input.value);
        updateFieldStyle(input, isValid);
        if (!isValid) {
            showError(errorMessages.email);
        }
        return isValid;
    }

    if (formId === 'loginForm') {
        const isValid = value.trim().length > 0;
        updateFieldStyle(input, isValid);
        if (!isValid) {
            showError(errorMessages.default);
        }
        return isValid;
    }

    const validator = validationRules[fieldName];

    if (!validator) {
        const isValid = value.trim().length > 0;
        updateFieldStyle(input, isValid);
        if (!isValid) {
            showError(errorMessages.default);
        }
        return isValid;
    }

    const isValid = validator(value);
    updateFieldStyle(input, isValid);
    if (!isValid) {
        showError(errorMessages[fieldName] || errorMessages.default);
    }
    return isValid;
}

function showError(message) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.color = '#ef4444';
        messageDiv.style.fontWeight = 'bold';
    }
}

function clearError() {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = '';
    }
}

function updateFieldStyle(input, isValid) {
    if (isValid) {
        input.style.borderColor = '#22c55e';
        input.style.boxShadow = '0 0 8px rgba(34, 197, 94, 0.5)';
        clearError();
        
        const form = input.form;
        const allInputs = form.querySelectorAll('input');
        let allValid = true;
        allInputs.forEach(inp => {
            if (!inp.value || inp.value.trim() === '') {
                allValid = false;
            } else if (inp.name === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inp.value.trim())) allValid = false;
            } else if (inp.name === 'username' && inp.value.trim().length < 3) {
                allValid = false;
            } else if (inp.name === 'password' && inp.value.trim().length < 6) {
                allValid = false;
            }
        });
        
        if (allValid && window.triggerGreenBlink) window.triggerGreenBlink();
    } else {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 8px rgba(239, 68, 68, 0.5)';
        if (window.triggerRedBlink) window.triggerRedBlink();
    }
}

function resetFieldStyle(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
}

window.validateField = validateField;
window.resetFieldStyle = resetFieldStyle;

function setupEmailValidation() {
    const emailInputs = document.querySelectorAll('input[name="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toLowerCase();
            this.value = this.value.replace(/[^a-z0-9@._-]/g, '');
        });
    });
}

window.setupEmailValidation = setupEmailValidation;

// Steps functions
let currentStep = 0, steps = [];

function initSteps(formId) {
    const form = document.getElementById(formId);
    form.querySelectorAll('input').forEach((input, i) => {
        input.parentElement.style.cssText = `transition: all 0.3s ease; opacity: ${i === 0 ? 1 : 0}; transform: ${i === 0 ? 'translateX(0)' : 'translateX(20px)'}; display: ${i === 0 ? 'block' : 'none'}`;
        steps.push(input.parentElement);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextBtn = document.getElementById('nextBtn');
                const submitBtn = form.querySelector('button[type="submit"]');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    nextBtn.click();
                } else if (submitBtn && submitBtn.style.display !== 'none') {
                    submitBtn.click();
                }
            }
        });

        input.addEventListener('blur', () => {
            if (window.validateField) {
                validateField(input);
            }
        });

        input.addEventListener('input', () => {
            if (window.validateField && input.value.trim()) {
                validateField(input);
            } else if (window.resetFieldStyle && !input.value.trim()) {
                resetFieldStyle(input);
            }
        });
    });

    form.insertAdjacentHTML('beforeend', `
        <div class="flex justify-between mt-6">
            <button type="button" id="prevBtn" class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all hidden">Previous</button>
            <button type="button" id="nextBtn" class="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all ml-auto">Next</button>
        </div>
    `);

    document.getElementById('prevBtn').onclick = () => changeStep(-1);
    document.getElementById('nextBtn').onclick = () => changeStep(1);
    form.querySelector('button[type="submit"]').style.display = 'none';
}

window.initSteps = initSteps;

function changeStep(dir) {
    const newStep = currentStep + dir;
    if (newStep < 0 || newStep >= steps.length) return;

    if (dir > 0) {
        const currentInput = steps[currentStep].querySelector('input');
        if (window.validateField) {
            const isValid = validateField(currentInput);
            if (!isValid) {
                currentInput.focus();
                return;
            }
            if (window.triggerGreenBlink) window.triggerGreenBlink();
            setTimeout(() => {
                proceedToStep(dir, newStep);
            }, 300);
            return;
        } else {
            if (!currentInput.value.trim()) {
                currentInput.style.borderColor = 'red';
                currentInput.focus();
                if (window.triggerRedBlink) window.triggerRedBlink();
                return;
            }
        }
    }

    proceedToStep(dir, newStep);
}

function proceedToStep(dir, newStep) {

    steps[currentStep].style.opacity = 0;
    steps[currentStep].style.transform = dir > 0 ? 'translateX(-20px)' : 'translateX(20px)';
    
    setTimeout(() => {
        steps[currentStep].style.display = 'none';
        currentStep = newStep;
        steps[currentStep].style.display = 'block';
        setTimeout(() => {
            steps[currentStep].style.opacity = 1;
            steps[currentStep].style.transform = 'translateX(0)';
        }, 10);

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.querySelector('form button[type="submit"]');

        prevBtn.classList.toggle('hidden', currentStep === 0);
        nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'block';
        submitBtn.style.display = currentStep === steps.length - 1 ? 'block' : 'none';
    }, 300);
}

// Auth functions
const API_URL = 'https://jhon-ladines-backend-elec7.onrender.com/api/auth';

async function register(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (window.validateField) {
            if (!validateField(input)) {
                isValid = false;
            }
        } else if (!input.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const btn = document.getElementById('registerBtn');

    btn.disabled = true;
    btn.textContent = 'Registering...';

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        
        if (res.ok) {
            alert('Registration successful!');
            e.target.reset();
            window.location.href = 'index.html';
        } else {
            alert(result.message || 'Registration failed');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Register';
    }
}

async function login(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (window.validateField) {
            if (!validateField(input)) {
                isValid = false;
            }
        } else if (!input.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const btn = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.textContent = 'Logging in...';

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const result = await res.json();
            if (result.token) {
                setToken(result.token);
            }
            window.location.href = 'home.html';
        } else {
            const result = await res.json();
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Login';
    }
}

window.register = register;
window.login = login;

// Home functions
if (document.getElementById('usersBody') && !isAuthenticated()) {
    window.location.href = 'index.html';
}

async function loadUsers() {
    const tbody = document.getElementById('usersBody');
    if (!tbody) return;

    const token = getToken();
    const response = await fetch('https://jhon-ladines-backend-elec7.onrender.com/api/auth/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const users = await response.json();

    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'border-b border-white/10 hover:bg-white/5 transition-colors';
        row.innerHTML = `
            <td class="py-4 px-6">${user.id}</td>
            <td class="py-4 px-6">${user.email}</td>
            <td class="py-4 px-6">${user.created_at}</td>
        `;
        tbody.appendChild(row);
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        removeToken();
        window.location.href = 'index.html';
    }
}

window.logout = logout;

loadUsers();

// Init function
async function init() {
    if (window.initAnimation) window.initAnimation();
    lucide.createIcons();
    
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    if (registerForm) {
        initSteps('registerForm');
        registerForm.addEventListener('submit', register);
    }
    
    if (loginForm) {
        initSteps('loginForm');
        loginForm.addEventListener('submit', login);
    }
    
    if (window.setupEmailValidation) {
        window.setupEmailValidation();
    }
}

init();
