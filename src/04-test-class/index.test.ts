import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const cfg: {
  initialBalance: number;
  fetchBalanceReturn: number | null;
} = {
  initialBalance: 1_000,
  fetchBalanceReturn: 2_000,
};

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    random: () => cfg.fetchBalanceReturn,
  };
});

describe('BankAccount', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    const it = getBankAccount(cfg.initialBalance);
    expect(it.getBalance()).toBe(cfg.initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const it = getBankAccount(cfg.initialBalance);
    expect(() => it.withdraw(2_000)).toThrowError(
      new InsufficientFundsError(cfg.initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(cfg.initialBalance);
    const acc2 = getBankAccount(cfg.initialBalance);
    expect(() => acc1.transfer(2_000, acc2)).toThrowError(
      new InsufficientFundsError(cfg.initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const it = getBankAccount(cfg.initialBalance);

    expect(() => it.transfer(1_000, it)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const it = getBankAccount(cfg.initialBalance);
    const depositAmount = 1_000;
    it.deposit(depositAmount);
    expect(it.getBalance()).toBe(cfg.initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const it = getBankAccount(cfg.initialBalance);
    const withdrawalAmount = 1_000;
    it.withdraw(withdrawalAmount);
    expect(it.getBalance()).toBe(cfg.initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(cfg.initialBalance);
    const acc2 = getBankAccount(cfg.initialBalance);
    const transferAmount = 1_000;
    acc1.transfer(transferAmount, acc2);
    expect(acc1.getBalance()).toBe(cfg.initialBalance - transferAmount);
    expect(acc2.getBalance()).toBe(cfg.initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const it = getBankAccount(cfg.initialBalance);
    const res = await it.fetchBalance();

    expect(typeof res === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const it = getBankAccount(cfg.initialBalance);

    await it.synchronizeBalance();
    expect(it.getBalance()).toBe(cfg.fetchBalanceReturn);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const it = getBankAccount(cfg.initialBalance);
    cfg.fetchBalanceReturn = null;
    expect.assertions(1);
    try {
      await it.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
