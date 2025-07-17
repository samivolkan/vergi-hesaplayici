
function parseNumber(val) {
  return parseFloat(val.replace(/\./g, '').replace(',', '.')) || 0;
}

document.querySelectorAll("#motorHacmiGroup button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#motorHacmiGroup button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
    });
});

document.getElementById("vergiForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const alisFiyat = parseNumber(document.getElementById("alisFiyat").value);
    const motorHacmi = document.querySelector("#motorHacmiGroup .selected")?.dataset.value || 1600;
    const ay = parseInt(document.getElementById("satisSuresi").value);
    const mtv = parseNumber(document.getElementById("mtv").value);
    const sigorta = parseNumber(document.getElementById("sigorta").value);
    const bakim = parseNumber(document.getElementById("bakim").value);
    const yakit = parseNumber(document.getElementById("yakit").value);

    const otvOran = motorHacmi <= 1300 ? 0.45 : motorHacmi <= 1600 ? 0.6 : motorHacmi <= 2000 ? 1.5 : 2.2;
    const kdvOran = 0.2;

    const kdvTutar = alisFiyat / (1 + otvOran + kdvOran) * kdvOran;
    const otvTutar = alisFiyat / (1 + otvOran + kdvOran) * otvOran;
    const vergisizFiyat = alisFiyat - otvTutar - kdvTutar;

    const amortisman = Math.min(vergisizFiyat, 1100000) * (ay / 60);
    const toplamGider = amortisman + mtv + sigorta + bakim + yakit;
    const giderYazilabilir = toplamGider * 0.7;
    const vergiAvantaji = giderYazilabilir * 0.25;

    const sonuc = `
        <h3>💰 Hesaplama Sonucu</h3>
        <p><strong>Amortisman:</strong> ${amortisman.toFixed(2)} TL</p>
        <p><strong>Toplam Gider:</strong> ${toplamGider.toFixed(2)} TL</p>
        <p><strong>Gider Yazılabilir (70%):</strong> ${giderYazilabilir.toFixed(2)} TL</p>
        <p><strong>Vergi Avantajı (25%):</strong> ${vergiAvantaji.toFixed(2)} TL</p>
        <p><strong>ÖTV:</strong> ${otvTutar.toFixed(2)} TL | <strong>KDV:</strong> ${kdvTutar.toFixed(2)} TL</p>
    `;

    document.getElementById("sonuc").innerHTML = sonuc;
});
