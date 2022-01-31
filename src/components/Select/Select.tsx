import React, { useState } from 'react';
import './Select.scss';
import classNames from 'classnames';
import CurrencyFlag from 'react-flag-symbol-currency';
import OutsideClickHandler from 'react-outside-click-handler';

type Props = {
  defaultCurrency: string;
  rates: { key: string; id: number; }[];
  setParentState: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<Props> = ({ defaultCurrency, rates, setParentState }) => {
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);

  const handleClick = (key: string) => {
    setParentState(key);
    setCurrentCurrency(key);
    setSelectOpen(!isSelectOpen);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => setSelectOpen(false)}
    >
      <div className="Select">
        <button
          type="button"
          className={classNames('select-button', { 'select-button--active': isSelectOpen })}
          onClick={() => setSelectOpen(!isSelectOpen)}
        >
          <CurrencyFlag
            className="select-button__image"
            currency={currentCurrency.toLowerCase()}
            width="30px"
          />
          {currentCurrency}
          <i className="select-button__arrow" />
        </button>
        {isSelectOpen && (
          <div className="Select__options">
            {rates.map(({ key, id }) => (
              <button
                key={id}
                type="button"
                className="Select__option"
                onClick={() => handleClick(key)}
              >
                <CurrencyFlag
                  className="Select__image"
                  currency={key.toLowerCase()}
                  width="30px"
                />
                <div className="Select__currency">{key}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
