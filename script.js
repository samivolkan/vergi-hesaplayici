
let selectedVehicle = "binek";

function selectVehicle(type) {
  selectedVehicle = type;
  document.querySelectorAll(".btn-group button").forEach(btn => btn.classList.remove("active"));
  document.getElementById("btn" + type.charAt(0).toUpperCase() + type.slice(1)).classList.add("active");
  calculate();
}

function parseNumber(val) {
  if (!val) return 0;
  val = val.replaceAll(".", "").replace(",", ".");
  return parseFloat(val);
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
  if (vehicle === "ticari") return 0.01;
  return 0.0;
}

function getMtv(cc, age, value) {
  if (cc <= 1300 && value <= 260000 && age === 1) return 4834;
  if (cc <= 1600 && value <= 260000 && age === 1) return 8421;
  if (cc <= 1800 && value <= 651900 && age === 1) return 13956;
  if (cc <= 2000 && value <= 651900 && age === 1) return 25792;
  return 10000;
}

function calculate() {
  const isLeased = document.getElementById("isLeased").checked;
  const priceInput = parseNumber(document.getElementById("totalPrice").value);
  const cc = parseInt(document.getElementById("cc").value);
  const age = parseInt(document.getElementById("age").value);
  const isZero = age === 0; // Yaş 0 ise sıfır kabul et
  const duration = parseInt(document.getElementById("duration").value);
  const saleInput = parseNumber(document.getElementById("salePrice").value);

  if (!priceInput || !duration || !saleInput) {
    document.getElementById("summaryBox").innerHTML = "Lütfen tüm alanları doldurun.";
    return;
  }

  const netPrice = priceInput / 1.2;
  const otvRate = getOtvRate(cc, selectedVehicle, netPrice);
  const otv = isZero ? netPrice * otvRate : 0;
  const amortBase = (selectedVehicle === "binek" && netPrice > 1500000) ? 1500000 : netPrice + otv;
  const amort = isLeased ? 0 : amortBase * (duration / 60);
  const mtv = getMtv(cc, age, netPrice);
  const expenses = amort + mtv + otv;
  const vergiAvantaji = expenses * 0.25;
  const saleNet = saleInput / 1.2;
  const kar = isLeased ? 0 : saleNet - (netPrice + otv - amort);
  const toplamFayda = kar + vergiAvantaji;

  let yorum = "";
  if (selectedVehicle === "motor") yorum = "Motor düşük ÖTV nedeniyle avantajlı olabilir.";
  else if (selectedVehicle === "ticari") yorum = "Ticari araçta ÖTV + KDV tamamı gider olabilir.";
  else if (!isZero) yorum = "2. el binek araçta ÖTV ve KDV gider yazılamaz.";
  else yorum = "Sıfır binek araçta ÖTV ve KDV sınırlı şekilde gider olabilir.";

  document.getElementById("summaryBox").innerHTML = `
    <strong>ÖTV:</strong> ${otv.toLocaleString("tr-TR")} TL<br>
    <strong>Amortisman:</strong> ${amort.toLocaleString("tr-TR")} TL<br>
    <strong>MTV:</strong> ${mtv.toLocaleString("tr-TR")} TL<br>
    <strong>Vergi Avantajı:</strong> ${vergiAvantaji.toLocaleString("tr-TR")} TL<br>
    <strong>Satış Kârı:</strong> ${kar.toLocaleString("tr-TR")} TL<br>
    <strong><u>Toplam Fayda:</u></strong> ${toplamFayda.toLocaleString("tr-TR")} TL<br><br>
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
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toLocaleString('tr-TR') + ' TL';
            }
          }
        }
      }
    }
  });
}
