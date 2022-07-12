import fakerBr from 'faker-br';
const number = fakerBr.random.number({ max: 5000 });

class SkillGroup {
  id() {
    const ids = {
      successfuly_id: 67,
      nonexistent_id: 99999999,
      invalid_id: 'asda@sdasd',
    };
    return ids;
  }

  payload_post() {
    const payload = {
      skill_group: {
        name: `${number}_Teste_API`,
      },
    };
    return payload;
  }
  payload_put() {
    const payload = {
      skill_group: {
        name: `${number}_Teste_API`,
        archived: true,
      },
    };
    return payload;
  }
}

export default new SkillGroup();
