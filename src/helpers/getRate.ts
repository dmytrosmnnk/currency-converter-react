import { Rate } from '../types/Rate';

export const getRate = (rates: Rate[], currency: string) => {
  const item = rates.find((item) => item.cc === currency);
  if (item) {
    return +item.rate.toFixed(2);
  }
};
