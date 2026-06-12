# 🔄 CONTINUAR O PROJETO — Painel PLS-UFSB

> **Cole este arquivo inteiro no início de uma conversa com qualquer IA para retomar o projeto.**
> Ele é autossuficiente: contexto + decisões + estado atual + próximo objetivo (planilha ao vivo).
> Atualizado em **2026-06-12**.

---

## 0. Resumo de uma linha

Painel web (HTML/CSS/JS puro) que acompanha a execução do **Plano de Logística Sustentável da UFSB (PLS-UFSB 2022–2027)**; os dados ficam numa planilha/CSV e o site exibe KPIs, gráficos e tabela filtrável.

- **Repositório (privado):** https://github.com/adinailson88/pls-ufsb-dashboard
- **Responsável:** Adinailson Guimarães de Oliveira (PPG Biossistemas/UFSB) — adinailson88@gmail.com
- **Já está pronto e funcionando** um MVP com 186 ações reais extraídas do PDF.

---

## 1. Decisões tomadas (NÃO rediscutir)

| # | Decisão |
|---|---|
| 1 | Stack: **HTML5 + CSS3 + JavaScript puro**, sem framework, sem build, sem backend |
| 2 | Bibliotecas via CDN: **Chart.js 4.4.1** + **PapaParse 5.4.1** |
| 3 | Dados em **CSV**; fonte pode ser **Google Sheets publicado** ou CSV no repositório (configurável) |
| 4 | Hospedagem: **GitHub Pages**, repo `pls-ufsb-dashboard` |
| 5 | Status: Não iniciada · Em andamento · Concluída · Atrasada (derivado) · Execução contínua · Suspensa · Não se aplica |
| 6 | Prazos PLS: Curtíssimo ≤6m · Curto ≤12m · Médio ≤24m · Longo ≤60m (de jan/2022) |
| 7 | 8 eixos na Etapa 1; Energia e Mobilidade como cards "previstos" |

## 2. Estrutura do repositório

```
pls-ufsb-dashboard/
├── index.html
├── css/estilo.css
├── js/
│   ├── config.js   ← TROCAR A FONTE DE DADOS AQUI (CSV local ↔ URL do Google Sheets)
│   ├── dados.js    carga CSV (PapaParse) + cálculo de data-limite e status "Atrasada"
│   ├── graficos.js rosca (status), barras (status×eixo), linha (metas anuais)
│   └── main.js     KPIs, filtros, busca, tabela
├── dados/
│   ├── acoes.csv             186 ações dos 8 eixos
│   ├── indicadores_anuais.csv 11 indicadores do eixo Resíduos (metas Ano 1–5)
│   └── eixos.csv              metadados dos eixos
└── docs/
    ├── PLS-UFSB-Etapa1.pdf
    ├── ESTADO_DO_PROJETO.md   handoff detalhado (origem dos dados, backlog)
    ├── dicionario-de-dados.md
    ├── manual-de-atualizacao.md
    ├── pls_ufsb_texto.txt / pls_tabelas_planos.txt  (apoio à extração)
```

## 3. O que já funciona ✅

- Carrega os 3 CSVs, calcula KPIs e desenha 3 gráficos sem erro.
- Status **"Atrasada"** calculado automaticamente (data-limite vencida + ação não concluída).
- Tabela filtrável por eixo/status/responsável + busca + barra de % execução.
- Responsivo (vira cards no celular). Testado em servidor local.
- Todas as ações começam como "Não iniciada" (por isso ~88% aparecem "Atrasada" — datas de 2022 já venceram; muda conforme atualizar).

---

## 4. 🎯 PRÓXIMO OBJETIVO — Planilha do Google que conversa AO VIVO com o site

**Meta:** editar a planilha no Google Drive → o site reflete a mudança ao recarregar a página, **sem mexer no código**.

### 4.1 Como funciona (conceito)

O site não "conversa" com a planilha em tempo real instantâneo; ele **lê** um CSV que o Google publica a partir da planilha. O fluxo é:

```
Você edita a planilha  →  Google republica o CSV (cache ~5 min)  →  visitante recarrega o site  →  PapaParse baixa o CSV  →  painel atualiza
```

Isto é leitura **unidirecional** (planilha → site). É exatamente o que você pediu: edita na planilha, o site mostra. (O site não escreve de volta na planilha — isso exigiria backend/Apps Script e não é necessário.)

### 4.2 Passo a passo

**A) Criar a planilha**
1. No Google Drive: **Novo → Planilha Google** → nome "PLS-UFSB — Acompanhamento".
2. Criar 3 abas (renomear na parte de baixo): `ACOES`, `INDICADORES_ANUAIS`, `EIXOS`.
3. Em cada aba: **Arquivo → Importar → Fazer upload** → o CSV correspondente de `dados/` → "Substituir planilha atual" / "Inserir novas planilhas" conforme o caso. (Importe `acoes.csv` na aba ACOES, etc.)

**B) Publicar cada aba como CSV**
4. **Arquivo → Compartilhar → Publicar na Web**.
5. Em "Vincular": escolha a aba **ACOES** e o formato **Valores separados por vírgula (.csv)**.
6. Clique **Publicar** e copie a URL. Ela tem este formato:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-xxxxxxxx/pub?gid=0&single=true&output=csv
   ```
7. Repita para `INDICADORES_ANUAIS` e `EIXOS` (cada aba gera uma URL com `gid` diferente).

**C) Apontar o site para as URLs**
8. Editar `js/config.js` e substituir:
   ```js
   fonteAcoes:       "dados/acoes.csv",
   fonteEixos:       "dados/eixos.csv",
   fonteIndicadores: "dados/indicadores_anuais.csv",
   ```
   pelas URLs publicadas:
   ```js
   fonteAcoes:       "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv",
   fonteEixos:       "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=111&single=true&output=csv",
   fonteIndicadores: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=222&single=true&output=csv",
   ```
9. Commit + push. Pronto: a partir daí, **editar a planilha basta** — o código não muda mais.

### 4.3 Pontos de atenção (importante para a IA que continuar)

- **Cache de ~5 min:** o CSV publicado do Google demora alguns minutos para refletir a edição. Não é bug. Para forçar atualização sem cache no fetch, pode-se anexar `&_=${Date.now()}` à URL no `dados.js`.
- **Cabeçalhos das colunas devem ser idênticos** aos do CSV (mesmos nomes, mesma ordem não é obrigatória pois o PapaParse usa `header:true`). Ver `docs/dicionario-de-dados.md`.
- **Quem edita só mexe em:** `status`, `percentual_execucao`, `data_atualizacao`, `evidencia`, `observacoes`. As demais colunas (transcritas do PLS) ficam fixas. Sugestão: proteger as colunas fixas na planilha (Dados → Proteger intervalos).
- **Validação de dados na planilha:** criar lista suspensa (Dados → Validação) na coluna `status` com os 7 valores válidos, evitando erros de digitação.
- **Privacidade:** "Publicar na web" expõe o CSV por link mesmo com o repo privado. Como são dados institucionais do PLS (sem dados pessoais sensíveis), é aceitável; se preferir, restrinja por aqui depois.

### 4.4 Melhorias opcionais ligadas à planilha (backlog)

- [ ] Mostrar no rodapé do site a **data/hora da última carga** e um botão "Atualizar agora" (refaz o fetch).
- [ ] Auto-refresh a cada N minutos (`setInterval` no `main.js`).
- [ ] Indicador visual "dados vindos da planilha ao vivo" vs "CSV local".
- [ ] Aba `LOG` na planilha registrando quem atualizou o quê (trilha simples).

---

## 5. Backlog geral (além da planilha)

- [ ] **Revisar `acoes.csv` contra o PDF**: conferir `responsavel`, `meta`; preencher `objetivo` (hoje vazio). O parser acerta ação/prazo/indicador, mas pode ter deslocado o responsável em linhas de formatação irregular.
- [ ] Página por eixo com **modal de detalhe** da ação (indicador, meta, recursos, evidência).
- [ ] Visão de **prazos** (Gantt simples; "próximas a vencer" e "vencidas").
- [ ] Visão de **responsáveis** ("quem deve o quê").
- [ ] Incluir eixos **Energia Elétrica** e **Mobilidade** na revisão bienal.

## 6. Como rodar e publicar

```bash
# rodar local (NÃO abrir com file:// — o CSV não carrega)
cd pls-ufsb-dashboard
python -m http.server 8000      # http://localhost:8000

# publicar o site: Settings → Pages → branch main → /(root)
#   (repo privado + Pages exige GitHub Pro; no plano free, tornar o repo público)
```

## 7. Prompt pronto para retomar em outra IA

> "Estou desenvolvendo um painel de acompanhamento do PLS-UFSB (repositório HTML/CSS/JS puro com dados em CSV). Anexo o arquivo `CONTINUAR_PROJETO.md` com todo o contexto e as decisões já tomadas. Quero agora **[escolha: conectar a planilha do Google ao site / revisar o acoes.csv / criar a página por eixo / etc.]**. Respeite as 7 decisões da seção 1 e o vocabulário de status da seção 1. Não reescreva o que já funciona (seção 3)."
