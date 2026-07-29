/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import 'http://127.0.0.2:5500/frontend/animation.js';
import 'http://127.0.0.2:5500/frontend/auth.js';
import 'http://127.0.0.2:5500/frontend/home.js';
import 'http://127.0.0.2:5500/frontend/steps.js';
import 'http://127.0.0.2:5500/frontend/validation.js';

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