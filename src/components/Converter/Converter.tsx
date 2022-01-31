import React, { useState, useEffect } from 'react';
import { CurrencySymbol } from 'react-flag-symbol-currency';
import classNames from 'classnames';
import { Select } from '../Select/Select';

import { currenciesResponse } from '../../types';

type Props = {
  currencies: currenciesResponse | null,
}

export const Converter: React.FC<Props> = ({ currencies }) => {
  const [amount, setAmount] = useState('');
  const [resultAmount, setResultAmount] = useState('');
  const [isAmountValid, setAmountValid] = useState(true);
  const [convertFrom, setConvertFrom] = useState('EUR');
  const [convertTo, setConvertTo] = useState('USD');
  const [convertedCurrency, setConvertedCurrency] = useState(0);

  const exchangeCurrency = () => {
    if (currencies && isAmountValid) {
      const convertFromCurrency = currencies.rates[convertFrom];
      const convertToCurrency = currencies.rates[convertTo];

      setResultAmount(amount);
      setConvertedCurrency(+amount * (convertToCurrency / convertFromCurrency));
    }
  };

  const getRatesKeys = (curr: currenciesResponse) => {
    const selectProps = Object.keys(curr.rates).map((key, index) => (
      { key, id: index }
    ));

    return selectProps;
  };

  const amountValidChecker = () => {
    if (!amount || Number.isNaN(+amount)) {
      setAmountValid(false);
    } else {
      setAmountValid(true);
    }
  };

  useEffect(() => {
    exchangeCurrency();
  }, [convertFrom, convertTo]);

  return (
    <div className="Converter card">
      <div className="Converter__form">
        <label htmlFor="amount-input">
          Amount
          <div className="Converter__form-input control has-icons-left">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => amountValidChecker()}
              placeholder="amount"
              className={classNames('input', { 'is-danger': !isAmountValid })}
              id="amount-input"
            />
            <span className="icon is-small is-left">
              <CurrencySymbol currency={convertFrom} />
            </span>
          </div>
          {isAmountValid || (
            <div className="warning">
              Enter a valid amount
            </div>
          )}
        </label>
        <div>
          From
          {currencies && (
            <Select
              defaultCurrency="EUR"
              rates={getRatesKeys(currencies)}
              setParentState={setConvertFrom}
            />
          )}
        </div>
        <div>
          To
          {currencies && (
            <Select
              defaultCurrency="USD"
              rates={getRatesKeys(currencies)}
              setParentState={setConvertTo}
            />
          )}
        </div>
      </div>
      <div className="result-box">
        <div className="result-box__result">
          {resultAmount && (
            <>
              <div className="result-box__currency">
                <span><CurrencySymbol currency={convertFrom} /></span>
                <div>
                  <span>{resultAmount}</span>
                </div>
              </div>
              =
              <div className="result-box__currency">
                <span><CurrencySymbol currency={convertTo} /></span>
                <div>
                  <span>{convertedCurrency.toFixed(6).slice(0, -4)}</span>
                  <span className="result-box__currency--gray">{convertedCurrency.toFixed(6).slice(-4)}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => exchangeCurrency()}
          className="button is-normal"
          disabled={!amount || !isAmountValid}
        >
          Convert
        </button>
      </div>
    </div>
  );
};
