/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import 'https://jhon-code-elec7.netlify.app/animation.js';
import 'https://jhon-code-elec7.netlify.app/auth.js';
import 'https://jhon-code-elec7.netlify.app/home.js';
import 'https://jhon-code-elec7.netlify.app/steps.js';
import 'https://jhon-code-elec7.netlify.app/validation.js';

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