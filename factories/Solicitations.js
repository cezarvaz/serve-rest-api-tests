import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

class Solicitations {
  async create() {
    const payload = {
      solicitation: {
        name: `Solicitation_${fakerBr.random.number({
          max: 999999999999,
        })}_criada pela automação de testes de API`,
        description: fakerBr.random.words(),
        started_at: '2029-11-21',
        finished_at: '2029-12-29',
      },
    };

    const { body } = await request
      .post('solicitations')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload)
      .expect(201);

    this.id = body.data.id;
  }
}

export default new Solicitations();
