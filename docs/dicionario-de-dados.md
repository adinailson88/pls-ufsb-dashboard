# Dicionário de dados

## `dados/acoes.csv` — uma linha por ação/etapa do PLS

| Coluna | Tipo | Quem preenche | Descrição |
|---|---|---|---|
| `id` | texto único | fixo | Código da ação (ex.: `AGU-12`). Prefixos: SIGS, COMP, AGU, RES, QV, AGRO, ARQ, BIO |
| `eixo` | lista | fixo | Eixo temático |
| `objetivo` | texto | fixo | Objetivo ao qual a ação pertence (opcional) |
| `foco_estrategico` | texto | fixo | Foco estratégico (opcional) |
| `acao` | texto | fixo | Descrição da ação/etapa |
| `responsavel` | texto | fixo | Unidades responsáveis, separadas por `;` |
| `prazo_categoria` | lista | fixo | Curtíssimo / Curto / Médio / Longo (ou faixas "Curto a Médio") |
| `prazo_qualificador` | lista | fixo | contínuo / periódico / permanente (opcional) |
| `data_limite` | data ISO | fixo/opcional | Data explícita, se houver. Senão é calculada da categoria |
| `indicador` | texto | fixo | Indicador de monitoramento |
| `meta` | texto | fixo | Meta da ação (ex.: "100%") |
| `recursos` | texto | fixo | Recursos financeiros/não financeiros |
| **`status`** | lista | **gestor/responsável** | Não iniciada / Em andamento / Concluída / Atrasada / Execução contínua / Suspensa / Não se aplica |
| **`percentual_execucao`** | 0–100 | **gestor/responsável** | % de execução |
| **`data_atualizacao`** | data ISO | **gestor/responsável** | Data da última atualização |
| **`evidencia`** | texto/URL | **gestor/responsável** | Link de portaria, notícia, relatório |
| **`observacoes`** | texto | **gestor/responsável** | Notas livres |
| `campus` | lista | fixo | Todos / CJA / CSC / CPF / Reitoria / CUNI |

> **Regra de atraso (automática, no JS):** se `data_limite < hoje` e `status` não for Concluída/Execução contínua/Suspensa/Não se aplica → exibido como **Atrasada**. Ações contínuas/permanentes nunca ficam atrasadas por data.

> **Cálculo de `data_limite`:** quando vazia, o painel soma à vigência (jan/2022) os meses da categoria: Curtíssimo=6, Curto=12, Médio=24, Longo=60. Em faixas ("Curto a Médio") usa o maior prazo.

## `dados/indicadores_anuais.csv` — eixo Resíduos (metas Ano 1–5)

`id_indicador, eixo, indicador, formula, ano1_meta, ano1_real, … ano5_meta, ano5_real, fonte`
Colunas `anoN_real` são preenchidas pelo gestor a cada ano.

## `dados/eixos.csv` — metadados dos eixos

`eixo, cor_hex, icone, descricao_curta, unidade_coordenadora`
