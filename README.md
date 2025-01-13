# E-commerce API

Esta API permite gerenciar categorias, produtos e pedidos em um sistema de e-commerce. A seguir, são detalhadas as rotas e os métodos suportados pela API.

## Endpoints

### Categories

- **POST /categories**
  - Cria uma nova categoria.
  - **Body**:
    ```json
    {
      "name": "Movies"
    }
    ```

- **GET /categories**
  - Recupera todas as categorias.

- **GET /categories/:categoryId**
  - Recupera uma categoria específica pelo ID.

- **PATCH /categories/:categoryId**
  - Atualiza uma categoria pelo ID.
  - **Body**:
    ```json
    {
      "name": "Updated Movies"
    }
    ```

- **DELETE /categories/:id**
  - Deleta uma categoria pelo ID.

### Orders

- **POST /orders**
  - Cria um novo pedido.
  - **Body**:
    ```json
    {
      "date": "2025-01-12T12:34:56.789Z",
      "productIds": ["{{productId}}"],
      "total": 2599.98
    }
    ```

- **GET /orders**
  - Recupera todos os pedidos.

- **GET /orders/:orderId**
  - Recupera um pedido específico pelo ID.

- **PATCH /orders/:orderId**
  - Atualiza um pedido específico.
  - **Body**:
    ```json
    {
      "total": 2799.98
    }
    ```

- **DELETE /orders/:orderId**
  - Deleta um pedido específico pelo ID.

### Products

- **POST /products**
  - Cria um novo produto.
  - **Body**:
    ```json
    {
      "name": "Laptop",
      "description": "A high-performance laptop",
      "price": 1299.99,
      "categoryIds": ["{{categoryId}}"],
      "imageUrl": "https://s3.amazonaws.com/bucket-name/laptop.jpg"
    }
    ```

- **GET /products**
  - Recupera todos os produtos.

- **GET /products/:productId**
  - Recupera um produto específico pelo ID.

- **PATCH /products/:productId**
  - Atualiza um produto específico.
  - **Body**:
    ```json
    {
      "price": 1399.99
    }
    ```

- **DELETE /products/:productId**
  - Deleta um produto específico pelo ID.

### Dashboard

- **GET /dashboard/metrics**
  - Recupera as métricas de vendas com base em uma categoria e intervalo de datas.
  - **Query Parameters**:
    - `categoryId` (opcional)
    - `startDate` (opcional)
    - `endDate` (opcional)

## Variáveis

A API utiliza variáveis para facilitar o teste das rotas no Postman. As variáveis são:

- `categoryId`: ID da categoria.
- `productId`: ID do produto.
- `orderId`: ID do pedido.

## Testes Automatizados

A API possui scripts automatizados no Postman para realizar testes após a execução de cada requisição. Esses testes incluem a configuração de variáveis de resposta, como `categoryId`, `productId` e `orderId`, que são armazenadas como variáveis de coleção.

## Ambiente de Desenvolvimento

1. Clone o repositório.
2. Instale as dependências.
3. Execute a API localmente no servidor `localhost` na porta `3000`.

```bash
npm install
npm start
```
Agora você pode interagir com os endpoints da API e realizar os testes no Postman.

## Contribuições
Sinta-se à vontade para fazer contribuições! Abra um Pull Request ou reporte um problema.

## Licença
Este projeto é licenciado sob a MIT License.
```
Esse `README.md` inclui os detalhes principais da API, incluindo as rotas, métodos, variáveis e um guia básico de como testar os endpoints com o Postman.

```