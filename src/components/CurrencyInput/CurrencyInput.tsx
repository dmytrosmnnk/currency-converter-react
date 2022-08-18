import React from 'react';
import './CurrencyInput.scss';
import { Rate } from '../../types/Rate';

type Props = {
  rates: Rate[];
  amount: number;
  currency: string;
  handleAmount: (amount: number) => void;
  handleCurrency: (label: string, rate: number) => void;
};

export const CurrencyInput: React.FC<Props> = ({
  rates,
  amount,
  currency,
  handleAmount,
  handleCurrency,
}) => {
  return (
    <div className='CurrencyInput'>
      <input
        className='CurrencyInput__input'
        type='text'
        value={amount}
        onChange={(e) => handleAmount(+e.target.value.replace(/\D/g, ''))}
      />
      <select
        className='CurrencyInput__select'
        value={currency}
        onChange={(e) => {
          if (e.target.selectedOptions[0].dataset.rate) {
            return handleCurrency(
              e.target.value,
              +e.target.selectedOptions[0].dataset.rate
            );
          }
        }}
      >
        {rates.map((item) => (
          <option key={item.cc} value={item.cc} data-rate={item.rate}>
            {`${item.cc} - ${item.txt}`}
          </option>
        ))}
      </select>
    </div>
  );
};
