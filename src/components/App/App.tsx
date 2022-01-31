import React, { useState, useEffect } from 'react';
import './App.scss';
// import classNames from 'classnames';

import { Routes, Route, NavLink } from 'react-router-dom';
import { Converter } from '../Converter/Converter';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates';

// import { getCurrencies } from './api';
import { currenciesResponse } from '../../types';
import responseJson from '../../response.json';
import logoExchange from '../../img/exchange.svg';

const App: React.FC = () => {
  const [currentCurrencies, setCurrentCurrencies] = useState<currenciesResponse | null>(null);

  const fetchCurrencies = async () => {
    try {
      const currenciesFromServer = await responseJson;

      setCurrentCurrencies(currenciesFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar__links">
          <NavLink
            to="/convert"
            className="navbar__item"
          >
            Convert
          </NavLink>

          <NavLink
            to="/exchangeCurrencies"
            className="navbar__item"
          >
            Exchange rates
          </NavLink>
        </div>

        <NavLink
          className="navbar__item navbar__logo"
          to="/exchangeCurrencies"
        >
          <img
            src={logoExchange}
            alt="logo"
            className="logo"
          />
          <div className="currency-flag currency-flag-usd" />
        </NavLink>
      </nav>

      <div className="App__content">
        <Routes>
          <Route path="convert" element={<Converter currencies={currentCurrencies} />} />
          <Route path="exchangeCurrencies" element={<ExchangeRates currencies={currentCurrencies} />} />
        </Routes>
      </div>

      <footer className="App__footer">
        footer
      </footer>
    </div>
  );
};

export default App;
