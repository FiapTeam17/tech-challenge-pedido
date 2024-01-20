import { Before, Given, Then, When } from '@cucumber/cucumber';
import { AppModule } from '../../../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as assert from 'assert';

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

When('é enviado para {string}', async function(this: Context, rota: string) {
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

Given('os dados {string}', function(this: Context, body: string) {
  this.body = JSON.parse(body);
});
