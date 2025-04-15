function calculate() {
  const target = new Date(document.getElementById('targetTime').value);
  const firstSpike = new Date(document.getElementById('firstSpikeTime').value);
  const interval = parseInt(document.getElementById('interval').value);
  const targetViews = parseInt(document.getElementById('targetViews').value);

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = "";

  if (isNaN(target) || isNaN(firstSpike) || isNaN(interval) || interval <= 0 || isNaN(targetViews)) {
    outputDiv.innerHTML = "<p>Please fill all fields correctly.</p>";
    return;
  }

  const now = new Date();
  const timeLeftMs = target - now;
  const timeLeftMin = Math.floor(timeLeftMs / 60000);

  let spikeTimes = [];
  let currentSpike = new Date(firstSpike);

  while (currentSpike <= target) {
    if (currentSpike >= now) {
      spikeTimes.push(new Date(currentSpike));
    }
    currentSpike = new Date(currentSpike.getTime() + interval * 60000);
  }

  if (spikeTimes.length === 0) {
    outputDiv.innerHTML = "<p>No upcoming spikes found within the target time.</p>";
    return;
  }

  const viewsPerSpike = Math.floor(targetViews / spikeTimes.length);
  const remainder = targetViews % spikeTimes.length;

  outputDiv.innerHTML = `
    <h3>Time Left: ${timeLeftMin} minutes</h3>
    <h4>Upcoming Spike Times & Required Views:</h4>
    <ul>
      ${spikeTimes.map((t, i) => {
        const views = viewsPerSpike + (i === 0 ? remainder : 0); // Add remainder to first spike
        return `<li>${t.toLocaleString()} — <strong>${views} views</strong></li>`;
      }).join('')}
    </ul>
  `;
}
