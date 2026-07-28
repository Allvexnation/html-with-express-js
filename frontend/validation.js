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
        const validator = validationRules.email;
        const isValid = validator(value);
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
        if (window.triggerGreenBlink) window.triggerGreenBlink();
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
