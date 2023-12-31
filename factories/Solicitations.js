import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

const dayjs = require('dayjs');

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
        started_at: dayjs().format('YYYY-MM-DD'),
        finished_at: dayjs().add(1, 'month').format('YYYY-MM-DD'),
      },
    };

    const { body } = await request
      .post('solicitations')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload)
      .expect(201);

    this.id = body.data.id;
    this.name = body.data.attributes.name;
    this.description = body.data.attributes.description;
    this.started_at = body.data.attributes.started_at;
    this.finished_at = body.data.attributes.finished_at;
  }

  async deleteSolicitationById(id) {
    await request
      .delete(`solicitations/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(204);
  }

  async getItem(i) {
    const { body } = await request
      .get('solicitations?q[s]=created_at+desc')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    this.lastId = body.data[i].id;
  }
}

export default new Solicitations();
