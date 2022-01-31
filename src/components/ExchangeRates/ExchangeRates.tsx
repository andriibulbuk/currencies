import React, { useMemo } from 'react';
import CurrencyFlag, { CurrencySymbol } from 'react-flag-symbol-currency';
import { currenciesResponse } from '../../types';

type Props = {
  currencies: currenciesResponse | null,
}

type Currency = {
  currency: string,
  value: number,
  id: number
}

export const ExchangeRates: React.FC<Props> = ({ currencies }) => {
  const currenciesToShow = useMemo(() => {
    const currenciesObjectModel: any[] | Currency[] = [];

    if (currencies) {
      Object.keys(currencies.rates).forEach((key, i) => {
        const currencyRate = `${currencies.rates[key]}`.slice(0, 8);
        const newCurrency = {
          currency: key,
          value: +currencyRate,
          id: i + 1,
        };
        currenciesObjectModel.push(newCurrency);
      });
    }

    return currenciesObjectModel;
  }, [currencies]);

  return (
    <div className="ExchangeRates">
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {currenciesToShow && currenciesToShow.map(({ currency, value, id }) => (
            <tr key={id}>
              <td className="table__currency">
                <CurrencyFlag
                  currency={currency.toLowerCase()}
                  width="30px"
                  className="flag"
                />
                {currency}
              </td>
              <td>
                <div className="table__value">
                  <span><CurrencySymbol currency={currency} /></span>
                  <span>{value}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
