
let motorHacmi = '';

function setMotor(hacim) {
    motorHacmi = hacim;
    document.querySelectorAll("button").forEach(btn => btn.style.backgroundColor = "");
    event.target.style.backgroundColor = "#8f8";
    hesapla();
}

document.getElementById("alisFiyat").addEventListener("input", hesapla);
document.getElementById("satisSuresi").addEventListener("change", hesapla);

function hesapla() {
    let fiyatStr = document.getElementById("alisFiyat").value.replace(/,/g, '').trim();
    let fiyat = parseFloat(fiyatStr);
    let sure = parseInt(document.getElementById("satisSuresi").value);
    if (!fiyat || !motorHacmi || !sure) return;

    let amortisman = (fiyat * 0.5) / (sure / 12);
    let vergiAvantaji = amortisman * 0.25;

    document.getElementById("sonuc").innerHTML =
        `<p><strong>Amortisman:</strong> ₺${amortisman.toLocaleString()}</p>
         <p><strong>Vergi Avantajı:</strong> ₺${vergiAvantaji.toLocaleString()}</p>`;
}
