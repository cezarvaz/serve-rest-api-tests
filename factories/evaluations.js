import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class Evaluations {
  async getEvaluations() {
    const { body } = await request
      .get(`evaluations?q[evaluator_id_eq]=518433`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    this.IdEvaluation = body.data[0].id;
    this.solicitationId = body.data[0].attributes.solicitation_id;
    this.evaluatorId = body.data[0].attributes.evaluator_id;
    this.evaluatedId = body.data[0].attributes.evaluated_id;
  }
}

export default new Evaluations();
