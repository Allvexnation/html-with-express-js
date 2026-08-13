const API_BASE_URL = 'https://jhon-ladines-server-elec7.onrender.com/api/auth';

export async function registerUser(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        if (data.token) {
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

export function isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
}

export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function getToken() {
    return localStorage.getItem('jwt_token');
}
