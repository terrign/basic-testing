import { generateLinkedList } from './index';

const values = [1, 2, 3, 4, 5, 65, 67, , 123, 5, 2345];
const snapshotObject = {
  next: {
    next: {
      next: {
        next: {
          next: {
            next: {
              next: {
                next: {
                  next: {
                    next: {
                      next: {
                        next: null,
                        value: null,
                      },
                      value: 2345,
                    },
                    value: 5,
                  },
                  value: 123,
                },
                value: null,
              },
              value: 67,
            },
            value: 65,
          },
          value: 5,
        },
        value: 4,
      },
      value: 3,
    },
    value: 2,
  },
  value: 1,
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList(values);

    expect(res).toStrictEqual(snapshotObject);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const res = generateLinkedList(values);

    expect(res).toMatchSnapshot();
  });
});
