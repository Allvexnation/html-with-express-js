/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import { isAuthenticated, removeToken, getToken } from 'https://jhon-code-elec7.netlify.app/token.js';

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
