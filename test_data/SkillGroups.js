class SkillGroup {
  data() {
    const ids = {
      successfuly_id: 67,
      nonexistent_id: 99999999,
      invalid_id: 'asda@sdasd',
    };
    return ids;
  }
}

export default new SkillGroup();
