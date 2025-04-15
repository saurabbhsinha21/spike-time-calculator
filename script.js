function calculate() {
  const target = new Date(document.getElementById('targetTime').value);
  const firstSpike = new Date(document.getElementById('firstSpikeTime').value);
  const interval = parseInt(document.getElementById('interval').value);

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = "";

  if (isNaN(target) || isNaN(firstSpike) || isNaN(interval) || interval <= 0) {
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

  outputDiv.innerHTML = `
    <h3>Time Left: ${timeLeftMin} minutes</h3>
    <h4>Upcoming Spike Times:</h4>
    <ul>
      ${spikeTimes.map(t => `<li>${t.toLocaleString()}</li>`).join('')}
    </ul>
  `;
}
