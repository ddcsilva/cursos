import { nanoid } from 'nanoid';

export class Transaction {
  readonly id = nanoid();
  readonly date = new Date();

  constructor(
    public readonly type: TransactionType,
    public readonly value: number
  ) {}
}

export enum TransactionType {
  DEPOSIT = 'Depósito	',
  WITHDRAW = 'Saque',
}
