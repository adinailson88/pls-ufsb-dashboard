# Manual de atualização do painel

## Opção 1 — Planilha no Google Sheets (recomendada)

1. Crie uma planilha "PLS-UFSB — Acompanhamento" com 3 abas: **ACOES**, **INDICADORES_ANUAIS**, **EIXOS**.
2. Importe os arquivos `dados/*.csv` para as abas correspondentes (Arquivo → Importar).
3. Publique cada aba: **Arquivo → Compartilhar → Publicar na web → escolha a aba → CSV → Publicar**. Copie a URL gerada.
4. Em `js/config.js`, substitua o valor de `fonteAcoes` (e, se quiser, `fonteEixos`/`fonteIndicadores`) pela URL publicada.
5. A partir daí, **basta editar a planilha** — o painel reflete as mudanças ao recarregar a página. Não precisa mexer no código.

### Quem atualiza o quê
Cada responsável de eixo edita, na aba ACOES, apenas as colunas:
`status`, `percentual_execucao`, `data_atualizacao`, `evidencia`, `observacoes`.
As demais colunas (transcritas do PLS) permanecem fixas.

### Valores válidos de `status`
`Não iniciada` · `Em andamento` · `Concluída` · `Atrasada` (calculado automaticamente) · `Execução contínua` · `Suspensa` · `Não se aplica`.

## Opção 2 — CSV versionado no GitHub (histórico/auditoria)

1. Edite `dados/acoes.csv` (no GitHub web: botão de lápis, ou localmente).
2. Faça commit com mensagem descritiva (ex.: "atualiza status do eixo Águas — jun/2026").
3. Cada commit vira um registro auditável da evolução do plano.

> **Boa prática:** mesmo usando o Google Sheets, exporte o CSV mensalmente para `dados/` e dê commit. Assim a planilha é o operacional do dia a dia e o repositório guarda o histórico mês a mês.

## Rotina mensal sugerida
1. Coletar atualizações dos responsáveis de cada eixo.
2. Lançar na planilha (status, %, data, evidência).
3. Conferir o painel (KPIs e atrasos).
4. Exportar CSV → commit no repositório.
5. Reportar à ASSUS/CPS os destaques do mês (concluídas e atrasadas).
