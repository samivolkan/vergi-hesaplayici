
function parseNumber(val) {
  return parseFloat(val.replace(/\./g, '').replace(',', '.')) || 0;
}

function formatNumber(val) {
  return val.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function calculate() {
  const purchasePrice = parseNumber(document.getElementById("purchasePrice").value);
  const engineSize = Number(document.getElementById("engineSize").value);
  const monthsHeld = Number(document.getElementById("monthsHeld").value);
  const mtv = parseNumber(document.getElementById("mtv").value);
  const sigorta = parseNumber(document.getElementById("sigorta").value);
  const bakım = parseNumber(document.getElementById("bakim").value);
  const yakit = parseNumber(document.getElementById("yakit").value);

  let otvRate = 0;
  let kdvRate = 0.20;

  if (engineSize <= 1300) otvRate = 0.45;
  else if (engineSize <= 1600) otvRate = 0.60;
  else if (engineSize <= 1800) otvRate = 0.80;
  else if (engineSize <= 2000) otvRate = 1.30;
  else if (engineSize <= 2500) otvRate = 1.50;
  else otvRate = 2.20;

  const basePrice = purchasePrice / ((1 + otvRate) * (1 + kdvRate));
  const otvAmount = basePrice * otvRate;
  const kdvAmount = (basePrice + otvAmount) * kdvRate;

  const amortizableAmount = Math.min(basePrice, 1100000);
  const amortizationPerMonth = amortizableAmount / 60;
  const amortizationUsed = amortizationPerMonth * monthsHeld;

  const toplamGider = amortizationUsed + otvAmount + kdvAmount + mtv + sigorta + bakım + yakit;
  const giderYazilabilir = toplamGider * 0.70;
  const vergiAvantaji = giderYazilabilir * 0.25;

  let optimumMonth = Math.ceil((1100000 / amortizationPerMonth) / 2);
  if (optimumMonth > 60) optimumMonth = 60;

  const resultHTML = `
    <h3>Sonuçlar:</h3>
    <ul>
      <li><strong>Vergisiz Alış Fiyatı:</strong> ₺${formatNumber(basePrice)}</li>
      <li><strong>ÖTV Tutarı:</strong> ₺${formatNumber(otvAmount)}</li>
      <li><strong>KDV Tutarı:</strong> ₺${formatNumber(kdvAmount)}</li>
      <li><strong>${monthsHeld} Aylık Amortisman:</strong> ₺${formatNumber(amortizationUsed)}</li>
      <li><strong>MTV:</strong> ₺${formatNumber(mtv)}</li>
      <li><strong>Sigorta:</strong> ₺${formatNumber(sigorta)}</li>
      <li><strong>Bakım:</strong> ₺${formatNumber(bakım)}</li>
      <li><strong>Yakıt:</strong> ₺${formatNumber(yakit)}</li>
      <li><strong>Toplam Gider:</strong> ₺${formatNumber(toplamGider)}</li>
      <li><strong>Gider Yazılabilir (%70):</strong> ₺${formatNumber(giderYazilabilir)}</li>
      <li><strong>Net Vergi Avantajı (%25):</strong> ₺${formatNumber(vergiAvantaji)}</li>
    </ul>
    <p><strong>Optimum amortisman süresi önerisi:</strong> ${optimumMonth} ay</p>
  `;

  document.getElementById("results").innerHTML = resultHTML;
}
