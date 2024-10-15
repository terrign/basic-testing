import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
    expect(simpleCalculator({ a: 123, b: 9823, action: Action.Add })).toEqual(
      9946,
    );
    expect(
      simpleCalculator({ a: 0.1, b: 0.2, action: Action.Add }),
    ).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toEqual(
      -1,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Subtract })).toEqual(
      -2,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toEqual(
      2,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toEqual(
      0,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toEqual(
      0.5,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toEqual(0);

    expect(simpleCalculator({ a: 0, b: 0, action: Action.Divide })).toEqual(
      NaN,
    );

    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toEqual(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate }),
    ).toEqual(1);

    expect(
      simpleCalculator({ a: 0, b: 2, action: Action.Exponentiate }),
    ).toEqual(0);

    expect(
      simpleCalculator({ a: 0, b: 0, action: Action.Exponentiate }),
    ).toEqual(1);

    expect(
      simpleCalculator({ a: 1, b: 0.5, action: Action.Exponentiate }),
    ).toEqual(1);

    expect(
      simpleCalculator({ a: 4, b: 0.5, action: Action.Exponentiate }),
    ).toEqual(2);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 4, b: 0.5, action: 123 })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'asd', b: 'he', action: Action.Exponentiate }),
    ).toEqual(null);
  });
});
