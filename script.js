let type = "arac";

function selectType(t) {
    type = t;
    document.getElementById("btnArac").classList.remove("active");
    document.getElementById("btnMotor").classList.remove("active");
    document.getElementById("btn" + (t === "arac" ? "Arac" : "Motor")).classList.add("active");
    calculate();
}

function calculate() {
    const price = parseFloat(document.getElementById("totalPrice").value);
    const cc = parseInt(document.getElementById("cc").value);
    const age = parseInt(document.getElementById("age").value);
    const duration = parseInt(document.getElementById("duration").value);

    if (!price || !cc || !age || !duration) return;

    const priceNoKDV = price / 1.2;
    const otvRate = type === "motor" ? (cc <= 250 ? 0.08 : 0.37) :
                    (cc <= 1300 ? 0.45 : cc <= 1600 ? 0.6 : cc <= 2000 ? 1.3 : 2.2);
    const priceNoOTV = priceNoKDV / (1 + otvRate);
    const amortization = priceNoOTV * (duration / 30);
    const otv = priceNoKDV - priceNoOTV;
    const kdv = price - priceNoKDV;

    let mtv = 0;
    if (type === "arac") {
        const mtvTable = {
            "1300": [4834, 4042, 2068, 1420, 499],
            "1600": [8421, 6314, 3661, 2587, 993],
            "2000": [25792, 19862, 11674, 6948, 2731]
        };
        if (cc <= 1300) mtv = mtvTable["1300"][age - 1];
        else if (cc <= 1600) mtv = mtvTable["1600"][age - 1];
        else if (cc <= 2000) mtv = mtvTable["2000"][age - 1];
    }

    const gider = amortization + mtv;
    const vergiAvantaj = gider * 0.25;

    document.getElementById("summaryBox").innerHTML = `
        <strong>ÖTV Hariç Matrah:</strong> ${priceNoOTV.toFixed(0)} ₺<br>
        <strong>ÖTV:</strong> ${otv.toFixed(0)} ₺<br>
        <strong>KDV:</strong> ${kdv.toFixed(0)} ₺<br>
        <strong>Amortisman:</strong> ${amortization.toFixed(0)} ₺<br>
        <strong>MTV:</strong> ${mtv.toFixed(0)} ₺<br>
        <strong>Toplam Gider:</strong> ${gider.toFixed(0)} ₺<br>
        <strong>Vergi Avantajı (%25):</strong> ${vergiAvantaj.toFixed(0)} ₺
    `;

    new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
            labels: ["Amortisman", "MTV", "Vergi Avantajı"],
            datasets: [{
                data: [amortization, mtv, vergiAvantaj],
                backgroundColor: ['#007bff', '#ffc107', '#28a745']
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

document.querySelectorAll("input, select").forEach(e => e.addEventListener("input", calculate));
