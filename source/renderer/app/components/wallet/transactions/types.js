// @flow
import dayjs from 'dayjs';
import { WalletTransaction } from '../../../domains/WalletTransaction';

export class TransactionsGroup {
  date: dayjs.Dayjs;
  transactions: WalletTransaction[];

  constructor(props: { date: dayjs.Dayjs, transactions: WalletTransaction[] }) {
    Object.assign(this, props);
  }
}

export class TransactionInfo {
  tx: WalletTransaction;
  isLastInGroup: boolean;
  isFirstInGroup: boolean;

  constructor(props: {
    tx: WalletTransaction,
    isLastInGroup: boolean,
    isFirstInGroup: boolean,
  }) {
    Object.assign(this, props);
  }
}

export type Row = TransactionsGroup | TransactionInfo;
