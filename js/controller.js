class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        if (this.model.isLoggedIn) {
            this.view.showTaskManager();
            this.loadTasks();
        }

        document.getElementById('register-btn').addEventListener('click', () => this.register());
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('add-task-btn').addEventListener('click', () => this.addTask());
        document.getElementById('show-login-btn').addEventListener('click', () => this.view.showLogin());
        this.view.taskList.addEventListener('click', (e) => this.deleteTask(e));
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
    }

    async loadTasks() {
        const localTasks = API.getLocalTasks();     
        const apiTasks = await API.fetchTasks();    
        const allTasks = [...localTasks, ...apiTasks];    
        API.saveToLocalStorage(allTasks);    
        this.view.displayTasks(allTasks); 
    }
    

    register() {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        if (password.length >= 8 && this.model.registerUser(username, password)) {
            alert('Registration successful');
            this.view.showLogin();
        } else {
            alert('Username already exists or password is weak');
        }
    }

    login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        if (this.model.loginUser(username, password)) {
            this.view.showTaskManager();
            this.loadTasks();
        } else {
            alert('Invalid login credentials');
        }
    }

    logout() {
        this.model.logoutUser(); 
        this.view.showAuthSection(); 
        alert('You have logged out successfully');
    }

    addTask() {
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;
        if (title && description && dueDate && new Date(dueDate) > new Date()) {
            const task = {
                id: Date.now(),
                title,
                description,
                dueDate,
                priority,
            };
            this.model.addTask(task);
            this.view.displayTasks(this.model.getTasks());
        } else {
            alert('Please provide valid task details');
        }
    }

    deleteTask(e) {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = Number(e.target.getAttribute('data-id'));
            this.model.deleteTask(taskId);
            this.view.displayTasks(this.model.getTasks());
        }
    }
}
