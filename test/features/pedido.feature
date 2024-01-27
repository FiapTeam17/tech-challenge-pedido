Feature: Cadastro de pedido
  Scenario Outline: Cadastro de novo Pedido faltando informações
    Given "produtos" já cadastrados com os dados:
      | nome           | valor | categoria |
      | Lanche         | 20.9  | LANCHE |
    When é enviado <body> para "pedidos"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>
    Examples:
      | body           | status | mensagem            |
      | '{}'           | '400'  | 'Produto não encontrado!' |
      | '{"itens":[]}'                    | '400'  | 'Produto não encontrado!' |
      | '{"itens":[{}]}'                    | '400'  | 'A quantidade deve ser informada!' |
      | '{"itens":[{"produtoId":"123456", "quantidade":2}]}' | '400'  | 'Produto não encontrado!' |
      | '{"itens":[{"produtoId":"1"}]}' | '400'  | 'A quantidade deve ser informada!' |
      | '{"itens":[{"produtoId":"1", "quantidade":-1}]}' | '400'  | 'A quantidade deve ser maior que zero!' |

  Scenario: Cadastro de novo Pedido
    Given "produtos" já cadastrados com os dados:
      | nome           | valor | categoria |
      | Lanche         | 20.9  | LANCHE |
      | ACOMPANHAMENTO | 5.5   | ACOMPANHAMENTO |
      | BEBIDA         | 10.5  | BEBIDA |
      | SOBREMESA      | 8.8   | SOBREMESA |
    And "clientes" já cadastrados com os dados:
      | nome    | cpf            | email       |
      | Teste | 99210154002  | teste@teste.com |
    When é enviado '{"itens":[{"produtoId":"1", "quantidade":2}]}' para "pedidos"
    Then status do retorno é '201'
    And json com "status" 0 é retornado se status 201



