import fakerBr from 'faker-br';

const randomNumber = fakerBr.random.number({ max: 999999999 });

class Solicitations {
  postPayload() {
    const payload = {
      solicitation: {
        name: `${randomNumber}Solicitação Criada pela Automação`,
      },
    };

    return payload;
  }

  existingName() {
    const payload = {
      solicitation: {
        name: 'teste',
      },
    };

    return payload;
  }

  emptyName() {
    const payload = {
      solicitation: {
        name: '',
      },
    };

    return payload;
  }
}

export default new Solicitations();
