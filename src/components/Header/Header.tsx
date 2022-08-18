import React from 'react';
import './Header.scss';
import { Rate } from '../../types/Rate';
import { getRate } from '../../helpers/getRate';
import logo from '../../logo/logo1.png';

type Props = {
  rates: Rate[];
};

export const Header: React.FC<Props> = ({ rates }) => {
  return (
    <div className='Header'>
      <img src={logo} alt='logo' className='Header__logo' />
      <h2 className='Header__title'>Currency converter</h2>
      <div className='Header__rates'>
        <p className='Header__item'>{`USD: ${getRate(rates, 'USD')}`}</p>
        <p className='Header__item'>{`EUR: ${getRate(rates, 'EUR')}`}</p>
        <p className='Header__item'>{`GBP: ${getRate(rates, 'GBP')}`}</p>
      </div>
    </div>
  );
};
