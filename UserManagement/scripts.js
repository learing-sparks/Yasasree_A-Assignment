window.onload = function() {
    displayUsers();
};
function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
function displayUsers() {
    const users = getUsersFromLocalStorage();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${user.name} | ${user.email} | ${user.phone} 
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                        <button onclick="editUser('${user.id}')">Edit</button>`;
        userList.appendChild(li);
    });
}

document.getElementById('userForm').onsubmit = function(event) {
    event.preventDefault();

    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const users = getUsersFromLocalStorage();

    if (id) {
        const userIndex = users.findIndex(user => user.id === id);
        users[userIndex] = { id, name, email, phone };
    } else {
        const newUser = {
            id: Date.now().toString(), 
            name,
            email,
            phone
        };
        users.push(newUser);
    }

    saveUsersToLocalStorage(users);
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    displayUsers();
};

function deleteUser(id) {
    let users = getUsersFromLocalStorage();
    users = users.filter(user => user.id !== id);
    saveUsersToLocalStorage(users);
    displayUsers();
}

function editUser(id) {
    const users = getUsersFromLocalStorage();
    const user = users.find(user => user.id === id);

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('userId').value = user.id;
}
