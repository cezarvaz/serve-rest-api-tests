import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class SolicitationsEvaluations {
  async create(solicitation_id) {
    const payload = {
      evaluation: {
        evaluators: [
          {
            evaluator_id: 518433,
            evaluator_name: 'LIDER API',
            evaluator_email: 'maite-barros76@fojsc.unesp.br',
          },
        ],
        evaluateds: [
          {
            evaluated_id: 518435,
            evaluated_name: 'Sebastião Yago Moura',
            position_id: 181842,
          },
          {
            evaluated_id: 518434,
            evaluated_name: 'Isabelle Maya Maya Barros',
            position_id: 181842,
          },
        ],
        moderated: false,
        self_evaluation: false,
      },
    };

    const { body } = await request
      .post(`solicitations/${solicitation_id}/evaluations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload)
      .expect(201);

    this.evaluationsId = body.data[0].id;
  }
}

export default new SolicitationsEvaluations();
