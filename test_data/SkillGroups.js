import fakerBr from 'faker-br';
const number = fakerBr.random.number({ max: 5000 });

class SkillGroup {
  id() {
    const ids = {
      successful_id: 67,
      nonexistent_id: 99999999,
      invalid_id: 'asda@sdasd',
    };
    return ids;
  }

  postPayload() {
    const payload = {
      skill_group: {
        name: `${number}_Teste_API`,
      },
    };
    return payload;
  }

  putPayload() {
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
