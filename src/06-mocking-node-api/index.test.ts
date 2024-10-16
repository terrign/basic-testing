import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { join } from 'path';

const cfg = {
  fileContent: 'fileContent',
  fileExists: true,
  filePath: 'filePath',
};

jest.mock('fs', () => ({
  __esModule: true,
  existsSync: () => cfg.fileExists,
}));

jest.mock('fs/promises', () => ({
  __esModule: true,
  readFile: () => cfg.fileContent,
}));

jest.mock('path', () => ({
  __esModule: true,
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', async () => {
    const callback = () => null;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 20_000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 20_000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 20_000);
    jest.advanceTimersByTime(19_000);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1_000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = () => null;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 20_000);
    expect(setInterval).toHaveBeenCalledWith(callback, 20_000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 5_000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    for (let i = 0; i < 10; i++) {
      jest.advanceTimersByTime(interval);
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  const { fileContent, filePath } = cfg;

  afterAll(() => {
    jest.unmock('fs');
    jest.unmock('fs/promises');
    jest.unmock('path');
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(filePath);
    expect(join).toHaveBeenCalledWith(expect.any(String), filePath);
  });

  test('should return null if file does not exist', async () => {
    cfg.fileExists = false;
    const res = await readFileAsynchronously(filePath);
    expect(res).toBe(null);
  });

  test('should return file content if file exists', async () => {
    cfg.fileExists = true;
    const res = await readFileAsynchronously(filePath);
    expect(res).toBe(fileContent);
  });
});
