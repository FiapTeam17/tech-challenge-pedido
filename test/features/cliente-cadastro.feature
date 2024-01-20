Feature: Cadastro de Cliente
  Scenario Outline: Cadastro de novo Cliente
    Given os dados <body>
    When é enviado para "/clientes"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'CPF é obrigatório' |
      | '{"cpf":"55887839058"}' | '201'  | '' |
