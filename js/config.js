// Configuração central do painel PLS-UFSB
window.PLS_CONFIG = {
  // Vigência oficial do PLS (Decreto 7.746/2012 + IN MPOG 10/2012)
  vigenciaInicio: "2022-01-01",
  vigenciaFim: "2027-12-31",
  revisoesBienais: ["2024-01-01", "2026-01-01"],

  // FONTE DE DADOS
  // Opção A (recomendada em produção): URL do Google Sheets publicado como CSV.
  //   Arquivo > Compartilhar > Publicar na web > aba ACOES > CSV > copie a URL aqui.
  // Opção B (atual / fallback): CSV versionado no próprio repositório.
  fonteAcoes:       "dados/acoes.csv",
  fonteEixos:       "dados/eixos.csv",
  fonteIndicadores: "dados/indicadores_anuais.csv",
  // Para usar o Google Sheets, troque fonteAcoes pela URL .../pub?gid=0&single=true&output=csv

  // Limites de prazo do PLS (em meses, contados da vigência salvo data explícita)
  prazos: {
    "Curtíssimo": 6,
    "Curto": 12,
    "Médio": 24,
    "Longo": 60
  },

  // Vocabulário de status
  statusValidos: ["Não iniciada","Em andamento","Concluída","Atrasada","Execução contínua","Suspensa","Não se aplica"],
  coresStatus: {
    "Concluída":          "#2e7d32",
    "Em andamento":       "#f9a825",
    "Atrasada":           "#c62828",
    "Não iniciada":       "#90a4ae",
    "Execução contínua":  "#1565c0",
    "Suspensa":           "#6a1b9a",
    "Não se aplica":      "#bdbdbd"
  }
};
