
function hesapla() {
  const price = parseFloat(document.getElementById("price").value.replace(/\./g, '').replace(',', '.'));
  const salesPrice = parseFloat(document.getElementById("salesPrice").value.replace(/\./g, '').replace(',', '.'));

  const giderInputs = document.querySelectorAll('.gider');
  let totalGider = 0;
  giderInputs.forEach(input => {
    const val = parseFloat(input.value.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(val)) totalGider += val;
  });

  const amortisman = price / 2;  // örnek hesap
  const toplamGider = amortisman + totalGider;
  const vergiAvantaj = toplamGider * 0.25;

  document.getElementById("summary").innerText = `
    Amortisman: ${amortisman.toLocaleString()} TL
    Giderler: ${totalGider.toLocaleString()} TL
    Toplam Vergi Avantajı: ${vergiAvantaj.toLocaleString()} TL
  `;
}

// Buton seçim vurgusu
document.querySelectorAll('.motor-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.motor-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }
});
document.querySelectorAll('.duration-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }
});
