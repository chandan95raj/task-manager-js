class API {
    static fetchTasks() {
      return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => data.map(task => ({
          id: task.id,
          title: task.title,
          description: 'API Generated Task',
          dueDate: '2024-12-31',
          priority: 'Medium',
          completed: task.completed
        })));
    }
  
    static getLocalTasks() {
      const localTasks = localStorage.getItem('tasks');
      return localTasks ? JSON.parse(localTasks) : [];
    }
  
    static saveToLocalStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  