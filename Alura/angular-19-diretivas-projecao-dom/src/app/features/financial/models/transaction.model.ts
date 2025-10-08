import { nanoid } from 'nanoid';

export class Transaction {
  public readonly id = nanoid();

  constructor(
    public readonly name: string,
    public readonly type: TransactionType,
    public readonly value: number,
    public readonly date: Date,
    public readonly account: string
  ) {}
}

export enum TransactionType {
  DEPOSIT = 'Depósito',
  WITHDRAW = 'Saque',
}
