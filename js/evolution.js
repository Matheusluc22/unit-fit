/* ==========================================================================
   UNIFIT PHYSICAL EVOLUTION & BODY METRICS MODULE
   Chart.js integration, Body measurements tracking & Before/After photo comparison
   ========================================================================== */

class UniFitEvolution {
  static getMeasurements() {
    const raw = localStorage.getItem("unifit_measurements");
    return raw ? JSON.parse(raw) : [];
  }

  static addMeasurement(entry) {
    const list = this.getMeasurements();
    const newEntry = {
      date: entry.date || new Date().toISOString().split("T")[0],
      weight: parseFloat(entry.weight) || 70,
      arm: parseFloat(entry.arm) || 0,
      chest: parseFloat(entry.chest) || 0,
      waist: parseFloat(entry.waist) || 0,
      hips: parseFloat(entry.hips) || 0,
      legs: parseFloat(entry.legs) || 0,
      calves: parseFloat(entry.calves) || 0,
      bodyFat: parseFloat(entry.bodyFat) || 0
    };

    list.push(newEntry);
    localStorage.setItem("unifit_measurements", JSON.stringify(list));

    // Also update user's current weight in user profile
    const user = UniFitAuth.getCurrentUser();
    if (user) {
      user.weight = newEntry.weight;
      UniFitAuth.updateUserProfile(user);
    }

    return list;
  }

  static renderWeightChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const data = this.getMeasurements();
    const labels = data.map(d => new Date(d.date).toLocaleDateString("pt-BR", { month: "short", day: "numeric" }));
    const weights = data.map(d => d.weight);

    // Destroy existing chart instance if exists
    if (window.unifitWeightChartInstance) {
      window.unifitWeightChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)");
    gradient.addColorStop(1, "rgba(34, 197, 94, 0.0)");

    window.unifitWeightChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Peso Corporal (kg)",
          data: weights,
          borderColor: "#4ADE80",
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#22C55E",
          pointBorderColor: "#FFFFFF",
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#4ADE80",
            bodyColor: "#FFFFFF",
            borderColor: "rgba(74, 222, 128, 0.3)",
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#9CA3AF" }
          },
          y: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#9CA3AF" }
          }
        }
      }
    });
  }
}
