
document.getElementById('vergiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const alis = parseFloat(document.getElementById('alisFiyati').value.replace(/\./g, '').replace(',', '.'));
    const motor = parseInt(document.querySelector('input[name="motorHacmi"]:checked').value);
    const sure = parseInt(document.getElementById('satisSuresi').value);
    const mtv = parseFloat(document.getElementById('mtv').value.replace(/\./g, '').replace(',', '.')) || 0;
    const sigorta = parseFloat(document.getElementById('sigorta').value.replace(/\./g, '').replace(',', '.')) || 0;
    const yakit = parseFloat(document.getElementById('yakit').value.replace(/\./g, '').replace(',', '.')) || 0;
    const bakim = parseFloat(document.getElementById('bakim').value.replace(/\./g, '').replace(',', '.')) || 0;

    const giderler = { mtv, sigorta, yakit, bakim };
    const toplamGider = mtv + sigorta + yakit + bakim;

    const amortisman = alis * 0.6 * (sure / 24); // örnek hızlı amortisman
    const vergiAvantaji = (toplamGider + amortisman) * 0.22;

    document.getElementById('sonuc').innerHTML = `
        <h3>Sonuçlar</h3>
        <p>Toplam Gider: ${toplamGider.toLocaleString()} TL</p>
        <p>Amortisman: ${amortisman.toLocaleString()} TL</p>
        <p><strong>Vergi Avantajı: ${vergiAvantaji.toLocaleString()} TL</strong></p>
    `;

    const ctx1 = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: Object.keys(giderler),
            datasets: [{
                label: 'Gider Dağılımı',
                data: Object.values(giderler),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
            }]
        }
    });

    const ctx2 = document.getElementById('barChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Object.keys(giderler),
            datasets: [{
                label: 'Vergi Avantajı (TL)',
                data: Object.values(giderler).map(v => v * 0.22),
                backgroundColor: '#4CAF50'
            }]
        }
    });
});
