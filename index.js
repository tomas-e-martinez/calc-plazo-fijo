const calculateCompoundInterest = (capital, anualRate, timesCompounded) => {
    const r = anualRate / 100;
    const n = timesCompounded;

    const totalRate = Math.pow(1 + r / n, n) - 1;
    return { resultRate: totalRate * 100, totalAmount: capital * (1 + totalRate) }; 
}

const calculateAverageRate = (rate1, rate2, rate3) => {
    return (rate1 + rate2 + rate3) / 3;
}

const setAverageRateLabels = (capital) => {
    const averageRateProvincia = calculateAverageRate(
        parseFloat(document.getElementById("rate22Provincia").value),
        parseFloat(document.getElementById("rate23Provincia").value),
        parseFloat(document.getElementById("rate24Provincia").value)
    );
    const amountProv = capital * (1 + (averageRateProvincia / 100));

    const averageRateNacion = calculateAverageRate(
        parseFloat(document.getElementById("rate22Nacion").value),
        parseFloat(document.getElementById("rate23Nacion").value),
        parseFloat(document.getElementById("rate24Nacion").value)
    );
    const amountNac = capital * (1 + (averageRateNacion / 100));

    const averageRateHipotecario = calculateAverageRate(
        parseFloat(document.getElementById("rate22Hipotecario").value),
        parseFloat(document.getElementById("rate23Hipotecario").value),
        parseFloat(document.getElementById("rate24Hipotecario").value)
    );
    const amountHip = capital * (1 + (averageRateHipotecario / 100));

    const annualRateProvinciaLbl = document.getElementById("annualRateProvincia");
    const annualRateNacionLbl = document.getElementById("annualRateNacion");
    const annualRateHipotecarioLbl = document.getElementById("annualRateHipotecario");

    annualRateProvinciaLbl.innerText = `$${(amountProv).toFixed(2)} (${averageRateProvincia.toFixed(2)}%)`;
    annualRateNacionLbl.innerText = `$${(amountNac).toFixed(2)} (${averageRateNacion.toFixed(2)}%)`;
    annualRateHipotecarioLbl.innerText = `$${(amountHip).toFixed(2)} (${averageRateHipotecario.toFixed(2)}%)`;

    return { averageRateProvincia, averageRateNacion, averageRateHipotecario };
}

const setThreeMonthlyRateLabels = (capital, rateProvincia, rateNacion, rateHipotecario) => {
    const threemonthlyRateProvinciaLbl = document.getElementById("threemonthlyRateProvincia");
    const threemonthlyRateNacionLbl = document.getElementById("threemonthlyRateNacion");
    const threemonthlyRateHipotecarioLbl = document.getElementById("threemonthlyRateHipotecario");

    const { resultRate: rateProv, totalAmount: amountProv } = calculateCompoundInterest(capital, rateProvincia, 4);
    threemonthlyRateProvinciaLbl.innerText = `$${amountProv.toFixed(2)} (${rateProv.toFixed(2)}%)`;
    
    const { resultRate: rateNac, totalAmount: amountNac } = calculateCompoundInterest(capital, rateNacion, 4);
    threemonthlyRateNacionLbl.innerText = `$${amountNac.toFixed(2)} (${rateNac.toFixed(2)}%)`;
    
    const { resultRate: rateHip, totalAmount: amountHip } = calculateCompoundInterest(capital, rateHipotecario, 4);
    threemonthlyRateHipotecarioLbl.innerText = `$${amountHip.toFixed(2)} (${rateHip.toFixed(2)}%)`;
}

const setMonthlyRateLabels = (capital, rateProvincia, rateNacion, rateHipotecario) => {
    const monthlyRateProvinciaLbl = document.getElementById("monthlyRateProvincia");
    const monthlyRateNacionLbl = document.getElementById("monthlyRateNacion");
    const monthlyRateHipotecarioLbl = document.getElementById("monthlyRateHipotecario");

    const { resultRate: rateProv, totalAmount: amountProv } = calculateCompoundInterest(capital, rateProvincia, 12);
    monthlyRateProvinciaLbl.innerText = `$${amountProv.toFixed(2)} (${rateProv.toFixed(2)}%)`;

    const { resultRate: rateNac, totalAmount: amountNac } = calculateCompoundInterest(capital, rateNacion, 12);
    monthlyRateNacionLbl.innerText = `$${amountNac.toFixed(2)} (${rateNac.toFixed(2)}%)`;

    const { resultRate: rateHip, totalAmount: amountHip } = calculateCompoundInterest(capital, rateHipotecario, 12);
    monthlyRateHipotecarioLbl.innerText = `$${amountHip.toFixed(2)} (${rateHip.toFixed(2)}%)`;
}

const highlightBestAndWorst = (rates) => {
    const banks = ["Provincia", "Nacion", "Hipotecario"];
    const values = [rates.averageRateProvincia, rates.averageRateNacion, rates.averageRateHipotecario];

    const maxIndex = values.indexOf(Math.max(...values));
    const minIndex = values.indexOf(Math.min(...values));

    banks.forEach(b => {
        const section = document.getElementById(`bank${b}`);
        section.classList.remove("best", "worst");
    });

    document.getElementById(`bank${banks[maxIndex]}`).classList.add("best");
    document.getElementById(`bank${banks[minIndex]}`).classList.add("worst");

    const msg = document.getElementById("summaryMessage");
    msg.innerText = `Mejor rendimiento: Banco ${banks[maxIndex]} | Peor rendimiento: Banco ${banks[minIndex]}`;
};

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const capital = parseFloat(document.getElementById("capital").value);


    const { averageRateProvincia, averageRateNacion, averageRateHipotecario } = setAverageRateLabels(capital);
    setThreeMonthlyRateLabels(capital, averageRateProvincia, averageRateNacion, averageRateHipotecario);
    setMonthlyRateLabels(capital, averageRateProvincia, averageRateNacion, averageRateHipotecario);

    highlightBestAndWorst({ averageRateProvincia, averageRateNacion, averageRateHipotecario });
})

document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value !== '') {
      input.value = parseFloat(input.value).toFixed(2);
    }
  });
});