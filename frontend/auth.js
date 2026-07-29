/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

const API_URL = 'http://localhost:5000/api/auth';
import { setToken } from './token.js';

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
