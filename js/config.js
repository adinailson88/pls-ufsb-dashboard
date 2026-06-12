// Configuração central do painel PLS-UFSB
window.PLS_CONFIG = {
  // Vigência oficial do PLS (Decreto 7.746/2012 + IN MPOG 10/2012)
  vigenciaInicio: "2022-01-01",
  vigenciaFim: "2027-12-31",
  revisoesBienais: ["2024-01-01", "2026-01-01"],

  // FONTE DE DADOS
  // Planilha Google: https://docs.google.com/spreadsheets/d/1zZ8-ACC8T2tLM_S3xXjR-s-0kNVbemDACiOPdAA5xm8/edit
  // Abas esperadas: ACOES (gid 0), INDICADORES_ANUAIS (gid 101), EIXOS (gid 102).
  // Para o GitHub Pages conseguir ler, publique cada aba na web como CSV
  // ou deixe a planilha acessível publicamente para leitura.
  fonteAcoes:       "https://docs.google.com/spreadsheets/d/1zZ8-ACC8T2tLM_S3xXjR-s-0kNVbemDACiOPdAA5xm8/export?format=csv&gid=0",
  fonteEixos:       "https://docs.google.com/spreadsheets/d/1zZ8-ACC8T2tLM_S3xXjR-s-0kNVbemDACiOPdAA5xm8/export?format=csv&gid=102",
  fonteIndicadores: "https://docs.google.com/spreadsheets/d/1zZ8-ACC8T2tLM_S3xXjR-s-0kNVbemDACiOPdAA5xm8/export?format=csv&gid=101",

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
