/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import { animateProfileShow, animateProfileHide } from './animation.js';

const API_BASE = 'https://jhon-ladines-server-elec7.onrender.com/api/auth';
let debounceTimer;

async function fetchUserByUsernameOrEmail(input) {
    if (!input || input.length < 3) {
        hideProfile();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/users`);
        if (!response.ok) return;

        const users = await response.json();
        
        const user = users.find(u => 
            u.username?.toLowerCase() === input.toLowerCase() || 
            u.email?.toLowerCase() === input.toLowerCase()
        );

        if (user) {
            displayProfile(user);
        } else {
            hideProfile();
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

function hideProfile() {
    const userProfile = document.getElementById('userProfile');
    if (userProfile && !userProfile.classList.contains('hidden')) {
        animateProfileHide(userProfile, () => {
            userProfile.classList.add('hidden');
        });
    }
}

function setupRealTimeUserFetch() {
    const usernameInput = document.getElementById('username');
    
    if (usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                fetchUserByUsernameOrEmail(e.target.value);
            }, 500);
        });
    }
}

function checkAuthAndLoadProfile() {
    const token = localStorage.getItem('jwt_token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
        return;
    }

    try {
        const currentUser = JSON.parse(userData);
        displayProfile(currentUser);
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

function displayProfile(user) {
    const userProfile = document.getElementById('userProfile');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userEmail = document.getElementById('userEmail');
    const profileImage = document.getElementById('profileImage');
    const defaultAvatar = document.getElementById('defaultAvatar');

    if (!userProfile) return;

    const displayName = user.fullName || user.username || 'User';
    welcomeMessage.textContent = `Welcome, ${displayName}`;
    
    userEmail.textContent = user.email || '';

    if (user.profile_image) {
        profileImage.src = user.profile_image;
        profileImage.classList.remove('hidden');
        defaultAvatar.classList.add('hidden');
    } else {
        profileImage.classList.add('hidden');
        defaultAvatar.classList.remove('hidden');
    }

    userProfile.classList.remove('hidden');
    animateProfileShow(userProfile);

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndLoadProfile();
    setupRealTimeUserFetch();
});

window.addEventListener('storage', () => {
    checkAuthAndLoadProfile();
});

window.addEventListener('userLoggedIn', (event) => {
    const user = event.detail;
    displayProfile(user);
});
