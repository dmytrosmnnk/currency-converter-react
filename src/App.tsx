import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { CurrencyInput } from './components/CurrencyInput';
import './App.scss';
import { Rate } from './types/Rate';
import { getRate } from './helpers/getRate';

const App: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [errorText, setErrorText] = useState<string>('');
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);
  const [currency1, setCurrency1] = useState<string>('UAH');
  const [currency2, setCurrency2] = useState<string>('UAH');
  const [rate1, setRate1] = useState<number | undefined>(1);
  const [rate2, setRate2] = useState<number | undefined>(1);

  useEffect(() => {
    axios
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((response) => {
        setRates(response.data);
        setRates((state) => [
          ...state,
          {
            r030: 1111,
            txt: 'Українська гривня',
            rate: 1,
            cc: 'UAH',
            exchangedate: '01.01.2022',
          },
        ]);
      })
      .catch((error) => {
        setErrorText(`ERROR! ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (rates && currency1) {
      setRate1(getRate(rates, currency1));
    }

    if (rates && currency2) {
      setRate2(getRate(rates, currency2));
    }
  }, [rates, currency1, currency2]);

  const handleAmount1 = (amount: number): void => {
    if (rate1 && rate2) {
      setAmount1(amount);
      setAmount2(+(amount * (rate1 / rate2)).toFixed(2));
    }
  };

    const handleAmount2 = (amount: number): void => {
      if (rate1 && rate2) {
        setAmount2(amount);
        setAmount1(+(amount * (rate2 / rate1)).toFixed(2));
      }
    };

  const handleCurrency1 = (label: string, rate: number): void => {
    if (rate2) {
      setCurrency1(label);
      setAmount2(+(amount1 * (rate / rate2)).toFixed(2));
    }
  };

  const handleCurrency2 = (label: string, rate: number): void => {
    if (rate1) {
      setCurrency2(label);
      setAmount1(+(amount2 * (rate / rate1)).toFixed(2));
    }
  };

  return (
    <div className='App'>
      <header>
        <Header rates={rates} />
      </header>
      <main>
        <div className='App__inputs'>
          <CurrencyInput
            rates={rates}
            amount={amount1}
            currency={currency1}
            handleAmount={handleAmount1}
            handleCurrency={handleCurrency1}
          />
          <CurrencyInput
            rates={rates}
            amount={amount2}
            currency={currency2}
            handleAmount={handleAmount2}
            handleCurrency={handleCurrency2}
          />
        </div>
      </main>

      {errorText && <p className='App__error'>{errorText}</p>}
    </div>
  );
};

export default App;
