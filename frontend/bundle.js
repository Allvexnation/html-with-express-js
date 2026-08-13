/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import { initSteps } from './steps.js';
import { initAuth } from './auth.js';
import { initValidation } from './validation.js';

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