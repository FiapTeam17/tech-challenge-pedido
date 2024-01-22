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
  campo: any;
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
  this.response = await request(this.app.getHttpServer()).post(`/${rota}`)
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

Given('{string} já cadastrados com os dados:', async function(this: Context, rota: string, table: DataTable) {
  const linhas = table.raw();
  const cabecalho = linhas[0];
  for (let i = 1; i < linhas.length; i++) {
    const linha = linhas[i];
    const json = dataTableToJson(cabecalho, linha);
    this.response = await request(this.app.getHttpServer()).post(`/${rota}`)
      .send(json)
      .set('Accept', 'application/json')
      .expect(201);
  }
});

When('pesquiso rota {string} pelo campo {string} e valor {string}', async function(this: Context, rota: string, campo: string, valor: string) {
  let url = `/${rota}/${campo}/${valor}`;
  if(campo === 'id'){
    url = `/${rota}/${valor !== '' ? valor : this.campo}`;
  }

  this.response = await request(this.app.getHttpServer()).get(url);
});

Then('json com {string} {} é retornado se status {int}', function(this: Context, campo: string, valor: any, status: number) {
  if(this.response.status === status){
    const resp = JSON.parse(this.response.text);
    assert.equal(resp[campo], valor);
  }
});

When(/^guardo "([^"]*)" retornado$/, function(this: Context, campo: string) {
  const resp = JSON.parse(this.response.text);
  this.campo = resp[campo];
});

When('altero {string} com {string}', async function(this: Context, rota: string, body: string) {
  this.body = JSON.parse(body);
  this.response = await request(this.app.getHttpServer()).put(`/${rota}/${this.campo}`)
    .send(this.body)
    .set('Accept', 'application/json');
});

Then('a quantidade de registros retornados é {}', function(this: Context, qtd: number) {
  const resp = JSON.parse(this.response.text);
  const retorno = resp.length ? resp.length : 0;
  assert.equal(retorno, qtd);
});

When('excluo {string}', async function(this: Context, rota: string) {
  this.response = await request(this.app.getHttpServer()).delete(`/${rota}/${this.campo}`);
});
