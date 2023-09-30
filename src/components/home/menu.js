
import "./App.css";
import { useEffect, useState } from "react";

export default function StateCheck() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [CurrencyTo, setCurrencyTo] = useState("USD");
  const [result, setResult] = useState(0);

  const countries = [
    "Select Country",
    "USD",
    "JPY",
    "BGN",
    "CZK",
    "DKK",
    "GBP",
    "HUF",
    "PLN",
    "RON",
    "SEK",
    "CHF",
    "ISK",
    "NOK",
    "TRY",
    "AUD",
    "BRL",
    "CAD",
    "CNY",
    "HKD",
    "IDR",
    "ILS",
    "INR",
    "KRW",
    "MXN",
    "MYR",
    "NZD",
    "PHP",
    "SGD",
    "THB",
    "ZAR",
  ];

  const controller = new AbortController();

  useEffect(() => {
    async function apiCall() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputText}&from=${currencyFrom}&to=${CurrencyTo}`,
          { signal: controller.signal }
        );

        const res = await response.json();
        const values = Object.values(res.rates);
        setResult(values[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    inputText && apiCall();
    return function () {
      controller.abort();
    };
  }, [inputText, currencyFrom, CurrencyTo]);


  return (
    <>
      <div className="mainContainer">
        <div className="container">
          <div className="inputArea">
            <input
              type="number"
              placeholder="Enter Your Money "
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <select
              className="btn"
              onChange={(e) => setCurrencyFrom(e.target.value)}
            >
              {countries.map((x, i) => (
                <option key={i}>{x}</option>
              ))}
            </select>
            <h1 className="To">TO</h1>
            <select
              className="btn"
              onChange={(e) => setCurrencyTo(e.target.value)}
            >
              {countries.map((x, i) => (
                <option key={i}>{x}</option>
              ))}
            </select>
          </div>
          <div className="resutlArea">
            <h1>
              {inputText === 0 ? (
                0
              ) : currencyFrom === CurrencyTo ? (
                <div>{inputText}</div>
              ) : isLoading === true ? (
                <div className="loading">Loading......</div>
              ) : (
                <div>
                  {result} {CurrencyTo}
                </div>
              )}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
