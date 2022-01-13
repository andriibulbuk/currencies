import React, { useState, useEffect } from 'react';
import './App.scss';
// import classNames from 'classnames';

import { Routes, Route, NavLink } from 'react-router-dom';
import { Converter } from '../Converter/Converter';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates';

// import { getCurrencies } from './api';
import { currenciesResponse } from '../../types';
import responseJson from '../../response.json';

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
      <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              to="/convert"
              className="navbar-item is-active"
            >
              Convert
            </NavLink>

            <NavLink
              to="/exchangeCurrencies"
              className="navbar-item is-active"
            >
              Exchange rates
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="App__content">
        <Routes>
          <Route path="convert" element={<Converter currencies={currentCurrencies} />} />
          <Route path="exchangeCurrencies" element={<ExchangeRates currencies={currentCurrencies} />} />
        </Routes>
      </div>

      <footer className="App__footer">
        Footer
      </footer>
    </div>
  );
};

export default App;
