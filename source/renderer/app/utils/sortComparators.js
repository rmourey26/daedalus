// @flow
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

export const bigNumberComparator = (
  numberA: BigNumber,
  numberB: BigNumber,
  isAscending: boolean = true
): number => {
  if (numberA.isLessThan(numberB)) {
    return isAscending ? -1 : 1;
  }

  if (numberA.isGreaterThan(numberB)) {
    return isAscending ? 1 : -1;
  }

  return 0;
};

export const stringComparator = (
  stringA: string,
  stringB: string,
  isAscending: boolean = true
): number => {
  if (stringA < stringB) {
    return isAscending ? -1 : 1;
  }

  if (stringA > stringB) {
    return isAscending ? 1 : -1;
  }

  return 0;
};

export const dateComparator = (
  dateA: string,
  dateB: string,
  isAscending: boolean = true
): number => {
  if (dayjs(dateA).unix() < dayjs(dateB).unix()) {
    return isAscending ? -1 : 1;
  }

  if (dayjs(dateA).unix() > dayjs(dateB).unix()) {
    return isAscending ? 1 : -1;
  }

  return 0;
};
