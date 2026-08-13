import { isAuthenticated, removeToken, getToken } from './token.js';
import { getCurrentUser } from './auth.js';

const API_BASE = 'https://jhon-ladines-server-elec7.onrender.com/api';
const root = document.getElementById('root');

// Check authentication on page load - redirect to login if not authenticated
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Set current date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();
const dateString = today.toLocaleDateString('en-US', options);

// State for page switching
let currentPage = 'dashboard';

// Data state
let subjectsData = [];
let enrollmentsData = [];
let gradesData = [];
let completionsData = [];

// API functions
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
        const response = await fetch(url);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getStudentGrades(studentId) {
    try {
        const url = `${API_BASE}/grades/student/${studentId}`;
        const response = await fetch(url);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getStudentCompletions(studentId) {
    try {
        const url = `${API_BASE}/subject-completions/student/${studentId}`;
        const response = await fetch(url);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

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

// Page content templates (dynamic)
function getDashboardContent() {
    const user = getCurrentUser();
    const name = user?.fullName || user?.username || 'User';
    const hour = new Date().getHours();
    let timeGreeting = 'Good Morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    else if (hour >= 17) timeGreeting = 'Good Evening';

    const enrolledCount = enrollmentsData.subjects?.length || 0;
    const completedCount = completionsData.length || 0;
    const subjectsCount = subjectsData.length || 0;
    const avgGrade = gradesData.length > 0 
        ? Math.round(gradesData.reduce((sum, g) => sum + g.grade, 0) / gradesData.length) 
        : 0;

    return `
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
            <h1 class="text-3xl font-bold mb-2" id="greeting">${timeGreeting}, ${name}! 👋</h1>
            <p class="text-blue-100 mb-6" id="currentDate">${dateString} - ${enrolledCount} courses enrolled - ${completedCount} completed</p>
            <div class="flex space-x-4">
                <button onclick="switchPage('subjects')" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center space-x-2">
                    <i class="fas fa-search"></i>
                    <span>Explore Subject</span>
                </button>
                <button onclick="switchPage('my-subjects')" class="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center space-x-2">
                    <i class="fas fa-book"></i>
                    <span>My Subject</span>
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-blue-100 p-4 rounded-full">
                    <i class="fas fa-file-alt text-blue-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statSubjects">${subjectsCount}</p>
                    <p class="text-gray-500">SUBJECT</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-green-100 p-4 rounded-full">
                    <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statCompleted">${completedCount}</p>
                    <p class="text-gray-500">COMPLETED</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-orange-100 p-4 rounded-full">
                    <i class="fas fa-clipboard-list text-orange-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800">2</p>
                    <p class="text-gray-500">QUIZ ATTEMPTS</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-yellow-100 p-4 rounded-full">
                    <i class="fas fa-star text-yellow-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statAvgGrade">${avgGrade}%</p>
                    <p class="text-gray-500">AVG QUIZ SCORE</p>
                </div>
            </div>
        </div>

        <!-- Quick Access -->
        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-bolt text-yellow-500 mr-2"></i>
            Quick Access
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div onclick="switchPage('subjects')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-search text-purple-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Browse Subjects</h3>
                <p class="text-gray-500 text-sm">Explore available courses</p>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-gamepad text-red-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Quiz Games</h3>
                <p class="text-gray-500 text-sm">Test your knowledge</p>
            </div>
            <div onclick="switchPage('grades')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-chart-line text-green-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">My Grades</h3>
                <p class="text-gray-500 text-sm">View your performance</p>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-tasks text-blue-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">My Progress</h3>
                <p class="text-gray-500 text-sm">Track your learning</p>
            </div>
        </div>
    `;
}

function getSubjectsContent() {
    if (subjectsData.length === 0) {
        return `
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-book text-blue-500 mr-3"></i>
                All Subjects
            </h1>
            <div class="bg-white rounded-xl p-6 shadow-md">
                <p class="text-gray-500">Loading subjects...</p>
            </div>
        `;
    }

    return `
        <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-book text-blue-500 mr-3"></i>
            All Subjects
        </h1>
        <div id="allSubjectsContainer" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${subjectsData.map(subject => `
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
            `).join('')}
        </div>
    `;
}

function getMySubjectsContent() {
    const enrolledSubjects = enrollmentsData.subjects || [];
    const completedSubjectIds = completionsData.map(c => c.subject_id);

    if (enrolledSubjects.length === 0) {
        return `
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-book-open text-green-500 mr-3"></i>
                My Enrolled Subjects
            </h1>
            <div class="bg-white rounded-xl p-6 shadow-md">
                <p class="text-gray-500">You are not enrolled in any subjects yet</p>
            </div>
        `;
    }

    return `
        <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-book-open text-green-500 mr-3"></i>
            My Enrolled Subjects
        </h1>
        <div id="myEnrolledSubjectsContainer" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${enrolledSubjects.map(subject => {
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
            `}).join('')}
        </div>
    `;
}

function getGradesContent() {
    if (gradesData.length === 0) {
        return `
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-chart-bar text-purple-500 mr-3"></i>
                My Grades
            </h1>
            <div class="bg-white rounded-xl shadow-md p-6">
                <p class="text-gray-500">No grades available yet</p>
            </div>
        `;
    }

    return `
        <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-chart-bar text-purple-500 mr-3"></i>
            My Grades
        </h1>
        <div class="bg-white rounded-xl shadow-md p-6">
            <table class="w-full">
                <thead>
                    <tr class="border-b">
                        <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Subject</th>
                        <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                        <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    ${gradesData.map(grade => `
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
        </div>
    `;
}

// Render function
function render() {
    const header = `
        <header class="bg-blue-900 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4 flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <i class="fas fa-graduation-cap text-2xl"></i>
                    <span class="font-bold text-lg">CRT COLLEGE LMS | SJ</span>
                </div>

                <!-- Navigation -->
                <nav class="hidden md:flex items-center space-x-6">
                    <a href="#" onclick="switchPage('dashboard')" class="nav-link flex items-center space-x-2 ${currentPage === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="dashboard">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" onclick="switchPage('subjects')" class="nav-link flex items-center space-x-2 ${currentPage === 'subjects' ? 'bg-blue-700' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="subjects">
                        <i class="fas fa-book"></i>
                        <span>Subjects</span>
                    </a>
                    <a href="#" onclick="switchPage('my-subjects')" class="nav-link flex items-center space-x-2 ${currentPage === 'my-subjects' ? 'bg-blue-700' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="my-subjects">
                        <i class="fas fa-book-open"></i>
                        <span>My Subjects</span>
                    </a>
                    <a href="#" onclick="switchPage('grades')" class="nav-link flex items-center space-x-2 ${currentPage === 'grades' ? 'bg-blue-700' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="grades">
                        <i class="fas fa-chart-bar"></i>
                        <span>Grades</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 hover:bg-blue-800 px-4 py-2 rounded-lg transition">
                        <i class="fas fa-envelope"></i>
                        <span>Messages</span>
                    </a>
                </nav>

                <!-- Right Icons -->
                <div class="flex items-center space-x-4">
                    <button class="hover:bg-blue-800 p-2 rounded-lg transition">
                        <i class="fas fa-calendar text-xl"></i>
                    </button>
                    <button class="hover:bg-blue-800 p-2 rounded-lg transition relative">
                        <i class="fas fa-envelope text-xl"></i>
                        <span class="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </button>
                    <button id="profileIcon" onclick="showUserProfile()" class="hover:bg-blue-800 p-2 rounded-lg transition">
                        <i class="fas fa-user-circle text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    `;

    const main = `
        <main class="container mx-auto px-4 py-8">
            <div id="dashboard-page" class="page-content ${currentPage === 'dashboard' ? '' : 'hidden'}">
                ${getDashboardContent()}
            </div>
            <div id="subjects-page" class="page-content ${currentPage === 'subjects' ? '' : 'hidden'}">
                ${getSubjectsContent()}
            </div>
            <div id="my-subjects-page" class="page-content ${currentPage === 'my-subjects' ? '' : 'hidden'}">
                ${getMySubjectsContent()}
            </div>
            <div id="grades-page" class="page-content ${currentPage === 'grades' ? '' : 'hidden'}">
                ${getGradesContent()}
            </div>
        </main>
    `;

    root.innerHTML = header + main;
}

// Switch page function
window.switchPage = function(page) {
    currentPage = page;
    render();
};

// Load student data
async function loadStudentData() {
    const user = getCurrentUser();
    if (!user || !user.id) {
        console.error('No user or user ID found');
        return;
    }

    // Load subjects
    const subjectsResult = await getSubjects();
    if (subjectsResult.success && subjectsResult.data) {
        subjectsData = subjectsResult.data;
    }

    // Load enrollments
    const enrollmentsResult = await getStudentEnrollments(user.id);
    if (enrollmentsResult.success && enrollmentsResult.data) {
        enrollmentsData = enrollmentsResult.data;
    }

    // Load grades
    const gradesResult = await getStudentGrades(user.id);
    if (gradesResult.success && gradesResult.data) {
        gradesData = gradesResult.data;
    }

    // Load completions
    const completionsResult = await getStudentCompletions(user.id);
    if (completionsResult.success && completionsResult.data) {
        completionsData = completionsResult.data;
    }

    // Re-render with new data
    render();
}

// Mark subject as complete
window.markSubjectComplete = async function(subjectId) {
    if (confirm('Are you sure you want to mark this subject as complete?')) {
        const user = getCurrentUser();
        if (!user || !user.id) {
            alert('User not found');
            return;
        }

        try {
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
                await loadStudentData();
            } else {
                alert('Failed to mark subject as completed');
            }
        } catch (error) {
            console.error('Error marking subject as completed:', error);
            alert('Failed to mark subject as completed');
        }
    }
};

// Profile management functions
function showUserProfile() {
    const user = getCurrentUser();
    if (!user) {
        alert('No user information available');
        return;
    }

    let modal = document.getElementById('userProfileModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'userProfileModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        document.body.appendChild(modal);
    }

    renderProfileView(user);
    modal.style.display = 'flex';
}

function closeUserProfile() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function renderProfileView(user) {
    const modal = document.getElementById('userProfileModal');
    
    let formattedDate = 'N/A';
    if (user.created_at) {
        const date = new Date(user.created_at);
        formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">User Profile</h2>
                <button onclick="closeUserProfile()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
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
            </div>
        </div>
    `;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        removeToken();
        window.location.href = 'index.html';
    }
}

function renderProfileEdit() {
    const user = getCurrentUser();
    
    let formattedDate = 'N/A';
    if (user.created_at) {
        const date = new Date(user.created_at);
        formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    const modal = document.getElementById('userProfileModal');
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button onclick="closeUserProfile()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
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
        </div>
    `;
}

function cancelEdit() {
    const user = getCurrentUser();
    renderProfileView(user);
}

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
            
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            alert('Profile updated successfully!');
            
            renderProfileView(updatedUser);
            render();
        } else {
            const error = await response.json();
            alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
    }
};

window.showUserProfile = showUserProfile;
window.closeUserProfile = closeUserProfile;
window.renderProfileEdit = renderProfileEdit;
window.cancelEdit = cancelEdit;
window.logout = logout;

// Initial render and data load
fetchCurrentUser();
render();
loadStudentData();
