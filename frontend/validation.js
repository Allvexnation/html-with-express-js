/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

export function initValidation() {
    const cellNumber = document.getElementById('cellNumber');
    const email = document.getElementById('email');
    const regUsername = document.getElementById('regUsername');
    const dateOfBirth = document.getElementById('dateOfBirth');
    const registrationForm = document.getElementById('registrationForm');
    const submitButton = registrationForm.querySelector('button[type="submit"]');

    if (!cellNumber || !email || !regUsername || !dateOfBirth || !registrationForm) {
        console.log('Validation: Required elements not found, skipping initialization');
        return;
    }

    const emailError = document.createElement('label');
    emailError.id = 'emailError';
    emailError.className = 'text-red-500 text-xs mt-1 hidden';
    email.parentNode.appendChild(emailError);

    const usernameError = document.createElement('label');
    usernameError.id = 'usernameError';
    usernameError.className = 'text-red-500 text-xs mt-1 hidden';
    regUsername.parentNode.appendChild(usernameError);

    const today = new Date();
    const minAge = 12;
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxDateString = maxDate.toISOString().split('T')[0];
    dateOfBirth.setAttribute('max', maxDateString);

    cellNumber.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    email.addEventListener('input', function(e) {
        this.value = this.value.toLowerCase();
        const value = this.value;
        const allowedChars = /^[a-z0-9@.]*$/;
        
        if (!allowedChars.test(value)) {
            this.value = value.replace(/[^a-z0-9@.]/g, '');
        }
        
        if (value && value.includes('@') && value.includes('.')) {
            emailError.textContent = 'Validating...';
            emailError.classList.remove('hidden');
            emailError.classList.remove('text-red-500');
            emailError.classList.add('text-blue-500');
            email.classList.remove('border-red-500');
            updateSubmitButton();
        } else {
            emailError.classList.add('hidden');
            email.classList.remove('border-red-500');
            updateSubmitButton();
        }
    });

    email.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && value.includes('@') && value.includes('.')) {
            checkEmailExists(value);
        }
    });

    async function checkEmailExists(emailValue) {
        try {
            emailError.textContent = 'Validating...';
            emailError.classList.remove('hidden');
            emailError.classList.remove('text-red-500', 'text-green-500');
            emailError.classList.add('text-blue-500');
            email.classList.remove('border-red-500');
            
            const response = await fetch(`https://jhon-ladines-server-elec7.onrender.com/api/auth/check-email?email=${encodeURIComponent(emailValue)}`);
            const data = await response.json();
            
            console.log('Email check response:', data);
            
            if (data.exists) {
                emailError.textContent = 'Email already exists';
                emailError.classList.remove('hidden');
                emailError.classList.remove('text-blue-500');
                emailError.classList.add('text-red-500');
                email.classList.add('border-red-500');
                console.log('Email exists - showing error');
            } else {
                emailError.textContent = 'Email available';
                emailError.classList.remove('hidden');
                emailError.classList.remove('text-red-500');
                emailError.classList.add('text-green-500');
                email.classList.remove('border-red-500');
                console.log('Email does not exist - showing available');
                
                setTimeout(() => {
                    emailError.classList.add('hidden');
                }, 2000);
            }
        } catch (error) {
            console.error('Error checking email:', error);
            emailError.textContent = 'Error checking email';
            emailError.classList.remove('hidden');
            emailError.classList.remove('text-blue-500', 'text-green-500');
            emailError.classList.add('text-red-500');
        }
        updateSubmitButton();
    }
    
    window.checkEmailExists = checkEmailExists;

    regUsername.addEventListener('input', function(e) {
        const value = this.value;
        const allowedChars = /^[a-zA-Z0-9_.]*$/;
        
        if (!allowedChars.test(value)) {
            this.value = value.replace(/[^a-zA-Z0-9_.]/g, '');
        }
        
        if (value.length >= 3) {
            usernameError.textContent = 'Validating...';
            usernameError.classList.remove('hidden');
            usernameError.classList.remove('text-red-500');
            usernameError.classList.add('text-blue-500');
            regUsername.classList.remove('border-red-500');
            updateSubmitButton();
        } else {
            usernameError.classList.add('hidden');
            regUsername.classList.remove('border-red-500');
            updateSubmitButton();
        }
    });

    regUsername.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value.length >= 3) {
            checkUsernameExists(value);
        }
    });

    async function checkUsernameExists(username) {
        try {
            usernameError.textContent = 'Validating...';
            usernameError.classList.remove('hidden');
            usernameError.classList.remove('text-red-500', 'text-green-500');
            usernameError.classList.add('text-blue-500');
            regUsername.classList.remove('border-red-500');
            
            const response = await fetch(`https://jhon-ladines-server-elec7.onrender.com/api/auth/check-username?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            
            console.log('Username check response:', data);
            
            if (data.exists) {
                usernameError.textContent = 'Username already exists';
                usernameError.classList.remove('hidden');
                usernameError.classList.remove('text-blue-500');
                usernameError.classList.add('text-red-500');
                regUsername.classList.add('border-red-500');
                console.log('Username exists - showing error');
            } else {
                usernameError.textContent = 'Username available';
                usernameError.classList.remove('hidden');
                usernameError.classList.remove('text-red-500');
                usernameError.classList.add('text-green-500');
                regUsername.classList.remove('border-red-500');
                console.log('Username does not exist - showing available');
                
                setTimeout(() => {
                    usernameError.classList.add('hidden');
                }, 2000);
            }
        } catch (error) {
            console.error('Error checking username:', error);
            usernameError.textContent = 'Error checking username';
            usernameError.classList.remove('hidden');
            usernameError.classList.remove('text-blue-500', 'text-green-500');
            usernameError.classList.add('text-red-500');
        }
        updateSubmitButton();
    }
    
    window.checkUsernameExists = checkUsernameExists;

    function updateSubmitButton() {
        const hasEmailError = emailError.classList.contains('text-red-500');
        const hasUsernameError = usernameError.classList.contains('text-red-500');
        
        if (hasEmailError || hasUsernameError) {
            submitButton.disabled = true;
            submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailValue = email.value.trim();
        if (emailValue && emailValue.includes('@') && emailValue.includes('.')) {
            checkEmailExists(emailValue);
        }
        
        const usernameValue = regUsername.value.trim();
        if (usernameValue.length >= 3) {
            checkUsernameExists(usernameValue);
        }
        
        setTimeout(() => {
            if (!emailError.classList.contains('hidden') || !usernameError.classList.contains('hidden')) {
                return;
            }
            registrationForm.submit();
        }, 100);
    });
}
