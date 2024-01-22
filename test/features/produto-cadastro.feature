Feature: Cadastro de Produto
  Scenario Outline: Cadastro de novo Produto
    When é enviado <body> para "produtos"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'Nome é obrigatório' |
      | '{"nome":"teste"}'      | '400'  | 'Valor é obrigatório' |
      | '{"nome":"teste", "valor": -1}' | '400'  | 'Valor deve ser maior que zero' |
      | '{"nome":"teste", "valor":5.5}' | '400'  | 'Categoria é obrigatória' |
      | '{"nome":"teste", "valor":5.5, "categoria":"LANCHE"}' | '201'  | '' |

  Scenario Outline: Pesquiso produto pela categoria
    Given "produtos" já cadastrados com os dados:
      | nome           | valor | categoria |
      | Lanche         | 20.9  | LANCHE |
      | ACOMPANHAMENTO | 5.5   | ACOMPANHAMENTO |
      | BEBIDA 1       | 10.5  | BEBIDA |
      | BEBIDA 2       | 10.5  | BEBIDA |
      | SOBREMESA      | 8.8   | SOBREMESA |
    When pesquiso rota "produtos" pelo campo <campo> e valor <valor>
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>
    And a quantidade de registros retornados é <qtd>

    Examples:
      | campo          |   valor   | status | mensagem                  | qtd |
      | 'categoria'   | 'BEBIDAS' | '400'  | 'Categoria Inválida'       | 0   |
      | 'categoria'   | 'BEBIDA'  | '200'  | ''                         | 2   |

  Scenario Outline: Pesquiso produto pelo Id
    Given "produtos" já cadastrados com os dados:
      | nome           | valor | categoria |
      | Lanche         | 20.9  | LANCHE |
    And guardo "id" retornado
    When pesquiso rota "produtos" pelo campo <campo> e valor <valor>
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>
    And json com "nome" Lanche é retornado se status 200

    Examples:
      | campo          |   valor   | status | mensagem                  |
      | 'id'           | '123456'  | '400'  | 'Produto não encontrado!' |
      | 'id'           | ''        | '200'  | ''                        |

  Scenario Outline: Altero produto existente
    Given "produtos" já cadastrados com os dados:
      | nome   | valor | categoria |
      | Lanche | 10.5  | LANCHE |
    And guardo "id" retornado
    When altero "produtos" com <body>
    Then status do retorno é <status>
    When pesquiso rota "produtos" pelo campo "id" e valor ""
    And json com <campo> <valor> é retornado se status 200
    Examples:
      | body                                                      | campo   | valor      | status |
      | '{"nome":"Novo Nome", "valor":10.5, "categoria":"LANCHE"}'| 'nome'  | Novo Nome  | '200'  |
      | '{"nome":"Lanche", "valor":5.5, "categoria":"LANCHE"}'    | 'valor' | 5.5        | '200'  |
      | '{"nome":"Lanche", "valor":10.5, "categoria":"BEBIDA"}'   | 'categoria' | BEBIDA | '200'  |

    Scenario: Excluo produto cadastrado
      Given "produtos" já cadastrados com os dados:
        | nome   | valor | categoria |
        | Lanche | 10.5  | LANCHE |
      And guardo "id" retornado
      When excluo "produtos"
      When pesquiso rota "produtos" pelo campo "id" e valor ""
      Then status do retorno é "400"
      And a mensagem de retorno é "Produto não encontrado!"
