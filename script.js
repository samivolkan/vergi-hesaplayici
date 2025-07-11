
let selectedVehicle = "binek";

function selectVehicle(type) {
  selectedVehicle = type;
  document.querySelectorAll(".btn-group button").forEach(btn => btn.classList.remove("active"));
  document.getElementById("btn" + type.charAt(0).toUpperCase() + type.slice(1)).classList.add("active");
  calculate();
}

function parseNumber(val) {
  return parseFloat(val.replaceAll(".", "").replace(",", "."));
}

function calculate() {
  const isZero = document.getElementById("isZero").checked;
  const isLeased = document.getElementById("isLeased").checked;
  const price = parseNumber(document.getElementById("totalPrice").value || "0");
  const cc = parseInt(document.getElementById("cc").value || "0");
  const age = parseInt(document.getElementById("age").value);
  const duration = parseInt(document.getElementById("duration").value || "0");
  const salePrice = parseNumber(document.getElementById("salePrice").value || "0");

  if (!price || !duration || !salePrice) {
    document.getElementById("summaryBox").innerHTML = "Lütfen tüm gerekli alanları doldurun.";
    return;
  }

  const netPrice = price / 1.2; // KDV dahilden net fiyat
  let otvRate = (selectedVehicle === "motor" && cc > 250) ? 0.37 : (selectedVehicle === "motor" ? 0.08 : 0.5);
  let otv = isZero ? netPrice * otvRate : 0;
  let amortization = (netPrice + otv) * (duration / 60);
  let mtv = 8000; // Basit ortalama (otomatik hesap gelecek)
  let expenseTotal = amortization + mtv + (isZero ? otv : 0);
  let taxAdvantage = expenseTotal * 0.25;
  let saleNet = salePrice / 1.2;
  let profit = saleNet - (netPrice + otv - amortization);
  let totalBenefit = profit + taxAdvantage;

  document.getElementById("summaryBox").innerHTML = `
    <strong>ÖTV:</strong> ${otv.toFixed(0)} TL<br>
    <strong>Amortisman:</strong> ${amortization.toFixed(0)} TL<br>
    <strong>MTV:</strong> ${mtv.toFixed(0)} TL<br>
    <strong>Vergi Avantajı:</strong> ${taxAdvantage.toFixed(0)} TL<br>
    <strong>Satış Kârı:</strong> ${profit.toFixed(0)} TL<br>
    <strong><u>Toplam Fayda:</u></strong> ${totalBenefit.toFixed(0)} TL
  `;

  renderChart([amortization, mtv, otv, taxAdvantage, profit]);
}

let chart;
function renderChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Amortisman', 'MTV', 'ÖTV', 'Vergi Avantajı', 'Kâr'],
      datasets: [{
        label: 'Tutar (TL)',
        data: data,
        backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b', '#36b9cc']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y.toLocaleString('tr-TR') + ' TL';
          }
        }}
      }
    }
  });
}
