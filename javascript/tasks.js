$(document).ready(function() {
  let tasks = [];
  loadTasksFromLocalStorage();
  renderTasks();

  $('#add-task').on('click', function(event) {
      event.preventDefault(); 
      addTask();
  });

  $('#filter-tasks').on('change', filterTasks);
  $('#sort-tasks').on('change', sortTasks);

  function generateTaskRow(task, index) {
      return `
        <tr>
          <td>${task.name}</td>
          <td>${task.description}</td>
          <td>${task.dueDate}</td>
          <td>${task.status}</td>
          <td>
            <button class="complete-btn" data-index="${index}" style="display: inline;">Complete</button>
            <button class="edit-btn" data-index="${index}" style="display: inline;">Edit</button>
            <button class="delete-btn" data-index="${index}" style="display: inline;">Delete</button>
          </td>
        </tr>
      `;
  }

  function renderTasks() {
      const taskTableBody = $('.taskstb tbody');
      let taskRows = tasks.map((task, index) => generateTaskRow(task, index)).join('');
      taskTableBody.html(taskRows);
      
      attachButtonListeners();
  }

  function attachButtonListeners() {
      $('.complete-btn').off('click').on('click', function() {
          const index = $(this).data('index');
          markTaskAsComplete(index);
      });
      $('.edit-btn').off('click').on('click', function() {
          const index = $(this).data('index');
          editTask(index);
      });
      $('.delete-btn').off('click').on('click', function() {
          const index = $(this).data('index');
          deleteTask(index);
      });
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
      const taskName = $('#task-name').val();
      const taskDesc = $('#task-desc').val();
      const taskDate = $('#task-date').val();
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
  function clearForm() {
      $('#task-name').val('');
      $('#task-desc').val('');
      $('#task-date').val('');
  }

  function markTaskAsComplete(index) {
      const taskName = tasks[index].name;
      tasks[index].status = 'Completed';
      renderTasks();
      saveTasksToLocalStorage(); 
      logActivity('completed', taskName); 
  }

  function editTask(index) {
      const task = tasks[index];
      $('#task-name').val(task.name);
      $('#task-desc').val(task.description);
      $('#task-date').val(task.dueDate);
      
      tasks.splice(index, 1);
      saveTasksToLocalStorage(); 
  }

  function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
      saveTasksToLocalStorage(); 
  }

  function filterTasks() {
      const filterValue = $('#filter-tasks').val();
      const filteredTasks = tasks.filter(task => {
          if (filterValue === 'all') {
              return true;
          }
          return task.status.toLowerCase() === filterValue;
      });
      renderFilteredTasks(filteredTasks);
  }

  function renderFilteredTasks(filteredTasks) {
      const taskTableBody = $('.taskstb tbody');
      let taskRows = filteredTasks.map((task, index) => generateTaskRow(task, index)).join('');
      taskTableBody.html(taskRows);
      attachButtonListeners();
  }

  function sortTasks() {
      const sortValue = $('#sort-tasks').val();
      
      if (sortValue === 'name') {
          tasks.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortValue === 'date') {
          tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      }
      
      renderTasks();
      saveTasksToLocalStorage(); 
  }

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
});
