/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import { initSteps } from 'https://jhon-code-elec7.netlify.app/steps.js';
import { initAuth } from 'https://jhon-code-elec7.netlify.app/auth.js';
import { initValidation } from 'https://jhon-code-elec7.netlify.app/validation.js';
import './animation.js';
import './user-profile.js';

async function init() {
    if (window.initAnimation) window.initAnimation();
    
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        initSteps('registrationForm');
        initValidation();
    }
    
    initAuth();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}