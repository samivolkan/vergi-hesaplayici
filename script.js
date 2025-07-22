
let motorHacmi = null;
let satisSuresi = null;

function selectMotor(hacim) {
    motorHacmi = hacim;
    document.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");
}

function selectSure(sure) {
    satisSuresi = sure;
    document.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");
}

function parseNumber(str) {
    return parseFloat(str.replace(/,/g, '').replace(/\./g, ''));
}

function hesapla() {
    let alis = parseNumber(document.getElementById("alisFiyati").value);
    let satis = parseNumber(document.getElementById("satisFiyati").value);
    let mtv = parseNumber(document.getElementById("mtv").value);
    let sigorta = parseNumber(document.getElementById("sigorta").value);
    let yakit = parseNumber(document.getElementById("yakit").value);
    let bakim = parseNumber(document.getElementById("bakim").value);

    let giderler = mtv + sigorta + yakit + bakim;
    let amortisman = alis * (satisSuresi / 24);
    let toplamGider = amortisman + (giderler * 0.7);
    let vergiAvantaji = toplamGider * 0.25;

    document.getElementById("sonuc").innerHTML = `
        <h3>Hesaplama Sonucu</h3>
        <p>Toplam Gider (Amortisman + %70 Sabit): ${toplamGider.toFixed(2)} TL</p>
        <p>Vergi Avantajı (%25): ${vergiAvantaji.toFixed(2)} TL</p>
    `;
}
