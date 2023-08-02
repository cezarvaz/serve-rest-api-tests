expect.extend({
  toBeTypeOrNull(received, argument) {
    if (received === null)
      return {
        message: () =>
          `Expected ${received} not to be ${argument} type or null`,
        pass: true,
      };

    try {
      expect(received).toEqual(expect.any(argument));
      return {
        message: () =>
          `Expected ${received} not to be ${argument} type or null`,
        pass: true,
      };
    } catch (e) {
      return {
        message: () => `Expected ${received} to be ${argument} type or null`,
        pass: false,
      };
    }
  },
});
