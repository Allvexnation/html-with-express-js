/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

const API_URL = 'http://localhost:5000/api/auth';

async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

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
    }
}

async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            window.location.href = 'home.html';
        } else {
            const result = await res.json();
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        alert(error.message);
    }
}
