// Carregamento e normalização dos dados (PapaParse)
window.PLS_DADOS = (function () {
  const cfg = window.PLS_CONFIG;

  function carregarCSV(url) {
    // Cache-busting: ajuda a refletir mais rápido edições na planilha do Google.
    const sep = url.includes("?") ? "&" : "?";
    const final = url + sep + "_=" + Date.now();
    return new Promise((resolve, reject) => {
      Papa.parse(final, {
        download: true, header: true, skipEmptyLines: true,
        complete: (r) => resolve(r.data),
        error: reject
      });
    });
  }

  // Calcula a data-limite de uma ação a partir da categoria de prazo,
  // caso não haja data explícita preenchida na planilha.
  function dataLimite(acao) {
    if (acao.data_limite) return new Date(acao.data_limite);
    const cat = (acao.prazo_categoria || "").split(" a ").pop().trim(); // pega o maior
    const meses = cfg.prazos[cat];
    if (!meses) return null;
    const base = new Date(cfg.vigenciaInicio);
    base.setMonth(base.getMonth() + meses);
    return base;
  }

  // Deriva o status real (regra: vencida e não concluída => Atrasada)
  function statusDerivado(acao) {
    const s = (acao.status || "Não iniciada").trim();
    if (["Concluída","Execução contínua","Suspensa","Não se aplica"].includes(s)) return s;
    const lim = dataLimite(acao);
    if (lim && lim < new Date() && s !== "Concluída") return "Atrasada";
    return s;
  }

  function normalizar(acoes) {
    return acoes.filter(a => a.id).map(a => {
      a.percentual_execucao = Number(a.percentual_execucao || 0);
      a._dataLimite = dataLimite(a);
      a._status = statusDerivado(a);
      a._responsaveis = (a.responsavel || "").split(/[;]/).map(x => x.trim()).filter(Boolean);
      return a;
    });
  }

  async function carregarTudo() {
    const [acoes, eixos, indicadores] = await Promise.all([
      carregarCSV(cfg.fonteAcoes),
      carregarCSV(cfg.fonteEixos),
      carregarCSV(cfg.fonteIndicadores)
    ]);
    return { acoes: normalizar(acoes), eixos, indicadores };
  }

  return { carregarTudo, dataLimite, statusDerivado };
})();
