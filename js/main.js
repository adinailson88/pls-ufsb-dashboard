// Orquestração do painel
(function () {
  const cfg = window.PLS_CONFIG;
  let DADOS = null;
  let filtros = { eixo: "", status: "", responsavel: "", busca: "" };

  const $ = (sel) => document.querySelector(sel);

  function contar(acoes, campo, derivado) {
    const m = {};
    acoes.forEach(a => {
      const v = derivado ? a["_" + campo] : a[campo];
      m[v] = (m[v] || 0) + 1;
    });
    return m;
  }

  function aplicarFiltros(acoes) {
    return acoes.filter(a => {
      if (filtros.eixo && a.eixo !== filtros.eixo) return false;
      if (filtros.status && a._status !== filtros.status) return false;
      if (filtros.responsavel && !a._responsaveis.includes(filtros.responsavel)) return false;
      if (filtros.busca) {
        const t = (a.acao + " " + a.objetivo + " " + a.indicador).toLowerCase();
        if (!t.includes(filtros.busca.toLowerCase())) return false;
      }
      return true;
    });
  }

  function renderKPIs(acoes) {
    const total = acoes.length;
    const porStatus = contar(acoes, "status", true);
    const pct = (n) => total ? Math.round((n || 0) / total * 100) : 0;
    const cards = [
      { rotulo: "Ações monitoradas", valor: total, cor: "#37474f" },
      { rotulo: "Concluídas", valor: `${pct(porStatus["Concluída"])}%`, cor: cfg.coresStatus["Concluída"] },
      { rotulo: "Em andamento", valor: `${pct(porStatus["Em andamento"])}%`, cor: cfg.coresStatus["Em andamento"] },
      { rotulo: "Atrasadas", valor: `${pct(porStatus["Atrasada"])}%`, cor: cfg.coresStatus["Atrasada"] },
      { rotulo: "Não iniciadas", valor: `${pct(porStatus["Não iniciada"])}%`, cor: cfg.coresStatus["Não iniciada"] },
      { rotulo: "Execução contínua", valor: porStatus["Execução contínua"] || 0, cor: cfg.coresStatus["Execução contínua"] },
    ];
    $("#kpis").innerHTML = cards.map(c => `
      <div class="kpi" style="border-top-color:${c.cor}">
        <div class="kpi-valor" style="color:${c.cor}">${c.valor}</div>
        <div class="kpi-rotulo">${c.rotulo}</div>
      </div>`).join("");
  }

  function renderFiltros(acoes) {
    const eixos = [...new Set(DADOS.acoes.map(a => a.eixo))].sort();
    const status = cfg.statusValidos;
    const resp = [...new Set(DADOS.acoes.flatMap(a => a._responsaveis))].sort();
    $("#f-eixo").innerHTML = `<option value="">Todos os eixos</option>` + eixos.map(e => `<option>${e}</option>`).join("");
    $("#f-status").innerHTML = `<option value="">Todos os status</option>` + status.map(s => `<option>${s}</option>`).join("");
    $("#f-resp").innerHTML = `<option value="">Todos os responsáveis</option>` + resp.map(r => `<option>${r}</option>`).join("");
  }

  function renderTabela(acoes) {
    $("#contagem").textContent = `${acoes.length} ação(ões)`;
    if (!acoes.length) { $("#tabela-corpo").innerHTML = `<tr><td colspan="6" class="vazio">Nenhuma ação para os filtros.</td></tr>`; return; }
    $("#tabela-corpo").innerHTML = acoes.map(a => {
      const cor = cfg.coresStatus[a._status] || "#999";
      const lim = a._dataLimite ? a._dataLimite.toLocaleDateString("pt-BR") : "—";
      return `<tr>
        <td><span class="tag" data-eixo>${a.eixo}</span></td>
        <td class="acao-cel" title="${(a.indicador||'').replace(/"/g,'')}">${a.acao}</td>
        <td>${a.responsavel || "—"}</td>
        <td>${a.prazo_categoria || "—"}${a.prazo_qualificador ? ` <em>(${a.prazo_qualificador})</em>` : ""}<br><small>${lim}</small></td>
        <td><span class="status" style="background:${cor}">${a._status}</span></td>
        <td><div class="barra"><span style="width:${a.percentual_execucao}%;background:${cor}"></span></div><small>${a.percentual_execucao}%</small></td>
      </tr>`;
    }).join("");
  }

  function atualizar() {
    const filtradas = aplicarFiltros(DADOS.acoes);
    renderKPIs(filtradas);
    renderTabela(filtradas);
    window.PLS_GRAFICOS.atualizar(filtradas, DADOS);
  }

  function ligarEventos() {
    $("#f-eixo").addEventListener("change", e => { filtros.eixo = e.target.value; atualizar(); });
    $("#f-status").addEventListener("change", e => { filtros.status = e.target.value; atualizar(); });
    $("#f-resp").addEventListener("change", e => { filtros.responsavel = e.target.value; atualizar(); });
    $("#f-busca").addEventListener("input", e => { filtros.busca = e.target.value; atualizar(); });
  }

  async function recarregar() {
    DADOS = await window.PLS_DADOS.carregarTudo();
    renderFiltros(DADOS.acoes);
    const agora = new Date().toLocaleString("pt-BR");
    const fonte = /^https?:/.test(cfg.fonteAcoes) ? "planilha do Google (ao vivo)" : "CSV do repositório";
    $("#ultima-carga").textContent = `Dados: ${fonte} · última carga: ${agora} · `;
    atualizar();
    window.PLS_GRAFICOS.indicadoresAnuais(DADOS.indicadores);
  }

  async function iniciar() {
    try {
      $("#carregando").style.display = "none";
      $("#conteudo").style.display = "block";
      window.PLS_GRAFICOS.init();
      ligarEventos();
      $("#btn-atualizar").addEventListener("click", recarregar);
      await recarregar();
    } catch (err) {
      $("#carregando").innerHTML = `<p class="erro">Erro ao carregar dados: ${err.message || err}.<br>
        Se estiver abrindo o arquivo direto (file://), use um servidor local: <code>python -m http.server</code></p>`;
    }
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
