Feature: Cadastro de Cliente
  Scenario Outline: Cadastro de novo Cliente
    When é enviado <body> para "clientes"
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
    When é enviado <body> para "clientes"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{"cpf":"99210154002"}' | '400'  | 'Cliente já cadastrado' |

    Scenario Outline: Pesquiso cliente pelos dados
      Given "clientes" já cadastrados com os dados:
        | nome    | cpf            | email       |
        | Teste | 99210154002  | teste@teste.com |
      And guardo "id" retornado
      When pesquiso rota "clientes" pelo campo <campo> e valor <valor>
      Then status do retorno é <status>
      And a mensagem de retorno é <mensagem>
      And json com "cpf" "99210154002" é retornado se status 200

      Examples:
        | campo   |   valor            | status | mensagem |
        | 'cpf'   | '9921015400'       | '400'  | 'Cliente não encontrado!' |
        | 'cpf'   | '99210154002'      | '200'  | '' |
        | 'email' | 'testes@teste.com' | '400'  | 'Cliente não encontrado!' |
        | 'email' | 'teste@teste.com'  | '200'  | '' |
        | 'id'    | '123456'           | '400'  | 'Cliente não encontrado!' |
        | 'id'    | ''                 | '200'  | '' |

    Scenario Outline: Altero cliente cadastrado
      Given "clientes" já cadastrados com os dados:
        | nome    | cpf            | email       |
        | Teste | 99210154002  | teste@teste.com |
      And guardo "id" retornado
      When altero "clientes" com <body>
      Then status do retorno é <status>
      When pesquiso rota "clientes" pelo campo "id" e valor ""
      And json com <campo> <valor> é retornado se status 200
      Examples:
      | body                                                                | campo   | valor             | status |
      | '{"cpf":"99210154002","nome":"Novo Nome","email":"teste@teste.com"}'| 'nome'  | 'Novo Nome'       | '200'  |
      | '{"cpf":"99210154002","nome":"Teste","email":"novo@teste.com"}'     | 'email' | 'novo@teste.com'  | '200'  |

