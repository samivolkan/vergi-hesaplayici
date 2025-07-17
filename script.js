
function parseNumber(val) {
  return Number(val.replace(/,/g, '')) || 0;
}

function formatNumber(val) {
  return val.toLocaleString('tr-TR');
}

function calculate() {
  const purchasePrice = parseNumber(document.getElementById("purchasePrice").value);
  const engineSize = Number(document.getElementById("engineSize").value);
  const monthsHeld = Number(document.getElementById("monthsHeld").value);

  let otvRate = 0;
  let kdvRate = 0.20;

  // ÖTV oranı motor hacmine göre
  if (engineSize <= 1300) otvRate = 0.45;
  else if (engineSize <= 1600) otvRate = 0.60;
  else if (engineSize <= 1800) otvRate = 0.80;
  else if (engineSize <= 2000) otvRate = 1.30;
  else if (engineSize <= 2500) otvRate = 1.50;
  else if (engineSize <= 3000) otvRate = 2.20;
  else if (engineSize <= 4000) otvRate = 2.20;
  else otvRate = 2.20;

  // Vergisiz fiyat = X
  // X + (X*otv) + ((X + X*otv)*kdv) = alış fiyatı
  // => X * (1 + otvRate) * (1 + kdvRate) = alış fiyatı
  const basePrice = purchasePrice / ((1 + otvRate) * (1 + kdvRate));
  const otvAmount = basePrice * otvRate;
  const kdvAmount = (basePrice + otvAmount) * kdvRate;

  const amortizableAmount = Math.min(basePrice, 1100000);
  const amortizationPerMonth = amortizableAmount / 60;
  const amortizationUsed = amortizationPerMonth * monthsHeld;

  const totalGider = amortizationUsed + otvAmount + kdvAmount;
  const giderYazilabilir = totalGider * 0.70;
  const vergiAvantaji = giderYazilabilir * 0.25;

  const resultHTML = `
    <h3>Sonuçlar:</h3>
    <ul>
      <li><strong>Vergisiz Alış Fiyatı:</strong> ₺${formatNumber(basePrice.toFixed(2))}</li>
      <li><strong>ÖTV Tutarı:</strong> ₺${formatNumber(otvAmount.toFixed(2))}</li>
      <li><strong>KDV Tutarı:</strong> ₺${formatNumber(kdvAmount.toFixed(2))}</li>
      <li><strong>${monthsHeld} Aylık Amortisman:</strong> ₺${formatNumber(amortizationUsed.toFixed(2))}</li>
      <li><strong>Toplam Gider:</strong> ₺${formatNumber(totalGider.toFixed(2))}</li>
      <li><strong>Gider Yazılabilir Tutar (%70):</strong> ₺${formatNumber(giderYazilabilir.toFixed(2))}</li>
      <li><strong>Net Vergi Avantajı (%25):</strong> ₺${formatNumber(vergiAvantaji.toFixed(2))}</li>
    </ul>
  `;

  document.getElementById("results").innerHTML = resultHTML;
}
