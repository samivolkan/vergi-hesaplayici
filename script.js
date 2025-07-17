
function formatNumber(input) {
    let value = input.value.replace(/,/g, '').replace(/[^\d.]/g, '');
    let parts = value.split('.');
    let intPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1].slice(0, 2) : '';
    input.value = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + decimalPart;
}

function temizle(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}

function hesapla() {
    let alisFiyati = temizle(document.getElementById("alis_fiyati").value);
    let vergisizFiyat = temizle(document.getElementById("vergisiz_fiyat").value);
    let satisFiyati = temizle(document.getElementById("sat_fiyati").value);

    let sonucDiv = document.getElementById("sonuc");
    sonucDiv.innerHTML = "";

    // Sınırlar
    const amortismanLimiti = 1100000;
    const toplamLimit = 2100000;

    let amortismanYazilabilir = vergisizFiyat <= amortismanLimiti;
    let toplamYazilabilir = alisFiyati <= toplamLimit;

    let amortisman = amortismanYazilabilir ? vergisizFiyat : 0;
    let kar = satisFiyati - alisFiyati;

    let vergiAvantaji = (amortisman + kar) * 0.25;

    let html = `
        Alış Bedeli (KDV + ÖTV dahil): ${alisFiyati.toLocaleString('tr-TR')} ₺<br>
        Vergisiz Alış Bedeli: ${vergisizFiyat.toLocaleString('tr-TR')} ₺<br>
        Satış Fiyatı: ${satisFiyati.toLocaleString('tr-TR')} ₺<br><br>
        ${amortismanYazilabilir ? "✅ Amortisman yazılabilir." : "❌ Amortisman sınırı aşıldı."}<br>
        ${toplamYazilabilir ? "✅ Toplam gider yazılabilir." : "❌ Gider sınırı aşıldı."}<br><br>
        🚗 Kâr: ${kar.toLocaleString('tr-TR')} ₺<br>
        📉 Vergi Avantajı (Tahmini): ${vergiAvantaji.toLocaleString('tr-TR')} ₺
    `;

    sonucDiv.innerHTML = html;
}
