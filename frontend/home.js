/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

import { isAuthenticated, removeToken, getToken } from './token.js';
import { getCurrentUser } from './auth.js';

const API_BASE = 'http://localhost:5000/api';

// Check authentication on page load - redirect to login if not authenticated
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Fetch fresh user data from server to get profile image
async function fetchCurrentUser() {
    try {
        const token = getToken();
        const response = await fetch(`${API_BASE}/auth/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const users = await response.json();
            const currentUser = getCurrentUser();
            const freshUserData = users.find(u => u.id === currentUser.id);
            
            if (freshUserData) {
                // Update localStorage with fresh data including profile_image
                const updatedUser = {
                    id: freshUserData.id,
                    username: freshUserData.username,
                    email: freshUserData.email,
                    fullName: freshUserData.full_name,
                    profile_image: freshUserData.profile_image,
                    created_at: freshUserData.created_at
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
    }
}

// Fetch fresh user data on page load
fetchCurrentUser();

// API functions for subjects, enrollments, grades
async function getSubjects() {
    try {
        const response = await fetch(`${API_BASE}/subjects`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getStudentEnrollments(studentId) {
    try {
        const url = `${API_BASE}/enrollments/student/${studentId}`;
        console.log('Fetching enrollments from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Enrollments response:', data);
        return { success: response.ok, data };
    } catch (error) {
        console.error('Enrollments error:', error);
        return { success: false, error: error.message };
    }
}

async function getStudentGrades(studentId) {
    try {
        const url = `${API_BASE}/grades/student/${studentId}`;
        console.log('Fetching grades from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Grades response:', data);
        return { success: response.ok, data };
    } catch (error) {
        console.error('Grades error:', error);
        return { success: false, error: error.message };
    }
}

async function getStudentCompletions(studentId) {
    try {
        const url = `${API_BASE}/subject-completions/student/${studentId}`;
        console.log('Fetching completions from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Completions response:', data);
        return { success: response.ok, data };
    } catch (error) {
        console.error('Completions error:', error);
        return { success: false, error: error.message };
    }
}

async function loadUsers() {
    const tbody = document.getElementById('usersBody');
    if (!tbody) return;

    const token = getToken();
    const response = await fetch('http://localhost:5000/api/auth/users', {
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

function updateGreeting() {
    const user = getCurrentUser();
    const greetingElement = document.getElementById('greeting');
    console.log('User from localStorage:', user);
    console.log('Greeting element:', greetingElement);
    if (user && greetingElement) {
        const name = user.fullName || user.username || 'User';
        const hour = new Date().getHours();
        let timeGreeting = 'Good Morning';
        if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
        else if (hour >= 17) timeGreeting = 'Good Evening';
        greetingElement.textContent = `${timeGreeting}, ${name}! 👋`;
    } else {
        console.log('User not found or greeting element missing');
    }
}

function showUserProfile() {
    console.log('showUserProfile called');
    const user = getCurrentUser();
    console.log('User data:', user);
    if (!user) {
        alert('No user information available');
        return;
    }

    // Create modal if it doesn't exist
    let modal = document.getElementById('userProfileModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'userProfileModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">User Profile</h2>
                    <button onclick="closeUserProfile()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div id="userProfileContent" class="space-y-4">
                    <!-- User info will be populated here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Populate user info in view mode
    renderProfileView(user);

    modal.style.display = 'flex';
}

function closeUserProfile() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Render profile in view mode
function renderProfileView(user) {
    const content = document.getElementById('userProfileContent');
    
    // Format created date
    let formattedDate = 'N/A';
    if (user.created_at) {
        const date = new Date(user.created_at);
        formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    content.innerHTML = `
        <div class="flex items-center space-x-4 mb-6">
            <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center overflow-hidden">
                ${user.profile_image 
                    ? `<img src="${user.profile_image}" alt="Profile" class="w-full h-full object-cover rounded-full">`
                    : `<i class="fas fa-user text-blue-600 text-2xl"></i>`
                }
            </div>
            <div>
                <p class="font-semibold text-gray-800 text-lg">${user.fullName || user.username || 'N/A'}</p>
                <p class="text-gray-500">${user.email || 'N/A'}</p>
            </div>
        </div>
        <div class="border-t pt-4 space-y-2">
            <p class="text-sm text-gray-500"><strong>Username:</strong> ${user.username || 'N/A'}</p>
            <p class="text-sm text-gray-500"><strong>Email:</strong> ${user.email || 'N/A'}</p>
            <p class="text-sm text-gray-500"><strong>User ID:</strong> ${user.id || 'N/A'}</p>
            <p class="text-sm text-gray-500"><strong>Created:</strong> ${formattedDate}</p>
        </div>
        <div class="flex space-x-3 pt-4">
            <button onclick="renderProfileEdit()" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Edit Profile
            </button>
            <button onclick="logout()" class="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    `;
}

// Render profile in edit mode
function renderProfileEdit() {
    const user = getCurrentUser();
    
    // Format created date
    let formattedDate = 'N/A';
    if (user.created_at) {
        const date = new Date(user.created_at);
        formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    const content = document.getElementById('userProfileContent');
    content.innerHTML = `
        <form id="profileForm" class="space-y-4">
            <div class="flex items-center space-x-4 mb-6">
                <div class="relative">
                    <div id="profileImagePreview" class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center overflow-hidden">
                        ${user.profile_image 
                            ? `<img src="${user.profile_image}" alt="Profile" class="w-full h-full object-cover rounded-full">`
                            : `<i class="fas fa-user text-blue-600 text-2xl"></i>`
                        }
                    </div>
                    <label for="profileImage" class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700">
                        <i class="fas fa-camera text-xs"></i>
                    </label>
                    <input type="file" id="profileImage" accept="image/*" class="hidden" onchange="previewProfileImage(event)">
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="fullName" value="${user.fullName || user.username || ''}" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" id="username" value="${user.username || ''}" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" value="${user.email || ''}" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">User ID (Read-only)</label>
                    <input type="text" id="userId" value="${user.id || 'N/A'}" readonly
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Created (Read-only)</label>
                    <input type="text" value="${formattedDate}" readonly
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed">
                </div>
            </div>
            <div class="flex space-x-3 pt-4">
                <button type="button" onclick="cancelEdit()" class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
                    Cancel
                </button>
                <button type="button" onclick="saveProfile()" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Save Changes
                </button>
            </div>
        </form>
    `;
}

// Cancel edit and return to view mode
window.cancelEdit = function() {
    const user = getCurrentUser();
    renderProfileView(user);
};

window.showUserProfile = showUserProfile;
window.closeUserProfile = closeUserProfile;
window.renderProfileEdit = renderProfileEdit;

// Preview profile image before upload
window.previewProfileImage = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profileImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
        };
        reader.readAsDataURL(file);
    }
};

// Save profile changes with confirmation
window.saveProfile = async function() {
    const user = getCurrentUser();
    if (!user || !user.id) {
        alert('User not found');
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const profileImageInput = document.getElementById('profileImage');

    // Show confirmation dialog
    if (!confirm('Are you sure you want to save these changes?')) {
        return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);

    if (profileImageInput.files[0]) {
        formData.append('profile_image', profileImageInput.files[0]);
    }

    try {
        const token = getToken();
        const response = await fetch(`${API_BASE}/auth/profile/${user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const updatedUser = await response.json();
            
            // Update localStorage with new user data
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Update greeting
            updateGreeting();
            
            alert('Profile updated successfully!');
            
            // Return to view mode
            renderProfileView(updatedUser);
        } else {
            const error = await response.json();
            alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
    }
};

// Add event listener for profile icon
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) {
        profileIcon.addEventListener('click', showUserProfile);
    }
});

// Update greeting with user's name on page load
updateGreeting();

loadUsers();

// Load student data (subjects, enrollments, grades)
async function loadStudentData() {
    const user = getCurrentUser();
    console.log('Current user:', user);
    if (!user || !user.id) {
        console.error('No user or user ID found');
        return;
    }

    // Load subjects
    const subjectsResult = await getSubjects();
    if (subjectsResult.success && subjectsResult.data) {
        const subjectsCount = subjectsResult.data.length;
        const statSubjects = document.getElementById('statSubjects');
        if (statSubjects) statSubjects.textContent = subjectsCount;

        // Populate All Subjects page
        const allSubjectsContainer = document.getElementById('allSubjectsContainer');
        if (allSubjectsContainer) {
            allSubjectsContainer.innerHTML = subjectsResult.data.map(subject => `
                <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                    ${subject.cover_photo 
                        ? `<img src="${subject.cover_photo}" alt="${subject.subject_name}" class="w-full h-40 object-cover">`
                        : `<div class="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                            <i class="fas fa-book text-white text-4xl"></i>
                        </div>`
                    }
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">${subject.subject_code}</span>
                        </div>
                        <h3 class="font-semibold text-gray-800 mb-2">${subject.subject_name}</h3>
                        <p class="text-sm text-gray-500 mb-2">${subject.teacher_name || 'No teacher assigned'}</p>
                        <p class="text-xs text-gray-400">${subject.description || 'No description'}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // Load enrollments
    const enrollmentsResult = await getStudentEnrollments(user.id);
    if (enrollmentsResult.success && enrollmentsResult.data) {
        const enrolledSubjects = enrollmentsResult.data.subjects || [];
        
        // Get completed subjects count from completions table
        const completionsResult = await getStudentCompletions(user.id);
        const completedCount = completionsResult.success && completionsResult.data 
            ? completionsResult.data.length 
            : 0;
        
        const statCompleted = document.getElementById('statCompleted');
        if (statCompleted) statCompleted.textContent = completedCount;
        
        // Update current date text with enrollment info
        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', options);
            currentDateElement.textContent = `${dateString} - ${enrolledSubjects.length} courses enrolled - ${completedCount} completed`;
        }

        // Populate My Enrolled Subjects page
        const myEnrolledSubjectsContainer = document.getElementById('myEnrolledSubjectsContainer');
        
        // Get completed subjects
        const subjectCompletionsResult = await getStudentCompletions(user.id);
        const completedSubjectIds = subjectCompletionsResult.success && subjectCompletionsResult.data 
            ? subjectCompletionsResult.data.map(c => c.subject_id) 
            : [];
        
        if (myEnrolledSubjectsContainer && enrolledSubjects.length > 0) {
            myEnrolledSubjectsContainer.innerHTML = enrolledSubjects.map(subject => {
                const isCompleted = completedSubjectIds.includes(subject.id);
                return `
                <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden ${isCompleted ? 'border-2 border-green-500' : ''}">
                    ${subject.cover_photo 
                        ? `<img src="${subject.cover_photo}" alt="${subject.subject_name}" class="w-full h-40 object-cover">`
                        : `<div class="w-full h-40 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                            <i class="fas fa-book-open text-white text-4xl"></i>
                        </div>`
                    }
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-xs ${isCompleted ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full">${subject.subject_code}</span>
                        </div>
                        <h3 class="font-semibold text-gray-800 mb-2">${subject.subject_name}</h3>
                        <p class="text-sm text-gray-500 mb-2">${subject.teacher_name || 'No teacher assigned'}</p>
                        <p class="text-xs text-gray-400 mb-4">${subject.description || 'No description'}</p>
                        ${isCompleted 
                            ? '<button disabled class="w-full bg-gray-400 text-white py-2 rounded-lg font-medium cursor-not-allowed">Completed ✓</button>'
                            : `<button onclick="markSubjectComplete('${subject.id}')" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
                                Complete
                            </button>`
                        }
                    </div>
                </div>
            `}).join('');
        } else if (myEnrolledSubjectsContainer) {
            myEnrolledSubjectsContainer.innerHTML = '<p class="text-gray-500 col-span-3">You are not enrolled in any subjects yet</p>';
        }
    }

    // Load grades
    const gradesResult = await getStudentGrades(user.id);
    console.log('Grades result:', gradesResult);
    
    if (gradesResult.success) {
        const grades = gradesResult.data || [];
        console.log('Grades data:', grades);
        
        if (grades.length > 0) {
            const avgGrade = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
            const statAvgGrade = document.getElementById('statAvgGrade');
            if (statAvgGrade) statAvgGrade.textContent = `${Math.round(avgGrade)}%`;

            // Populate My Grades page
            const myGradesContainer = document.getElementById('myGradesContainer');
            if (myGradesContainer) {
                myGradesContainer.innerHTML = `
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Subject</th>
                                <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                                <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${grades.map(grade => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="py-3 px-4 text-sm text-gray-800">${grade.subjects?.subject_name || 'Unknown'}</td>
                                    <td class="py-3 px-4 text-sm">
                                        <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                            grade.grade >= 90 ? 'bg-green-100 text-green-800' :
                                            grade.grade >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }">${grade.grade}%</span>
                                    </td>
                                    <td class="py-3 px-4 text-sm text-gray-600">${grade.remarks || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
        } else {
            const myGradesContainer = document.getElementById('myGradesContainer');
            if (myGradesContainer) {
                myGradesContainer.innerHTML = '<p class="text-gray-500">No grades available yet</p>';
            }
        }
    } else {
        console.error('Failed to load grades:', gradesResult.error);
        const myGradesContainer = document.getElementById('myGradesContainer');
        if (myGradesContainer) {
            myGradesContainer.innerHTML = `<p class="text-red-500">Failed to load grades: ${gradesResult.error || 'Unknown error'}</p>`;
        }
    }
}

// Page navigation function
window.switchPage = function(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }

    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-blue-700');
        link.classList.add('hover:bg-blue-800');
    });

    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-blue-700');
        activeLink.classList.remove('hover:bg-blue-800');
    }
};

// Mark subject as complete
window.markSubjectComplete = function(subjectId) {
    if (confirm('Are you sure you want to mark this subject as complete?')) {
        completeSubject(subjectId);
    }
};

// Complete subject (mark as completed in subject_completions table)
async function completeSubject(subjectId) {
    const user = getCurrentUser();
    if (!user || !user.id) {
        alert('User not found');
        return;
    }

    try {
        // Mark subject as complete
        const response = await fetch(`${API_BASE}/subject-completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: user.id,
                subjectId: subjectId
            })
        });

        if (response.ok) {
            alert('Subject marked as completed!');
            // Reload the page to update the UI
            loadStudentData();
        } else {
            alert('Failed to mark subject as completed');
        }
    } catch (error) {
        console.error('Error marking subject as completed:', error);
        alert('Failed to mark subject as completed');
    }
}

// Load student data on page load
loadStudentData();
