import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 4, action: Action.Subtract, expected: -2 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },

  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },

  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: 0, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 0.5, action: Action.Exponentiate, expected: 1 },
  { a: 4, b: 0.5, action: Action.Exponentiate, expected: 2 },

  { a: 4, b: 0.5, action: Action.Exponentiate, expected: 2 },
  { a: 4, b: 0.5, action: Action.Exponentiate, expected: 2 },

  { a: 4, b: 0.5, action: 123, expected: null },
  { a: 4, b: 'invalid', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
