// Gráficos (Chart.js)
window.PLS_GRAFICOS = (function () {
  const cfg = window.PLS_CONFIG;
  let gRosca, gBarras, gIndic;

  function init() {
    gRosca = new Chart(document.getElementById("g-status"), {
      type: "doughnut",
      data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
      options: { plugins: { legend: { position: "right" } }, cutout: "60%" }
    });
    gBarras = new Chart(document.getElementById("g-eixos"), {
      type: "bar",
      data: { labels: [], datasets: [] },
      options: {
        responsive: true, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
        plugins: { legend: { position: "bottom" } }
      }
    });
  }

  function contar(acoes, derivado) {
    const m = {};
    acoes.forEach(a => { const v = a["_status"]; m[v] = (m[v] || 0) + 1; });
    return m;
  }

  function atualizar(acoes, dados) {
    // Rosca por status
    const porStatus = contar(acoes);
    const labels = Object.keys(porStatus);
    gRosca.data.labels = labels;
    gRosca.data.datasets[0].data = labels.map(l => porStatus[l]);
    gRosca.data.datasets[0].backgroundColor = labels.map(l => cfg.coresStatus[l] || "#999");
    gRosca.update();

    // Barras empilhadas: status por eixo
    const eixos = [...new Set(dados.acoes.map(a => a.eixo))].sort();
    const statusSet = cfg.statusValidos;
    gBarras.data.labels = eixos;
    gBarras.data.datasets = statusSet.map(s => ({
      label: s,
      backgroundColor: cfg.coresStatus[s] || "#999",
      data: eixos.map(e => acoes.filter(a => a.eixo === e && a._status === s).length)
    }));
    gBarras.update();
  }

  function indicadoresAnuais(indicadores) {
    const el = document.getElementById("g-indicadores");
    if (!el || !indicadores.length) return;
    const anos = ["Ano 1","Ano 2","Ano 3","Ano 4","Ano 5"];
    // mostra o indicador-chave: Índice de alcance das metas do PGGRS
    const alvo = indicadores.find(i => /alcance das metas do PGGRS/i.test(i.indicador)) || indicadores[0];
    const meta = [alvo.ano1_meta, alvo.ano2_meta, alvo.ano3_meta, alvo.ano4_meta, alvo.ano5_meta].map(Number);
    const real = [alvo.ano1_real, alvo.ano2_real, alvo.ano3_real, alvo.ano4_real, alvo.ano5_real].map(v => v === "" ? null : Number(v));
    gIndic = new Chart(el, {
      type: "line",
      data: { labels: anos, datasets: [
        { label: "Meta — " + alvo.indicador, data: meta, borderColor: "#6d4c41", tension: .2 },
        { label: "Realizado", data: real, borderColor: "#2e7d32", borderDash: [6,4], tension: .2 }
      ]},
      options: { plugins: { legend: { position: "bottom" } }, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: "%" } } } }
    });
  }

  return { init, atualizar, indicadoresAnuais };
})();
