# Activity Provider: Three-Way Match

Activity Provider para a arquitetura Inven!RA, desenvolvido no âmbito da UC de Arquitetura e Padrões de Software (MEIW, 2026/2027).

A atividade é um simulador de three-way match: o aluno compara encomenda, entrada de mercadoria e fatura, assinala as discrepâncias (preço, quantidade, IVA) e decide se a fatura é bloqueada ou libertada para pagamento.

## Como correr

```bash
npm install
npm start
```

O servidor arranca na porta `3000` (ou na definida em `PORT`).

## Pedidos da Inven!RA

| Serviço | Método e caminho | Estado |
|---|---|---|
| Página de configuração (`config_url`) | `GET /configuracao` | feito |
| Lista de parâmetros (`json_params_url`) | `GET /json-params` | feito |
| Deploy (`user_url`) | `GET /deploy?activityID=...` | feito |
| Lista de analytics (`analytics_list_url`) | `GET /lista-analytics` | feito |
| Analytics (`analytics_url`) | `POST /analytics` | feito |
| Provide activity | `POST /atividade/{activityID}` | fora desta fase |

A página principal (`GET /`) lista os endpoints, com links para os pedidos GET.

### Deploy

Recebe o `activityID` da instância, regista-a e devolve em texto simples o URL de acesso: `/atividade/{activityID}`. Um `activityID` repetido devolve o mesmo URL. Sem `activityID` (ou vazio) responde `400`.

### Parâmetros de configuração

Todos `text/plain`, com estes valores por omissão: `toleranciaPreco` (5), `toleranciaQuantidade` (5), `numeroCasos` (3), `percentagemDiscrepancias` (40). A lista está definida num só sítio (`src/configManager.js`) e dela saem a página de configuração e o JSON de parâmetros, para os nomes nunca divergirem.

## Estrutura

```
src/
  server.js          arranque do servidor
  app.js             liga os componentes
  controller.js      Controlador Web: rotas e HTTP, sem regras de negócio
  indexPage.js       página principal com a lista de endpoints
  configManager.js   Gestor de Configuração: página e lista de parâmetros
  analyticsManager.js Gestor de Analytics: lista de analytics e dados de exemplo
  instanceManager.js Gestor de Instâncias: deploy
  repository.js      Repositório (em memória)
docs/                diagramas e documentos
```

Os gestores não conhecem HTTP nem URLs: devolvem dados e o controlador responde. O Repositório é só guardar e procurar, e esconde o armazenamento atrás de um conjunto fixo de métodos, para o poder trocar sem mexer nos gestores. Em JavaScript esta interface é só uma convenção.

## Decisões

- Express, em Node.
- O URL do deploy é construído a partir do domínio do pedido (`trust proxy` ligado), por isso não é preciso configurar o domínio.
- O Repositório é em memória nesta fase. As instâncias perdem-se num reinício, o que não afeta a semana 1 porque nada depende delas. A persistência fica para quando houver tentativas reais.
- Erros: `400` para pedidos mal formados; o resto fica com o `404` do Express.