import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

class rates {
  async create(evaluationId) {
    const payload = {
      rate: {
        rates_attributes: [
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8051 },
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8418 },
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8799 },
        ],
        comments_attributes: {
          text: '<p>Teste API</p>',
        },
      },
    };

    const { body } = await request
      .post(`evaluations/${evaluationId}/rates`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload)
      .expect(201);

    this.rate_1 = body.data[0].attributes.rate;
    this.rate_2 = body.data[1].attributes.rate;
    this.rate_3 = body.data[2].attributes.rate;
  }

  async getLastItem(solicitation_id) {
    const { body } = await request
      .get(`solicitations/${solicitation_id}/evaluations`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    this.evaluationId = body.data[0].id;
  }
}

export default new rates();
