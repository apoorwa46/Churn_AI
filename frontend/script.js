// let chart;

// async function predict() {

//     const tenure = Number(document.getElementById("tenure").value);
//     const monthly = Number(document.getElementById("monthly").value);
//     const total = Number(document.getElementById("total").value);

//     const HighValue = monthly > 70 ? 1 : 0;
//     const LongTerm = tenure > 24 ? 1 : 0;

//     const data = {
//         tenure,
//         MonthlyCharges: monthly,
//         TotalCharges: total,
//         HighValue,
//         LongTerm
//     };

//     const res = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(data)
//     });

//     const result = await res.json();

//     const riskClass =
//         result.risk === "High Risk" ? "high" :
//         result.risk === "Medium Risk" ? "medium" : "low";

//     // TEXT OUTPUT
//     document.getElementById("resultBox").innerHTML = `
//         <div class="result-item"><b>Churn:</b> ${result.churn}</div>
//         <div class="result-item"><b>Probability:</b> ${result.probability}</div>
//         <div class="result-item ${riskClass}"><b>Risk:</b> ${result.risk}</div>
//         <div class="result-item"><b>CLV:</b> ₹${result.clv}</div>
//         <div class="result-item"><b>Strategy:</b> ${result.retention_strategy}</div>
//     `;

//     // GRAPH (Probability Pie Chart)
//     const ctx = document.getElementById('chart').getContext('2d');

//     if (chart) chart.destroy();

//     chart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['No Churn', 'Churn'],
//             datasets: [{
//                 data: [1 - result.probability, result.probability]
//             }]
//         }
//     });
// }


let chart;

async function predict() {

    const tenure = Number(document.getElementById("tenure").value);
    const monthly = Number(document.getElementById("monthly").value);
    const total = Number(document.getElementById("total").value);

    // 🔥 VALIDATION
    if (!tenure || !monthly || !total) {
        alert("⚠️ Please fill all fields before submitting!");
        return;
    }

    const HighValue = monthly > 70 ? 1 : 0;
    const LongTerm = tenure > 24 ? 1 : 0;

    // const data = {
    //     tenure,
    //     MonthlyCharges: monthly,
    //     TotalCharges: total,
    //     HighValue,
    //     LongTerm
    // };

    const data = {
    tenure,
    MonthlyCharges: monthly,
    TotalCharges: total,

    gender: document.getElementById("gender").value,
    Partner: document.getElementById("partner").value,
    Dependents: document.getElementById("dependents").value,
    PhoneService: document.getElementById("phone").value,
    PaperlessBilling: document.getElementById("billing").value,
    PaymentMethod: document.getElementById("payment").value,
    Contract: document.getElementById("contract").value
};

     const res = await fetch("https://churn-ai-l7ez.onrender.com/predict", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(data)
    });

    // const res = await fetch("http://127.0.0.1:8000/predict", {
    //   method: "POST",
    //    headers: {"Content-Type": "application/json"},
    //    body: JSON.stringify(data)
    //});

    const result = await res.json();

    const riskClass =
        result.risk === "High Risk" ? "high" :
        result.risk === "Medium Risk" ? "medium" : "low";

    document.getElementById("resultBox").innerHTML = `
        <div class="result-item"><b>Churn:</b> ${result.churn}</div>
        <div class="result-item"><b>Probability:</b> ${result.probability}</div>
        <div class="result-item ${riskClass}"><b>Risk:</b> ${result.risk}</div>
        <div class="result-item"><b>CLV:</b> ₹${result.clv}</div>
        <div class="result-item"><b>Strategy:</b> ${result.retention_strategy}</div>
    `;

    // Chart
    const ctx = document.getElementById("chart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["No Churn", "Churn"],
            datasets: [{
                data: [1 - result.probability, result.probability]
            }]
        }
    });
}
