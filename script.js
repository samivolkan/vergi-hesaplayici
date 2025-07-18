
let selectedMonths = 6;
let selectedEngine = 1600;

function selectPeriod(months) {
  selectedMonths = months;
}
function selectEngine(cc) {
  selectedEngine = cc;
}

function parseCurrency(input) {
  return parseFloat(input.replace(/\./g, "").replace(",", "."));
}

function calculate() {
  const priceInput = document.getElementById("purchasePrice").value;
  const purchasePrice = parseCurrency(priceInput);
  if (!purchasePrice || purchasePrice <= 0) {
    alert("Geçerli bir alış bedeli girin.");
    return;
  }

  const amortization = (purchasePrice * 0.9) / (selectedMonths / 12);
  const expense = purchasePrice * 0.3;
  const taxAdvantage = (amortization + expense) * 0.22;

  document.getElementById("output").innerHTML = `
    <p><strong>Hızlandırılmış Amortisman:</strong> ₺${amortization.toLocaleString("tr-TR")}</p>
    <p><strong>Yıllık Gider:</strong> ₺${expense.toLocaleString("tr-TR")}</p>
    <p><strong>Vergi Avantajı:</strong> ₺${taxAdvantage.toLocaleString("tr-TR")}</p>
  `;

  drawChart(amortization, expense, taxAdvantage);
}

function drawChart(amortization, expense, taxAdvantage) {
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Amortisman', 'Gider', 'Vergi Avantajı'],
      datasets: [{
        label: '₺',
        data: [amortization, expense, taxAdvantage],
        backgroundColor: ['#007bff', '#28a745', '#ffc107']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
