
function parseInput(value) {
    if (typeof value === 'string') {
        return parseFloat(value.replace(/\./g, '').replace(/,/g, '').trim()) || 0;
    }
    return value;
}

function hesaplaVergiAvantaji(giderler) {
    const kurumlarVergisiOrani = 0.25;

    // Sadece %70'i gider yazılabilen kalemler
    const giderYazilabilirOran = 0.70;

    // KDV ve ÖTV doğrudan gider kabul edilmiyor, buna dikkat!
    let vergiAvantajKalemleri = {};
    let toplamVergiAvantaji = 0;

    for (let kalem in giderler) {
        if (kalem === "otv" || kalem === "kdv") {
            vergiAvantajKalemleri[kalem] = 0; // gider olarak kabul edilmediğinden avantaj yok
        } else {
            let giderinYazilabilirKismi = giderler[kalem] * giderYazilabilirOran;
            let avantaj = giderinYazilabilirKismi * kurumlarVergisiOrani;
            vergiAvantajKalemleri[kalem] = avantaj;
            toplamVergiAvantaji += avantaj;
        }
    }

    return {
        kalemler: vergiAvantajKalemleri,
        toplam: toplamVergiAvantaji
    };
}

// Kullanım örneği:
/*
let giderler = {
    otv: parseInput("200000"),
    kdv: parseInput("100000"),
    mtv: parseInput("10000"),
    sigorta: parseInput("5000"),
    yakit: parseInput("20000"),
    bakım: parseInput("10000")
};

let sonuc = hesaplaVergiAvantaji(giderler);
console.log(sonuc.kalemler);
console.log("Toplam Vergi Avantajı: " + sonuc.toplam);
*/
