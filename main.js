
let vehicleType = 'binek';
let engineSize = 1300;
let holdPeriod = 12;

function setVehicleType(type) {
    vehicleType = type;
}
function setEngine(size) {
    engineSize = size;
}
function setPeriod(months) {
    holdPeriod = months;
}

function calculate() {
    const priceStr = document.getElementById("purchasePrice").value.replace(/,/g, '');
    const expensesStr = document.getElementById("expenses").value.replace(/,/g, '');
    const price = parseFloat(priceStr);
    const expenses = parseFloat(expensesStr);

    if (isNaN(price) || isNaN(expenses)) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    let amortizationLimit = 1100000;
    let fullLimit = 2100000;

    let amortizable = Math.min(price, amortizationLimit);
    let deductibleExpenses = expenses * 0.7;

    let totalDeduction = amortizable + deductibleExpenses;
    let taxAdvantage = totalDeduction * 0.25;

    document.getElementById("results").innerHTML = `
        <h3>Sonuçlar:</h3>
        <p>Amortismana tabi tutar: ${amortizable.toLocaleString()} TL</p>
        <p>Gider Yazılabilir Kalemler (%70): ${deductibleExpenses.toLocaleString()} TL</p>
        <p><strong>Toplam Vergi Avantajı: ${taxAdvantage.toLocaleString()} TL</strong></p>
    `;
}
