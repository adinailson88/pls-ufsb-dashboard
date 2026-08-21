# Painel de Acompanhamento do PLS-UFSB (2022–2027)

Dashboard interativo para monitorar a execução do **Plano de Gestão de Logística Sustentável da Universidade Federal do Sul da Bahia (PLS-UFSB, 2022–2027)**.

O plano monitorado foi elaborado com base no Decreto nº 7.746/2012 e na Instrução Normativa SLTI/MPOG nº 10/2012, vigentes à época de sua formulação (o próprio documento do PLS-UFSB declara ter seguido "as orientações constantes na IN 10/2012... de que trata o Art. 16, do Decreto Nº 7.746, de 5 de junho de 2012"). Para elaboração, revisão e adequação de PLS no âmbito federal hoje, aplicam-se a Portaria SEGES/ME nº 8.678/2021 e a Portaria SEGES/MGI nº 5.376/2023, que instituiu o Caderno de Logística do Plano Diretor de Logística Sustentável como modelo de referência (ver [Referências normativas](#referências-normativas)).

🔗 **Painel publicado:** <https://adinailson88.github.io/pls-ufsb-dashboard/>

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

## Referências normativas

- [Portaria SEGES/ME nº 8.678, de 19 de julho de 2021](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/portarias/portaria-seges-me-no-8-678-de-19-de-julho-de-2021) — governança das contratações públicas; define o Plano Diretor de Logística Sustentável (PLS) como instrumento de governança.
- [Portaria SEGES/MGI nº 5.376, de 14 de setembro de 2023](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/portarias/portaria-seges-mgi-no-5376-de-14-de-setembro-de-2023) — institui o Caderno de Logística do PLS como modelo de referência atual para a Administração Pública Federal.
- [Instrução Normativa SLTI/MPOG nº 10, de 12 de novembro de 2012](https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-no-10-de-12-de-novembro-de-2012) — referência histórica: base normativa sob a qual o PLS-UFSB 2022–2027 foi originalmente elaborado (Decreto nº 7.746/2012, Art. 16).

## Licença

Código sob licença MIT. Conteúdo do PLS-UFSB pertence à Universidade Federal do Sul da Bahia.
