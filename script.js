
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

function getOtvRate(cc, vehicle, price) {
  if (vehicle === "motor") return cc > 250 ? 0.37 : 0.08;
  if (vehicle === "binek") {
    if (cc <= 1600) {
      if (price <= 184000) return 0.45;
      if (price <= 220000) return 0.50;
      if (price <= 250000) return 0.60;
      if (price <= 280000) return 0.70;
      return 0.80;
    }
    if (cc <= 2000) return price <= 170000 ? 0.130 : 0.150;
    return 0.22;
  }
  if (vehicle === "ticari") return 0.01; // Otobüs varsayımı
  return 0.0;
}

function getMtv(cc, age, value) {
  // Kısıtlı örnek tablosu
  if (cc <= 1300 && value <= 260000 && age == 1) return 4834;
  if (cc <= 1600 && value <= 260000 && age == 1) return 8421;
  if (cc <= 1800 && value <= 651900 && age == 1) return 13956;
  if (cc <= 2000 && value <= 651900 && age == 1) return 25792;
  return 10000;
}

function calculate() {
  const isZero = document.getElementById("isZero").checked;
  const isLeased = document.getElementById("isLeased").checked;
  const priceInput = parseNumber(document.getElementById("totalPrice").value || "0");
  const cc = parseInt(document.getElementById("cc").value || "0");
  const age = parseInt(document.getElementById("age").value);
  const duration = parseInt(document.getElementById("duration").value || "0");
  const saleInput = parseNumber(document.getElementById("salePrice").value || "0");

  if (!priceInput || !duration || !saleInput) {
    document.getElementById("summaryBox").innerHTML = "Lütfen tüm alanları doldurun.";
    return;
  }

  const netPrice = priceInput / 1.2;
  const otvRate = getOtvRate(cc, selectedVehicle, netPrice);
  const otv = isZero ? netPrice * otvRate : 0;
  const amortBase = netPrice + (selectedVehicle === "binek" && netPrice > 1500000 ? 1500000 : otv);
  const amort = isLeased ? 0 : amortBase * (duration / 60);
  const mtv = getMtv(cc, age, netPrice);
  const exp = amort + mtv + (isZero ? otv : 0);
  const vergiAvantaji = exp * 0.25;
  const saleNet = saleInput / 1.2;
  const kar = isLeased ? 0 : saleNet - (netPrice + otv - amort);
  const fayda = vergiAvantaji + kar;

  let yorum = "";
  if (selectedVehicle === "motor") yorum = "Motorlar düşük ÖTV ile avantajlı olabilir.";
  else if (selectedVehicle === "ticari") yorum = "Ticari araçlarda ÖTV + KDV tamamı gider yazılır, avantajlı.";
  else if (!isZero) yorum = "2. el binek araçlarda ÖTV ve KDV gider yazılamaz.";
  else yorum = "Sıfır binek araçta ÖTV ve KDV sınırlı da olsa gider yazılabilir.";

  document.getElementById("summaryBox").innerHTML = `
    <strong>ÖTV:</strong> ${otv.toFixed(0)} TL<br>
    <strong>Amortisman:</strong> ${amort.toFixed(0)} TL<br>
    <strong>MTV:</strong> ${mtv.toFixed(0)} TL<br>
    <strong>Vergi Avantajı:</strong> ${vergiAvantaji.toFixed(0)} TL<br>
    <strong>Satış Kârı:</strong> ${kar.toFixed(0)} TL<br>
    <strong><u>Toplam Fayda:</u></strong> ${fayda.toFixed(0)} TL<br><br>
    <em>${yorum}</em>
  `;

  renderChart([amort, mtv, otv, vergiAvantaji, kar]);
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
