# Estado do Projeto — Painel PLS-UFSB (handoff para continuidade)

> **Para retomar este projeto em qualquer IA:** cole este arquivo no início da conversa.
> Ele resume o que existe, como foi construído e o que falta. Última atualização: **2026-06-12**.

---

## 1. O que é este projeto

Painel web interativo para acompanhar a execução do **Plano de Gestão de Logística Sustentável da UFSB (PLS-UFSB, 2022–2027)**. Os dados vêm de planilhas/CSV e são exibidos em dashboard (HTML/CSS/JS puro). Repositório no GitHub com GitHub Pages.

- **Autor/responsável:** Adinailson Guimarães de Oliveira (PPG Biossistemas/UFSB) — adinailson88@gmail.com
- **Documento-fonte:** `docs/PLS-UFSB-Etapa1.pdf` (285 páginas, versão CONSUNI Etapa 1)
- **Plano-mestre completo:** ver `../PLANO_PAINEL_PLS_UFSB.md` (fora do repositório, na pasta-mãe) — análise minuciosa do PLS + decisões de arquitetura.

## 2. Decisões já tomadas (NÃO rediscutir)

1. **Stack:** HTML5 + CSS3 + JavaScript puro (vanilla), sem framework, sem build, sem backend.
2. **Bibliotecas (via CDN):** Chart.js 4.4.1 (gráficos) e PapaParse 5.4.1 (leitura de CSV).
3. **Dados:** CSV. Fonte primária pode ser Google Sheets publicado como CSV; fallback é o CSV no repositório (`dados/`). Configurável em `js/config.js`.
4. **Hospedagem:** GitHub Pages, repositório público `pls-ufsb-dashboard`.
5. **Vocabulário de status:** Não iniciada · Em andamento · Concluída · Atrasada (derivado) · Execução contínua · Suspensa · Não se aplica.
6. **Escala de prazos do PLS:** Curtíssimo ≤6m · Curto ≤12m · Médio ≤24m · Longo ≤60m (contados de jan/2022, salvo data explícita).
7. **8 eixos na Etapa 1.** Energia Elétrica e Mobilidade ficam como cards "previstos" (não estavam na Etapa 1 do PLS).

## 3. Estrutura do repositório

```
pls-ufsb-dashboard/
├── index.html              página única do painel
├── css/estilo.css          estilos + responsivo (cards no mobile)
├── js/
│   ├── config.js           ← AQUI se troca a fonte de dados (CSV local ou URL do Sheets)
│   ├── dados.js            carga CSV, cálculo de data-limite e status "Atrasada"
│   ├── graficos.js         rosca (status), barras (status×eixo), linha (metas anuais)
│   └── main.js             KPIs, filtros, busca, tabela
├── dados/
│   ├── acoes.csv           186 ações dos 8 eixos (extraídas do PDF)
│   ├── indicadores_anuais.csv   11 indicadores do eixo Resíduos (metas Ano 1–5)
│   └── eixos.csv           metadados (cor, ícone, coordenação) dos 10 eixos
└── docs/
    ├── PLS-UFSB-Etapa1.pdf
    ├── dicionario-de-dados.md    significado de cada coluna
    ├── manual-de-atualizacao.md  como alimentar a planilha
    ├── ESTADO_DO_PROJETO.md      (este arquivo)
    ├── pls_ufsb_texto.txt        texto integral do PDF (apoio à extração)
    └── pls_tabelas_planos.txt    tabelas dos planos de ação (apoio à extração)
```

## 4. Como os dados foram gerados

As 186 ações de `acoes.csv` foram **extraídas automaticamente** (parser Python) das tabelas em `docs/pls_tabelas_planos.txt`, mapeando faixas de página → eixo:

| Eixo | Páginas PDF | Ações |
|---|---|---|
| SIGS | 39–40 | 12 |
| Compras | 50–54 | 17 |
| Águas e Efluentes | 58–66 | 49 |
| Qualidade de Vida | 134–139 | 28 |
| Agroecologia | 144–149 | 23 |
| Arquitetura Sustentável | 157–164 | 34 |
| Biodiversidade | 179–183 | 23 |

> O eixo **Resíduos Sólidos** (PDF p.104–107) usa indicadores com metas anuais, não ações soltas → está em `indicadores_anuais.csv`, não nas 186.

## 5. Status atual (o que JÁ funciona)

- ✅ Painel carrega os 3 CSVs, calcula KPIs e desenha 3 gráficos.
- ✅ Status "Atrasada" derivado automaticamente (data-limite vencida + não concluída).
- ✅ Tabela com filtros (eixo, status, responsável), busca e barra de execução.
- ✅ Responsivo (vira cards no celular). Testado em servidor local, sem erros de console.
- ✅ Todas as ações começam com status "Não iniciada" (por isso o painel mostra ~88% "Atrasada" — datas de 2022 já venceram; muda conforme forem atualizadas).

## 6. O que FALTA / próximos passos (backlog)

- [ ] **Revisão manual de `acoes.csv`** contra o PDF: conferir `responsavel`, `meta` e `objetivo` (o parser acerta ação/prazo/indicador, mas em linhas com formatação irregular o responsável pode estar deslocado). Preencher coluna `objetivo` (hoje vazia).
- [ ] **Conectar ao Google Sheets:** importar os CSVs numa planilha, publicar como CSV e colar a URL em `js/config.js → fonteAcoes` (instruções em `manual-de-atualizacao.md`).
- [ ] **Página por eixo** com modal de detalhe de cada ação (indicador, meta, recursos, evidência, histórico).
- [ ] **Visão de prazos** (Gantt simples / "próximas a vencer" e "vencidas").
- [ ] **Visão de responsáveis** (nº de ações por unidade — "quem deve o quê").
- [ ] Incluir eixos **Energia Elétrica** e **Mobilidade** quando entrarem na revisão bienal.
- [ ] Opcional: integrar séries de consumo de água/energia (monitoramento DINFRA) se disponibilizadas.

## 7. Como rodar e publicar

```bash
# rodar local (NÃO abrir com file:// — o CSV não carrega)
cd pls-ufsb-dashboard
python -m http.server 8000   # http://localhost:8000

# publicar: Settings → Pages → branch main → /(root)
# painel: https://adinailson88.github.io/pls-ufsb-dashboard/
```

## 8. Prompt sugerido para retomar em outra IA

> "Estou desenvolvendo um painel de acompanhamento do PLS-UFSB. Anexo o arquivo docs/ESTADO_DO_PROJETO.md com todo o contexto e as decisões já tomadas. O repositório é HTML/CSS/JS puro com dados em CSV. Quero agora implementar [tarefa do backlog]. Mantenha as decisões da seção 2 e o vocabulário de status da seção 5."
