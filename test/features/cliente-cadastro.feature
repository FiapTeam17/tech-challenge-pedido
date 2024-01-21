Feature: Cadastro de Cliente
  Scenario Outline: Cadastro de novo Cliente
    When é enviado <body> para "/clientes"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'CPF é obrigatório' |
      | '{"cpf":"55887839058"}' | '201'  | '' |

  Scenario Outline: Valido cliente existente
    Given "clientes" já cadastrados com os dados:
      | nome    | cpf            | email       |
      | Teste | 99210154002  | teste@teste.com |
    When é enviado <body> para "/clientes"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{"cpf":"99210154002"}' | '400'  | 'Cliente já cadastrado' |
