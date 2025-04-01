# Teste Técnico

Este projeto implementa um aplicativo de compras de smartphones com lista de produtos, carrinho, checkout e pagamento via PIX.

## Funcionalidades Implementadas

### Funcionalidades
- **Configuração de Projeto**: 
  - Uso do Expo com TypeScript (template "tabs") para agilizar o setup e facilitar a integração de notificações.
  - Banco de dados em JSON.
- **Componente de Lista**:
  - Lista infinita de smartphones em duas colunas, exibida como cards com imagem, nome, descrição e preço.
  - Paginação com limite de 10 itens por chamada à API.
- **Push Notifications**: Configuração básica com `expo-notifications` (a ser expandida para envio real).

### Funcionalidades Adicionais
- **Detalhes do Produto**: Tela com informações completas de cada smartphone, acessada ao clicar em um card.
- **Carrinho de Compras**: Tela com lista de itens, controle de quantidade, total de itens e valor total.
- **Pagamento via PIX**: Tela de checkout com valor total e código PIX copia e cola.

## Observações

1. **Redux Toolkit**:
   - Optei pelo Redux Toolkit para gerenciar o estado do carrinho (`checkoutSlice`), pois é uma solução robusta e escalável para estado global.
   - Decidi por um slice dedicado ao checkout, com ações para adicionar, remover, atualizar quantidade e limpar o carrinho.

2. **Lista de Produtos em Duas Colunas**:
   - Usei `FlatList` com `numColumns={2}` para exibir os produtos como cards, calculando dinamicamente a largura para responsividade.
   - Priorizei um design simples e funcional, focado na usabilidade.

3. **Navegação com Expo Router**:
   - Adotei o Expo Router para uma navegação baseada em arquivos, combinando `Stack` (para telas como login e pagamento) e `Tabs` (para Home).
   - Passei dados entre telas via parâmetros serializados (JSON), como no caso dos detalhes do produto.

4. **Pagamento via PIX Simulado**:
   - Implementei uma tela de pagamento com código PIX copia e cola calculado através de uma função dedicada.
   - Adicionei funcionalidade de copiar o código e confirmação manual para simular o fluxo.

5. **Estilização**:
   - Mantive um design minimalista com cores neutras e verdes (para preços e botões), priorizando legibilidade e foco nos requisitos.

6. **Execução**:
   - O código da aplicação foi testado em simulador iOS. Em dispositivos Android pode haver bugs de interface ou similares. 

## Conclusão
O projeto oferece uma interface amigável, usável e com boa possibilidade de expansão. Por limitações de tempo, algumas funcionalidades (incluindo obrigatórias) não foram implementadas.
