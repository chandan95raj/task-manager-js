class View {
    constructor() {
        this.authSection = document.getElementById('auth-section');
        this.taskManager = document.getElementById('task-manager');
        this.taskList = document.getElementById('task-list');
    }

    showLogin() {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    }

    showRegister() {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
    }

    displayTasks(tasks) {
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('col-md-6', 'col-lg-4', 'mb-4'); 
    
            taskItem.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                        <p class="card-text"><small class="text-muted">Priority: ${task.priority}</small></p>
                    </div>
                    <div class="card-footer text-end">
                        <button data-id="${task.id}" class="btn btn-danger delete-btn">Delete</button>
                    </div>
                </div>
            `;
    
            this.taskList.prepend(taskItem);
        });
    }
    
    
    showTaskManager() {
        this.authSection.style.display = 'none';
        this.taskManager.style.display = 'block';
    }

    showAuthSection() {
        this.authSection.style.display = 'block';
        this.taskManager.style.display = 'none';
    }
}
