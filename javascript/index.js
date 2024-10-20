
function renderActivityLog() {
    const activityTable = document.querySelector('.latest-activity .activity');
    const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
  

    activityTable.innerHTML = '';
  

    if (savedActivities.length === 0) {
      activityTable.innerHTML = '<tr><td>No recent activity</td></tr>';
      return;
    }
  

    savedActivities.forEach(activity => {
      const row = `
        <tr>
          <td>${activity}</td>
        </tr>
      `;
      activityTable.innerHTML += row;
    });
  }

  window.onload = function () {
    renderActivityLog();
  };
  