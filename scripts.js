const logData = [
  { waktu: "2025-05-01 10:00", suhu: 200, kelembaban: 60, ph: 6.5, tinggi: 15 },
  {
    waktu: "2025-05-01 11:00",
    suhu: 100,
    kelembaban: 62,
    ph: 6.4,
    tinggi: 14.8,
  },
  {
    waktu: "2025-05-01 12:00",
    suhu: 150,
    kelembaban: 63,
    ph: 6.3,
    tinggi: 14.7,
  },
];

function renderTable(data) {
  const tbody = document.getElementById("log-table");
  tbody.innerHTML = data
    .map(
      (item) => `
    <tr>
      <td>${item.waktu}</td>
      <td>${item.suhu}</td>
      <td>${item.kelembaban}</td>
      <td>${item.ph}</td>
      <td>${item.tinggi}</td>
    </tr>
  `
    )
    .join("");

  const suhu = data[data.length - 1].suhu;
  document.getElementById("suhu").textContent = suhu + " °C";
  document.getElementById("kelembaban").textContent =
    data[data.length - 1].kelembaban + " %";
  document.getElementById("ph").textContent = data[data.length - 1].ph;
  document.getElementById("air").textContent =
    data[data.length - 1].tinggi + " cm";

  // Alert jika suhu tinggi
  document.getElementById("alertBox").style.display =
    suhu >= 30 ? "block" : "none";
}

document.getElementById("search-log").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = logData.filter((entry) =>
    Object.values(entry).some((val) =>
      String(val).toLowerCase().includes(keyword)
    )
  );
  renderTable(filtered);
});

renderTable(logData);

// Chart setup
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: logData.map((d) => d.waktu),
    datasets: [
      {
        label: "Suhu (°C)",
        data: logData.map((d) => d.suhu),
        borderColor: "#ef5350",
        backgroundColor: "rgba(239,83,80,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Kelembaban (%)",
        data: logData.map((d) => d.kelembaban),
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66,165,245,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
});

new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: logData.map((d) => d.waktu),
    datasets: [
      {
        label: "pH",
        data: logData.map((d) => d.ph),
        backgroundColor: "#ffca28",
      },
      {
        label: "Ketinggian Air (cm)",
        data: logData.map((d) => d.tinggi),
        backgroundColor: "#29b6f6",
      },
    ],
  },
});
