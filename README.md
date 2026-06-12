# Painel de Acompanhamento do PLS-UFSB (2022–2027)

Dashboard interativo para monitorar a execução do **Plano de Gestão de Logística Sustentável da Universidade Federal do Sul da Bahia (PLS-UFSB)**, conforme Decreto 7.746/2012 e IN MPOG 10/2012.

🔗 **Painel publicado:** `https://<usuario>.github.io/pls-ufsb-dashboard/` (após ativar GitHub Pages)

## O que ele mostra

- **KPIs gerais:** total de ações, % concluídas / em andamento / atrasadas / não iniciadas.
- **Distribuição por status** (rosca) e **status por eixo temático** (barras empilhadas).
- **Indicadores com metas anuais** (eixo Resíduos Sólidos): meta × realizado, Ano 1 a Ano 5.
- **Tabela de ações** filtrável por eixo, status e responsável, com busca e barra de execução.
- Cálculo automático de **atraso** (data-limite vencida + ação não concluída).

## Eixos monitorados (Etapa 1)

SIGS · Compras Sustentáveis · Águas e Efluentes · Resíduos Sólidos · Qualidade de Vida · Agroecologia · Arquitetura Sustentável · Biodiversidade.
*(Energia Elétrica e Mobilidade entram na revisão bienal — já aparecem como cards "previstos".)*

## Como funciona

Site estático (**HTML + CSS + JavaScript puro**), sem build e sem backend. Lê os dados de arquivos **CSV** com [PapaParse](https://www.papaparse.com/) e desenha gráficos com [Chart.js](https://www.chartjs.org/) (ambos via CDN).

```
pls-ufsb-dashboard/
├── index.html              # página principal
├── css/estilo.css
├── js/
│   ├── config.js           # fonte de dados, prazos, cores, status
│   ├── dados.js            # carga CSV + cálculo de status/atraso
│   ├── graficos.js         # gráficos Chart.js
│   └── main.js             # KPIs, filtros, tabela
├── dados/
│   ├── acoes.csv           # 186 ações extraídas do PLS
│   ├── indicadores_anuais.csv
│   └── eixos.csv
└── docs/
    ├── dicionario-de-dados.md
    ├── manual-de-atualizacao.md
    └── PLS-UFSB-Etapa1.pdf
```

## Rodar localmente

Por causa da leitura de CSV, **não** abra com duplo-clique (`file://`). Use um servidor local:

```bash
cd pls-ufsb-dashboard
python -m http.server 8000
# abra http://localhost:8000
```

## Atualizar os dados

Duas opções (ver `docs/manual-de-atualizacao.md`):

1. **Google Sheets (recomendado):** edite a planilha, publique a aba como CSV e cole a URL em `js/config.js` → `fonteAcoes`. O painel passa a refletir a planilha sem mexer no código.
2. **CSV no repositório:** edite `dados/acoes.csv` direto e dê commit (mantém histórico/auditoria das atualizações).

Os responsáveis de cada eixo alteram apenas: `status`, `percentual_execucao`, `data_atualizacao`, `evidencia`, `observacoes`.

## Origem dos dados

As 186 ações e os indicadores anuais foram **extraídos automaticamente** das tabelas dos planos de ação do PLS-UFSB (Etapa 1, versão CONSUNI). Recomenda-se revisão manual contra o PDF oficial antes da operação (conferir responsáveis, metas e prazos por eixo).

## Licença

Código sob licença MIT. Conteúdo do PLS-UFSB pertence à Universidade Federal do Sul da Bahia.
