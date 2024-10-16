import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const axiosGetMock = jest.fn(async () => ({ data: 'data' }));

jest.mock('lodash', () => ({
  __esModule: true,
  throttle: jest.fn(
    (fn: <A extends Array<unknown>, R>(...args: A) => Promise<R>) => fn,
  ),
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => {
      return {
        get: axiosGetMock,
      } as unknown as AxiosInstance;
    }),
  },
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('path');

    expect(axiosGetMock).toHaveBeenCalledWith('path');
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi('path');

    expect(res).toBe('data');
  });
});
