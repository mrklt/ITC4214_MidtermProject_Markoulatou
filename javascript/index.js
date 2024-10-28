function renderActivityLog() {
  const activityTable = $('.latest-activity .activity');
  const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];

  activityTable.empty();

  if (savedActivities.length === 0) {
      activityTable.html('<tr><td>No recent activity</td></tr>');
      return;
  }

  savedActivities.forEach(activity => {
      const row = `<tr><td>${activity}</td></tr>`;
      activityTable.append(row);
  });
}

$(document).ready(function() {
  renderActivityLog();
});
