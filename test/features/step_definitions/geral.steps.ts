import { Before, DataTable, Given, Then, When } from '@cucumber/cucumber';
import { AppModule } from '../../../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as assert from 'assert';

function dataTableToJson(cabecalho: string[],linha: string[]): any{
  let dado = '';
  for (let j = 0; j < linha.length; j++) {
    if(dado !== ''){
      dado += ',';
    }
    dado += `"${cabecalho[j]}":"${linha[j]}"`;
  }
  return JSON.parse(`{${dado}}`);
}

interface Context {
  app: any;
  response: request.Response;
  body: string;
}

Before(async function(this: Context) {
  let module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  this.app = module.createNestApplication();
  await this.app.init();
})

When('é enviado {string} para {string}', async function(this: Context, body: string, rota: string) {
  this.body = JSON.parse(body);
  this.response = await request(this.app.getHttpServer()).post(rota)
    .send(this.body)
    .set('Accept', 'application/json');
});

Then('a mensagem de retorno é {string}', function(this: Context, mensagem: string) {
  const resp = JSON.parse(this.response.text);
  if(mensagem == ''){
    assert.equal(resp.message, undefined);
  }else{
    assert.equal(resp.message, mensagem);
  }
});

Then('status do retorno é {string}', function(this: Context, status: string ) {
  assert.equal(this.response.status, status);
});

Given('{string} já cadastrados com os dados:', async function(rota: string, table: DataTable) {
  const linhas = table.raw();
  const cabecalho = linhas[0];
  for (let i = 1; i < linhas.length; i++) {
    const linha = linhas[i];
    const json = dataTableToJson(cabecalho, linha);
    await request(this.app.getHttpServer()).post(`/${rota}`)
      .send(json)
      .set('Accept', 'application/json')
      .expect(201);
  }
});

