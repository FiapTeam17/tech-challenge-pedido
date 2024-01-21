Feature: Cadastro de Produto
  Scenario Outline: Cadastro de novo Produto
    When é enviado <body> para "/produtos"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'Nome é obrigatório' |
      | '{"nome":"teste"}'      | '400'  | 'Valor é obrigatório' |
      | '{"nome":"teste", "valor": -1}' | '400'  | 'Valor deve ser maior que zero' |
      | '{"nome":"teste", "valor":5.5}' | '400'  | 'Categoria é obrigatória' |
      | '{"nome":"teste", "valor":5.5, "categoria":"LANCHE"}' | '201'  | '' |

#  Scenario Outline: Altero produto existente
#    Given "produtos" já cadastrados com os dados:
#      | nome   | valor | categoria |
#      | Lanche | 10.5  | LANCHE |
#    When é enviado <body> para "/produtos"
#    Then status do retorno é <status>
#    And a mensagem de retorno é <mensagem>
#
#    Examples:
#      | body                    | status | mensagem            |
#      | '{"nome":"teste", "valor":5.5, "categoria":"LANCHE"}' | '400'  | 'Cliente já cadastrado' |
