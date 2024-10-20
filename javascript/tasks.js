
function generateTaskRow(task, index) {
    return `
      <tr>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.dueDate}</td>
        <td>${task.status}</td>
        <td>
          <button class="complete-btn" onclick="markTaskAsComplete(${index})">Complete</button>
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </td>
      </tr>
    `;
}
  
  function renderTasks() {
    const taskTable = document.querySelector('.taskstb');
    let taskRows = tasks.map((task, index) => generateTaskRow(task, index)).join('');
    taskTable.innerHTML = `
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      ${taskRows}
    `;
  }
  
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  }
  function addTask() {
    const taskName = document.querySelector('#task-name').value;
    const taskDesc = document.querySelector('#task-desc').value;
    const taskDate = document.querySelector('#task-date').value;
  
    if (taskName && taskDesc && taskDate) {
      const newTask = {
        name: taskName,
        description: taskDesc,
        dueDate: taskDate,
        status: 'Pending'
      };
      tasks.push(newTask);
      renderTasks();
      saveTasksToLocalStorage();
      clearForm();
    } else {
      alert('Please fill out all fields.');
    }
  }
  
  function clearForm() {
    document.querySelector('#task-name').value = '';
    document.querySelector('#task-desc').value = '';
    document.querySelector('#task-date').value = '';
  }
  
  function markTaskAsComplete(index) {
    tasks[index].status = 'Completed';
    renderTasks();
    saveTasksToLocalStorage(); 
  }
  

  function editTask(index) {
    const task = tasks[index];
    document.querySelector('#task-name').value = task.name;
    document.querySelector('#task-desc').value = task.description;
    document.querySelector('#task-date').value = task.dueDate;
    
    tasks.splice(index, 1);
    saveTasksToLocalStorage(); 
  }
  

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasksToLocalStorage(); 
  }
  

  function filterTasks() {
    const filterValue = document.querySelector('#filter-tasks').value;
    const filteredTasks = tasks.filter(task => {
      if (filterValue === 'all') {
        return true;
      }
      return task.status.toLowerCase() === filterValue;
    });
    const taskTable = document.querySelector('.taskstb');
    taskTable.innerHTML = `
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      ${filteredTasks.map((task, index) => generateTaskRow(task, index)).join('')}
    `;
  }
  

  function sortTasks() {
    const sortValue = document.querySelector('#sort-tasks').value;
    
    if (sortValue === 'name') {
      tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'date') {
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    
    renderTasks();
    saveTasksToLocalStorage(); 
  }
  

  document.querySelector('#add-task').addEventListener('click', function(event) {
    event.preventDefault(); 
    addTask();
  });
  
  document.querySelector('#filter-tasks').addEventListener('change', filterTasks);
  document.querySelector('#sort-tasks').addEventListener('change', sortTasks);
  
  let tasks = [];
  loadTasksFromLocalStorage();
  renderTasks();

function logActivity(action, taskName) {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  const timestamp = new Date().toLocaleString();
  const newActivity = `Task "${taskName}" ${action} on ${timestamp}`;
  

  if (activities.length >= 5) {
    activities.shift(); 
  }
  activities.push(newActivity);
  localStorage.setItem('activities', JSON.stringify(activities));
}


function addTask() {
  const taskName = document.querySelector('#task-name').value;
  const taskDesc = document.querySelector('#task-desc').value;
  const taskDate = document.querySelector('#task-date').value;

  if (taskName && taskDesc && taskDate) {
    const newTask = {
      name: taskName,
      description: taskDesc,
      dueDate: taskDate,
      status: 'Pending'
    };
    tasks.push(newTask);
    renderTasks();
    saveTasksToLocalStorage();
    logActivity('added', taskName); 
    clearForm();
  } else {
    alert('Please fill out all fields.');
  }
}


function markTaskAsComplete(index) {
  const taskName = tasks[index].name;
  tasks[index].status = 'Completed';
  renderTasks();
  saveTasksToLocalStorage(); 
  logActivity('completed', taskName); 
}


