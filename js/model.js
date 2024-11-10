class Model {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    registerUser(username, password) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push({ username, password });
            this.saveUsers();
            return true;
        }
        return false;
    }

    loginUser(username, password) {
        const userExists = this.users.some(user => user.username === username && user.password === password);
        if (userExists) {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    logoutUser() {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
    }

    getTasks() {
        return this.tasks;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }
   
}
