async function loadUsers() {
    const response = await fetch('https://jhon-ladines-backend-elec7.onrender.com/api/auth/users');
    const users = await response.json();

    const tbody = document.getElementById('usersBody');

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

loadUsers();
