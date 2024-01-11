Feature: Cadastro de Cliente
  Scenario: Valida dados obrigatórios
    When é enviado dados incompletos do "/clientes"
    Then status do retorno é "400"
    And a mensagem de retorno é "CPF é obrigatório"
