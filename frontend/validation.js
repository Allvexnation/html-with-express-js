/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

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
        
        // Only trigger green blink if all fields in the form are valid
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
