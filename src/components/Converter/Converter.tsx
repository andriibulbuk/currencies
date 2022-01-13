import React, { useState } from 'react';
import { currenciesResponse } from '../../types';

type Props = {
  currencies: currenciesResponse | null,
}

export const Converter: React.FC<Props> = ({ currencies }) => {
  const [amount, setAmount] = useState('1');
  const [convertFrom, setConvertFrom] = useState('EUR');
  const [convertTo, setConvertTo] = useState('UAH');
  const [convertedCurrency, setConvertedCurrency] = useState(0);

  const convertCurrencyHandler = () => {
    if (currencies) {
      const convertFromCurrency = currencies.rates[convertFrom];
      const convertToCurrency = currencies.rates[convertTo];

      setConvertedCurrency(+amount * (convertToCurrency / convertFromCurrency));
    }
  };

  return (
    <div className="Converter card">
      <div className="Converter__form">
        <div className="Converter__form-input control">
          <label htmlFor="amount-input">
            Amount
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
              id="amount-input"
            />
          </label>
        </div>
        <div className="control has-icons-left">
          <label htmlFor="from-select">
            From
            <div className="Converter__form-select select">
              <select
                onChange={(e) => setConvertFrom(e.target.value)}
                id="from-select"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="RUB">RUB</option>
                <option value="PND">PND</option>
              </select>
            </div>
          </label>
          <div className="icon is-small is-left">
            <i className="fas fa-globe" />
          </div>
        </div>
        <div className="control has-icons-left">
          <label htmlFor="to-select">
            To
            <div className="Converter__form-select select">
              <select
                onChange={(e) => setConvertTo(e.target.value)}
                id="to-select"
              >
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="RUB">RUB</option>
                <option value="PND">PND</option>
              </select>
            </div>
          </label>
          <div className="icon is-small is-left">
            <i className="fas fa-globe" />
          </div>
        </div>
      </div>

      <div className="result-box">
        <div className="result-box__result">
          {convertedCurrency}
        </div>
        <button
          type="button"
          onClick={() => convertCurrencyHandler()}
          className="button is-normal"
        >
          Convert
        </button>
      </div>
    </div>
  );
};
