function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

function addMeetingRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input placeholder="Firma Adı"></td>
    <td><input type="date"></td>
    <td>
      <select>
        <option>QDMS</option>
        <option>Ensemble</option>
        <option>BEAM</option>
        <option>Synergy</option>
        <option>eBAPlus</option>
      </select>
    </td>
    <td>
      <select>
        <option>Demo</option>
        <option>Discovery</option>
        <option>Meeting</option>
      </select>
    </td>
    <td>
      <select>
        <option>Gizem</option>
        <option>Selim</option>
      </select>
    </td>
    <td><button onclick="this.closest('tr').remove()">Sil</button></td>
  `;
  document.getElementById("meetings-table").appendChild(row);
}

function toggleView(view) {
  document.getElementById("kanban-view").style.display = view === "kanban" ? "flex" : "none";
  document.getElementById("list-view").style.display = view === "list" ? "table" : "none";
}

function addOpportunity() {
  const name = prompt("Fırsat Adı:");
  const offer = prompt("Teklif ($):");
  const product = prompt("İlgili Ürün:");
  if (!name || !offer || !product) return;

  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<strong>${name}</strong><br>$${offer}<br>${product}`;
  document.querySelector('[data-status=\"Teklif\"] .items').appendChild(div);
  updateStats();
}

function updateStats() {
  document.querySelectorAll(".column").forEach(col => {
    const items = col.querySelectorAll(".item");
    let total = 0;
    items.forEach(item => {
      const priceMatch = item.innerHTML.match(/\\$(\\d+)/);
      if (priceMatch) total += parseInt(priceMatch[1]);
    });
    col.querySelector(".count-value").innerText = `${items.length} fırsat | $${total}`;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.items').forEach(el => {
    new Sortable(el, {
      group: 'kanban',
      animation: 150,
      onEnd: updateStats
    });
  });

  switchTab('meetings');
  renderCharts();
});

function renderCharts() {
  new Chart(document.getElementById('opportunityChart'), {
    type: 'bar',
    data: {
      labels: ['Teklif', 'Revize', 'Forecast', 'Kazanıldı', 'Kaybedildi', 'Beklemede'],
      datasets: [{
        label: 'Fırsat Sayısı',
        data: [3, 2, 1, 4, 1, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    }
  });

  new Chart(document.getElementById('meetingChart'), {
    type: 'line',
    data: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan'],
      datasets: [{
        label: 'Toplantı Sayısı',
        data: [2, 5, 3, 4],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
      }]
    }
  });

  new Chart(document.getElementById('statusPie'), {
    type: 'pie',
    data: {
      labels: ['Kazanıldı', 'Kaybedildi', 'Beklemede'],
      datasets: [{
        label: 'Durum',
        data: [4, 1, 2],
        backgroundColor: ['#a3e4a3', '#f5b7b1', '#f9e79f']
      }]
    }
  });
}
