/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
        font-family: 'Inter', sans-serif;
    }
    
    body {
        background: #f8fafc;
        min-height: 100vh;
    }
    
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #e2e8f0;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #2563eb;
    }
`;
document.head.appendChild(style);

import { getAdmin, adminLogout } from '../admin-login/index.js';
import { animatePageTransition, animateNavLinks, animateCardHover, animateButtons, animateModalShow, animateModalHide, animateProfileShow, animateProfileHide, refreshAnimations, animateTables, animateTableRowsDomino } from '../admin-animation.js';

const API_BASE = 'https://jhon-ladines-server-elec7.onrender.com/api';
const root = document.getElementById('root');

const admin = getAdmin();
if (!admin) {
    window.location.href = 'AdminLogin.html';
}

let currentPage = 'dashboard';

let studentsData = [];
let subjectsData = [];
let enrollmentsData = [];
let gradesData = [];

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();
const dateString = today.toLocaleDateString('en-US', options);

export async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE}/upload/image`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            return { success: true, url: data.url };
        }
        return { success: false, error: data.error || 'Upload failed' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getStudents() {
    try {
        const response = await fetch(`${API_BASE}/admin/students`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getSubjects() {
    try {
        const response = await fetch(`${API_BASE}/subjects`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function createSubject(subjectData) {
    try {
        const response = await fetch(`${API_BASE}/subjects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subjectCode: subjectData.subjectCode,
                subjectName: subjectData.subjectName,
                teacherName: subjectData.teacherName,
                description: subjectData.description,
                coverPhoto: subjectData.coverPhoto
            })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteSubject(subjectId) {
    try {
        const response = await fetch(`${API_BASE}/subjects/${subjectId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getGrades() {
    try {
        const response = await fetch(`${API_BASE}/grades`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getGradesByStudent(studentId) {
    try {
        const response = await fetch(`${API_BASE}/grades/student/${studentId}`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function createGrade(gradeData) {
    try {
        console.log('Creating grade with data:', gradeData);
        const response = await fetch(`${API_BASE}/grades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gradeData)
        });
        const data = await response.json();
        console.log('Grade creation response:', data);
        return { success: response.ok, data };
    } catch (error) {
        console.error('Grade creation error:', error);
        return { success: false, error: error.message };
    }
}

export async function updateGrade(gradeId, gradeData) {
    try {
        const response = await fetch(`${API_BASE}/grades/${gradeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gradeData)
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteGrade(gradeId) {
    try {
        const response = await fetch(`${API_BASE}/grades/${gradeId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getEnrollments() {
    try {
        const response = await fetch(`${API_BASE}/enrollments`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function enrollStudent(enrollmentData) {
    try {
        const response = await fetch(`${API_BASE}/enrollments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enrollmentData)
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function updateEnrollment(enrollmentId, status, subjectIds) {
    try {
        const updateData = {};
        if (status) updateData.status = status;
        if (subjectIds) updateData.subjectIds = subjectIds;

        const response = await fetch(`${API_BASE}/enrollments/${enrollmentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteEnrollment(enrollmentId) {
    try {
        const response = await fetch(`${API_BASE}/enrollments/${enrollmentId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getEnrollmentsByStudent(studentId) {
    try {
        const response = await fetch(`${API_BASE}/enrollments/student/${studentId}`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function getDashboardContent() {
    const name = admin.username || 'Admin';
    const hour = new Date().getHours();
    let timeGreeting = 'Good Morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    else if (hour >= 17) timeGreeting = 'Good Evening';

    const studentsCount = studentsData.length || 0;
    const subjectsCount = subjectsData.length || 0;
    const enrollmentsCount = enrollmentsData.length || 0;
    const gradesCount = gradesData.length || 0;

    return `
        <div class="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-8 text-white shadow-lg overflow-hidden">
            <div class="absolute inset-0 opacity-20" style="background-image: url('https://res.cloudinary.com/dbob1wota/image/upload/Overview1_ndbo7v.jpg'); background-size: cover; background-position: center;"></div>
            <div class="relative z-10">
                <h1 class="text-3xl font-bold mb-2" id="greeting">${timeGreeting}, ${name}!</h1>
                <p class="text-blue-100 mb-6" id="currentDate">${dateString}</p>
                <div class="flex space-x-4">
                    <button onclick="switchPage('students')" class="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center space-x-2">
                        <i class="fas fa-users"></i>
                        <span>Manage Students</span>
                    </button>
                    <button onclick="switchPage('subjects')" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center space-x-2">
                        <i class="fas fa-book"></i>
                        <span>Manage Subjects</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-blue-100 p-4 rounded-full">
                    <i class="fas fa-users text-blue-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statStudents">${studentsCount}</p>
                    <p class="text-gray-500 text-sm">STUDENTS</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-yellow-100 p-4 rounded-full">
                    <i class="fas fa-book text-yellow-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statSubjects">${subjectsCount}</p>
                    <p class="text-gray-500 text-sm">SUBJECTS</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-blue-100 p-4 rounded-full">
                    <i class="fas fa-clipboard-list text-blue-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statEnrollments">${enrollmentsCount}</p>
                    <p class="text-gray-500 text-sm">ENROLLMENTS</p>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4">
                <div class="bg-yellow-100 p-4 rounded-full">
                    <i class="fas fa-chart-bar text-yellow-600 text-2xl"></i>
                </div>
                <div>
                    <p class="text-3xl font-bold text-gray-800" id="statGrades">${gradesCount}</p>
                    <p class="text-gray-500 text-sm">GRADES</p>
                </div>
            </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-bolt text-yellow-500 mr-2"></i>
            Quick Access
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div onclick="switchPage('students')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-user-plus text-blue-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Add Student</h3>
                <p class="text-gray-500 text-sm">Register new students</p>
            </div>
            <div onclick="switchPage('subjects')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-plus-circle text-yellow-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Add Subject</h3>
                <p class="text-gray-500 text-sm">Create new subjects</p>
            </div>
            <div onclick="switchPage('enrollments')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-user-graduate text-blue-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Enroll Student</h3>
                <p class="text-gray-500 text-sm">Manage enrollments</p>
            </div>
            <div onclick="switchPage('grades')" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                <div class="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <i class="fas fa-edit text-yellow-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800">Add Grade</h3>
                <p class="text-gray-500 text-sm">Enter student grades</p>
            </div>
        </div>
    `;
}

function getStudentsContent() {
    if (studentsData.length === 0) {
        return `
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-users text-blue-500 mr-3"></i>
                Students
            </h1>
            <div class="bg-white rounded-xl shadow-md p-6">
                <p class="text-gray-500">Loading students...</p>
            </div>
        `;
    }

    return `
        <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-users text-blue-500 mr-3"></i>
            Students
        </h1>
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Username</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Age</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="studentsTableBody">
                        ${studentsData.map(student => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3 text-sm text-gray-600">${student.id}</td>
                                <td class="px-4 py-3 text-sm font-medium text-gray-800">${student.full_name}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${student.email}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${student.username}</td>
                                <td class="px-4 py-3 text-sm text-gray-600 capitalize">${student.gender}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${student.age}</td>
                                <td class="px-4 py-3 text-sm">
                                    <button onclick="viewStudentGrades('${student.id}', '${student.full_name}')" class="text-blue-600 hover:text-blue-800 font-medium mr-3">View Grades</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getSubjectsContent() {
    if (subjectsData.length === 0) {
        return `
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-book text-yellow-500 mr-3"></i>
                    Subjects
                </h1>
                <button onclick="openSubjectModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    + Add Subject
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6">
                <p class="text-gray-500">Loading subjects...</p>
            </div>
        `;
    }

    return `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                <i class="fas fa-book text-yellow-500 mr-3"></i>
                Subjects
            </h1>
            <button onclick="openSubjectModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Add Subject
            </button>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cover Photo</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject Code</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject Name</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Teacher</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="subjectsTableBody">
                        ${subjectsData.map(subject => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3 text-sm text-gray-600">${subject.id}</td>
                                <td class="px-4 py-3 text-sm">
                                    ${subject.cover_photo 
                                        ? `<img src="${subject.cover_photo}" alt="${subject.subject_name}" class="w-16 h-10 object-cover rounded">` 
                                        : '<span class="text-gray-400">No photo</span>'}
                                </td>
                                <td class="px-4 py-3 text-sm font-medium text-gray-800">${subject.subject_code}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${subject.subject_name}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${subject.teacher_name || '-'}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${subject.description || '-'}</td>
                                <td class="px-4 py-3 text-sm">
                                    <button onclick="deleteSubjectById('${subject.id}')" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getEnrollmentsContent() {
    if (enrollmentsData.length === 0) {
        return `
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-clipboard-list text-blue-500 mr-3"></i>
                    Student Enrollments
                </h1>
                <button onclick="openEnrollmentModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    + Enroll Student
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6">
                <p class="text-gray-500">Loading enrollments...</p>
            </div>
        `;
    }

    return `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                <i class="fas fa-clipboard-list text-blue-500 mr-3"></i>
                Student Enrollments
            </h1>
            <button onclick="openEnrollmentModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Enroll Student
            </button>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Student</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subjects</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Enrollment Date</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="enrollmentsTableBody">
                        ${enrollmentsData.map(enrollment => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3 text-sm text-gray-600">${enrollment.id}</td>
                                <td class="px-4 py-3 text-sm font-medium text-gray-800">${enrollment.students?.full_name || 'Unknown'}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">
                                    ${enrollment.subjects && enrollment.subjects.length > 0 
                                        ? enrollment.subjects.map(s => s.subject_name).join(', ') 
                                        : 'No subjects'}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-600">${enrollment.enrollment_date}</td>
                                <td class="px-4 py-3 text-sm">
                                    <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                        enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                                        enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        enrollment.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }">${enrollment.status}</span>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <button onclick="editEnrollment('${enrollment.id}')" class="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                                    <button onclick="updateEnrollmentStatus('${enrollment.id}', '${enrollment.status}')" class="text-blue-600 hover:text-blue-800 font-medium mr-3">Update Status</button>
                                    <button onclick="deleteEnrollmentById('${enrollment.id}')" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getGradesContent() {
    if (gradesData.length === 0) {
        return `
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-chart-bar text-yellow-500 mr-3"></i>
                    Grades
                </h1>
                <button onclick="openGradeModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    + Add Grade
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6">
                <p class="text-gray-500">No grades available</p>
            </div>
        `;
    }

    return `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                <i class="fas fa-chart-bar text-yellow-500 mr-3"></i>
                Grades
            </h1>
            <button onclick="openGradeModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Add Grade
            </button>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Student</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Grade</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Remarks</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="gradesTableBody">
                        ${gradesData.map(grade => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3 text-sm text-gray-600">${grade.id}</td>
                                <td class="px-4 py-3 text-sm font-medium text-gray-800">${grade.students?.full_name || 'Unknown'}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${grade.subjects?.subject_name || 'Unknown'}</td>
                                <td class="px-4 py-3 text-sm font-medium text-gray-800">${grade.grade}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${grade.remarks || '-'}</td>
                                <td class="px-4 py-3 text-sm">
                                    <button onclick="deleteGradeById('${grade.id}')" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function render() {
    const header = `
        <header class="bg-blue-900 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-graduation-cap text-yellow-400 text-2xl"></i>
                    <span class="font-bold text-lg">CRT COLLEGE LMS | SJ - Admin</span>
                </div>

                <nav class="hidden md:flex items-center space-x-6">
                    <a href="#" onclick="switchPage('dashboard')" class="nav-link flex items-center space-x-2 ${currentPage === 'dashboard' ? 'bg-yellow-400 text-blue-900' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="dashboard">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" onclick="switchPage('students')" class="nav-link flex items-center space-x-2 ${currentPage === 'students' ? 'bg-yellow-400 text-blue-900' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="students">
                        <i class="fas fa-users"></i>
                        <span>Students</span>
                    </a>
                    <a href="#" onclick="switchPage('subjects')" class="nav-link flex items-center space-x-2 ${currentPage === 'subjects' ? 'bg-yellow-400 text-blue-900' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="subjects">
                        <i class="fas fa-book"></i>
                        <span>Subjects</span>
                    </a>
                    <a href="#" onclick="switchPage('enrollments')" class="nav-link flex items-center space-x-2 ${currentPage === 'enrollments' ? 'bg-yellow-400 text-blue-900' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="enrollments">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Enrollments</span>
                    </a>
                    <a href="#" onclick="switchPage('grades')" class="nav-link flex items-center space-x-2 ${currentPage === 'grades' ? 'bg-yellow-400 text-blue-900' : 'hover:bg-blue-800'} px-4 py-2 rounded-lg transition" data-page="grades">
                        <i class="fas fa-chart-bar"></i>
                        <span>Grades</span>
                    </a>
                </nav>

                <div class="flex items-center space-x-4">
                    <button class="hover:bg-blue-800 p-2 rounded-lg transition">
                        <i class="fas fa-calendar text-xl"></i>
                    </button>
                    <button class="hover:bg-blue-800 p-2 rounded-lg transition relative">
                        <i class="fas fa-envelope text-xl"></i>
                        <span class="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
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
            <div id="students-page" class="page-content ${currentPage === 'students' ? '' : 'hidden'}">
                ${getStudentsContent()}
            </div>
            <div id="subjects-page" class="page-content ${currentPage === 'subjects' ? '' : 'hidden'}">
                ${getSubjectsContent()}
            </div>
            <div id="enrollments-page" class="page-content ${currentPage === 'enrollments' ? '' : 'hidden'}">
                ${getEnrollmentsContent()}
            </div>
            <div id="grades-page" class="page-content ${currentPage === 'grades' ? '' : 'hidden'}">
                ${getGradesContent()}
            </div>
        </main>
    `;

    const modals = `
        <div id="subjectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Add Subject</h3>
                <form id="subjectForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                        <input type="text" id="subjectCode" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., CS101">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                        <input type="text" id="subjectName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Introduction to Computer Science">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                        <input type="text" id="subjectTeacher" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Dr. John Smith">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea id="subjectDescription" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief description of the subject"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Cover Photo</label>
                        <input type="file" id="coverPhotoFile" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <input type="hidden" id="coverPhotoUrl">
                        <div id="coverPhotoPreview" class="mt-2 hidden">
                            <img id="coverPhotoImage" src="" alt="Cover photo preview" class="w-full h-32 object-cover rounded-lg">
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                            Add Subject
                        </button>
                        <button type="button" onclick="closeSubjectModal()" class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 py-2 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="gradeModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Add New Grade</h3>
                <form id="gradeForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Student</label>
                        <select id="gradeStudent" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Select a student</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select id="gradeSubject" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Select a subject</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Grade (0-100)</label>
                        <input type="number" id="gradeValue" min="0" max="100" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                        <textarea id="gradeRemarks" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                            Add Grade
                        </button>
                        <button type="button" onclick="closeGradeModal()" class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 py-2 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="enrollmentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Enroll Student in Subjects</h3>
                <form id="enrollmentForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Student</label>
                        <select id="enrollmentStudent" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Select a student</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Subjects (Select multiple)</label>
                        <div id="enrollmentSubjects" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-40 overflow-y-auto">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select id="enrollmentStatus" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                            Enroll Student
                        </button>
                        <button type="button" onclick="closeEnrollmentModal()" class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 py-2 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="studentGradesModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">Student Grades</h3>
                    <button onclick="closeStudentGradesModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div id="studentGradesContent">
                    <p class="text-gray-500">Loading grades...</p>
                </div>
            </div>
        </div>
    `;

    root.innerHTML = header + main + modals;
    
    setTimeout(() => {
        animateNavLinks();
        animateCardHover();
        animateButtons();
    }, 100);
}

window.switchPage = function(page) {
    currentPage = page;
    render();
    
    setTimeout(() => {
        const pageElement = document.querySelector('.page-content:not(.hidden)');
        if (pageElement) {
            animatePageTransition(pageElement);
        }
        
        refreshAnimations();
    }, 50);
    
    if (page === 'students') loadStudents();
    if (page === 'subjects') loadSubjects();
    if (page === 'enrollments') loadEnrollments();
    if (page === 'grades') loadGrades();
};

window.logout = function() {
    adminLogout();
    window.location.href = 'AdminLogin.html';
};

function showUserProfile() {
    if (!admin) {
        alert('No admin information available');
        return;
    }

    let modal = document.getElementById('userProfileModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'userProfileModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Admin Profile</h2>
                <button onclick="closeUserProfile()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="bg-blue-100 p-4 rounded-full">
                        <i class="fas fa-user-shield text-blue-600 text-2xl"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800 text-lg">${admin.username || 'N/A'}</p>
                        <p class="text-gray-500">Administrator</p>
                    </div>
                </div>
                <div class="border-t pt-4 space-y-2">
                    <p class="text-sm text-gray-500"><strong>Username:</strong> ${admin.username || 'N/A'}</p>
                    <p class="text-sm text-gray-500"><strong>Role:</strong> Administrator</p>
                </div>
                <button onclick="logout()" class="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateProfileShow(modalContent);
    }
}

function closeUserProfile() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        const modalContent = modal.querySelector('.bg-white');
        if (modalContent) {
            animateProfileHide(modalContent, () => {
                modal.style.display = 'none';
            });
        } else {
            modal.style.display = 'none';
        }
    }
}

window.showUserProfile = showUserProfile;
window.closeUserProfile = closeUserProfile;

window.openSubjectModal = function() {
    const modal = document.getElementById('subjectModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateModalShow(modalContent);
    }
};

window.closeSubjectModal = function() {
    const modal = document.getElementById('subjectModal');
    const modalContent = modal.querySelector('.bg-white');
    
    if (modalContent) {
        animateModalHide(modalContent, () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.getElementById('subjectForm').reset();
            document.getElementById('coverPhotoUrl').value = '';
            document.getElementById('coverPhotoPreview').classList.add('hidden');
        });
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('subjectForm').reset();
        document.getElementById('coverPhotoUrl').value = '';
        document.getElementById('coverPhotoPreview').classList.add('hidden');
    }
};

window.openGradeModal = async function() {
    const modal = document.getElementById('gradeModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateModalShow(modalContent);
    }
    
    const studentsResult = await getStudents();
    const subjectsResult = await getSubjects();
    
    const studentSelect = document.getElementById('gradeStudent');
    const subjectSelect = document.getElementById('gradeSubject');
    
    if (studentsResult.success && studentsResult.data) {
        studentSelect.innerHTML = '<option value="">Select a student</option>' + 
            studentsResult.data.map(s => `<option value="${s.id}">${s.full_name} (${s.username})</option>`).join('');
    }
    
    if (subjectsResult.success && subjectsResult.data) {
        subjectSelect.innerHTML = '<option value="">Select a subject</option>' + 
            subjectsResult.data.map(s => `<option value="${s.id}">${s.subject_name} (${s.subject_code})</option>`).join('');
    }
};

window.closeGradeModal = function() {
    const modal = document.getElementById('gradeModal');
    const modalContent = modal.querySelector('.bg-white');
    
    if (modalContent) {
        animateModalHide(modalContent, () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.getElementById('gradeForm').reset();
        });
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('gradeForm').reset();
    }
};

window.viewStudentGrades = async function(studentId, studentName) {
    const modal = document.getElementById('studentGradesModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateModalShow(modalContent);
    }
    
    const content = document.getElementById('studentGradesContent');
    content.innerHTML = '<p class="text-gray-500">Loading grades...</p>';
    
    const result = await getGradesByStudent(studentId);
    
    if (result.success && result.data && result.data.length > 0) {
        content.innerHTML = `
            <h4 class="font-semibold text-gray-800 mb-4">Grades for ${studentName}</h4>
            <table class="w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Grade</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    ${result.data.map(grade => `
                        <tr class="border-b">
                            <td class="px-4 py-3 text-sm text-gray-600">${grade.subjects?.subject_name || 'Unknown'}</td>
                            <td class="px-4 py-3 text-sm font-medium text-gray-800">${grade.grade}</td>
                            <td class="px-4 py-3 text-sm text-gray-600">${grade.remarks || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else {
        content.innerHTML = `<p class="text-gray-500">No grades found for ${studentName}</p>`;
    }
};

window.closeStudentGradesModal = function() {
    const modal = document.getElementById('studentGradesModal');
    const modalContent = modal.querySelector('.bg-white');
    
    if (modalContent) {
        animateModalHide(modalContent, () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.openEnrollmentModal = async function() {
    const modal = document.getElementById('enrollmentModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateModalShow(modalContent);
    }
    
    const studentsResult = await getStudents();
    const subjectsResult = await getSubjects();
    
    const studentSelect = document.getElementById('enrollmentStudent');
    const subjectsContainer = document.getElementById('enrollmentSubjects');
    
    if (studentsResult.success && studentsResult.data) {
        studentSelect.innerHTML = '<option value="">Select a student</option>' + 
            studentsResult.data.map(s => `<option value="${s.id}">${s.full_name} (${s.username})</option>`).join('');
    }
    
    if (subjectsResult.success && subjectsResult.data) {
        subjectsContainer.innerHTML = subjectsResult.data.map(s => `
            <label class="flex items-center py-1 cursor-pointer">
                <input type="checkbox" value="${s.id}" class="enrollment-subject-checkbox w-4 h-4 text-blue-600 focus:ring-blue-500 mr-2">
                <span class="text-sm text-gray-700">${s.subject_name} (${s.subject_code})</span>
            </label>
        `).join('');
    }
};

window.closeEnrollmentModal = function() {
    const modal = document.getElementById('enrollmentModal');
    const modalContent = modal.querySelector('.bg-white');
    
    if (modalContent) {
        animateModalHide(modalContent, () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.getElementById('enrollmentForm').reset();
        });
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('enrollmentForm').reset();
    }
};

window.editEnrollment = async function(enrollmentId) {
    const enrollment = enrollmentsData.find(e => e.id === enrollmentId);
    
    if (!enrollment) {
        alert('Enrollment not found');
        return;
    }

    const modal = document.getElementById('enrollmentModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        animateModalShow(modalContent);
    }
    
    const studentsResult = await getStudents();
    const subjectsResult = await getSubjects();
    
    const studentSelect = document.getElementById('enrollmentStudent');
    const subjectsContainer = document.getElementById('enrollmentSubjects');
    const statusSelect = document.getElementById('enrollmentStatus');
    
    if (studentsResult.success && studentsResult.data) {
        studentSelect.innerHTML = '<option value="">Select a student</option>' + 
            studentsResult.data.map(s => `<option value="${s.id}">${s.full_name} (${s.username})</option>`).join('');
        studentSelect.value = enrollment.student_id;
        studentSelect.disabled = true;
    }
    
    if (subjectsResult.success && subjectsResult.data) {
        const enrolledSubjectIds = enrollment.subject_ids || [];
        subjectsContainer.innerHTML = subjectsResult.data.map(s => `
            <label class="flex items-center py-1 cursor-pointer">
                <input type="checkbox" value="${s.id}" class="enrollment-subject-checkbox w-4 h-4 text-blue-600 focus:ring-blue-500 mr-2" ${enrolledSubjectIds.includes(s.id) ? 'checked' : ''}>
                <span class="text-sm text-gray-700">${s.subject_name} (${s.subject_code})</span>
            </label>
        `).join('');
    }
    
    statusSelect.value = enrollment.status;
    document.getElementById('enrollmentForm').dataset.editingId = enrollmentId;
};

window.deleteSubjectById = async function(subjectId) {
    if (confirm('Are you sure you want to delete this subject?')) {
        const result = await deleteSubject(subjectId);
        if (result.success) {
            alert('Subject deleted successfully');
            loadSubjects();
            loadDashboardData();
        } else {
            alert('Failed to delete subject');
        }
    }
};

window.deleteGradeById = async function(gradeId) {
    if (confirm('Are you sure you want to delete this grade?')) {
        const result = await deleteGrade(gradeId);
        if (result.success) {
            alert('Grade deleted successfully');
            loadGrades();
            loadDashboardData();
        } else {
            alert('Failed to delete grade');
        }
    }
};

window.updateEnrollmentStatus = async function(enrollmentId, currentStatus) {
    const statuses = ['active', 'inactive', 'completed', 'dropped'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];

    const result = await updateEnrollment(enrollmentId, newStatus);
    if (result.success) {
        loadEnrollments();
    } else {
        alert('Failed to update enrollment status');
    }
};

window.deleteEnrollmentById = async function(enrollmentId) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
        const result = await deleteEnrollment(enrollmentId);
        if (result.success) {
            alert('Enrollment deleted successfully');
            loadEnrollments();
            loadDashboardData();
        } else {
            alert('Failed to delete enrollment');
        }
    }
};

async function loadDashboardData() {
    const studentsResult = await getStudents();
    if (studentsResult.success && studentsResult.data) {
        studentsData = studentsResult.data;
    }

    const subjectsResult = await getSubjects();
    if (subjectsResult.success && subjectsResult.data) {
        subjectsData = subjectsResult.data;
    }

    const enrollmentsResult = await getEnrollments();
    if (enrollmentsResult.success && enrollmentsResult.data) {
        enrollmentsData = enrollmentsResult.data;
    }

    const gradesResult = await getGrades();
    if (gradesResult.success) {
        gradesData = gradesResult.data || [];
    }

    render();
    
    setTimeout(() => {
        refreshAnimations();
    }, 100);
}

async function loadStudents() {
    const result = await getStudents();
    if (result.success && result.data) {
        studentsData = result.data;
        render();
        setTimeout(() => {
            animateTables();
            animateTableRowsDomino();
            refreshAnimations();
        }, 100);
    }
}

async function loadSubjects() {
    const result = await getSubjects();
    if (result.success && result.data) {
        subjectsData = result.data;
        render();
        setTimeout(() => {
            animateTables();
            animateTableRowsDomino();
            refreshAnimations();
        }, 100);
    }
}

async function loadEnrollments() {
    const result = await getEnrollments();
    if (result.success && result.data) {
        enrollmentsData = result.data;
        render();
        setTimeout(() => {
            animateTables();
            animateTableRowsDomino();
            refreshAnimations();
        }, 100);
    }
}

async function loadGrades() {
    const result = await getGrades();
    if (result.success) {
        gradesData = result.data || [];
        render();
        setTimeout(() => {
            animateTables();
            animateTableRowsDomino();
            refreshAnimations();
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('change', function(e) {
        if (e.target.id === 'coverPhotoFile') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('coverPhotoImage').src = e.target.result;
                    document.getElementById('coverPhotoPreview').classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                document.getElementById('coverPhotoPreview').classList.add('hidden');
            }
        }
    });

    document.addEventListener('submit', async function(e) {
        if (e.target.id === 'subjectForm') {
            e.preventDefault();
            
            const fileInput = document.getElementById('coverPhotoFile');
            let coverPhotoUrl = '';
            
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadResult = await uploadImageToCloudinary(file);
                
                if (!uploadResult.success) {
                    alert('Failed to upload image: ' + uploadResult.error);
                    return;
                }
                coverPhotoUrl = uploadResult.url;
            }
            
            const subjectData = {
                subjectCode: document.getElementById('subjectCode').value,
                subjectName: document.getElementById('subjectName').value,
                teacherName: document.getElementById('subjectTeacher').value,
                description: document.getElementById('subjectDescription').value,
                coverPhoto: coverPhotoUrl
            };
            
            const result = await createSubject(subjectData);
            
            if (result.success) {
                alert('Subject created successfully');
                closeSubjectModal();
                loadSubjects();
                loadDashboardData();
            } else {
                alert('Failed to create subject: ' + (result.error || 'Unknown error'));
            }
        }
        
        if (e.target.id === 'gradeForm') {
            e.preventDefault();
            const gradeData = {
                studentId: document.getElementById('gradeStudent').value,
                subjectId: document.getElementById('gradeSubject').value,
                grade: parseFloat(document.getElementById('gradeValue').value),
                remarks: document.getElementById('gradeRemarks').value
            };
            
            const result = await createGrade(gradeData);
            if (result.success) {
                alert('Grade created successfully');
                closeGradeModal();
                loadGrades();
                loadDashboardData();
            } else {
                alert('Failed to create grade: ' + result.error);
            }
        }
        
        if (e.target.id === 'enrollmentForm') {
            e.preventDefault();
            
            const selectedSubjects = Array.from(document.querySelectorAll('.enrollment-subject-checkbox:checked'))
                .map(checkbox => checkbox.value);
            
            if (selectedSubjects.length === 0) {
                alert('Please select at least one subject');
                return;
            }

            const enrollmentData = {
                studentId: document.getElementById('enrollmentStudent').value,
                subjectIds: selectedSubjects,
                status: document.getElementById('enrollmentStatus').value
            };
            
            const editingId = document.getElementById('enrollmentForm').dataset.editingId;
            
            let result;
            if (editingId) {
                result = await updateEnrollment(editingId, enrollmentData.status, enrollmentData.subjectIds);
                delete document.getElementById('enrollmentForm').dataset.editingId;
            } else {
                result = await enrollStudent(enrollmentData);
            }
            
            if (result.success) {
                alert(editingId ? 'Enrollment updated successfully' : 'Student enrolled successfully');
                closeEnrollmentModal();
                document.getElementById('enrollmentStudent').disabled = false;
                loadEnrollments();
                loadDashboardData();
            } else {
                alert(editingId ? 'Failed to update enrollment: ' : 'Failed to enroll student: ' + result.error);
            }
        }
    });
});

loadDashboardData();
