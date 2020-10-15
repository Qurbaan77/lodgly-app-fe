import getSymbolFromCurrency from 'currency-symbol-map';

const currenciesList = ['ALL', 'EUR', 'AMD', 'AZN', 'BYN', 'BAM', 'BGN', 'HRK', 'CZK', 'DKK', 'GEL', 'HUF',
  'ISK', 'CHF', 'MDL', 'MKD', 'NOK', 'PLN', 'RON', 'RUB', 'RSD', 'SEK', 'TRY', 'UAH', 'GBP'];

currenciesList.forEach((currency, i) => {
  const symbol = getSymbolFromCurrency(currency);
  const currencyWithSymbol = `${symbol} ${currenciesList[i]}`;
  currenciesList[i] = currencyWithSymbol;
});
export default currenciesList;
