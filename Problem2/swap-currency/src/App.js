import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
// import { INCH } from "./assets/tokens";

const App = () => {
  const [amount, setAmount] = useState(0.1);
  const [amountRec, setAmountRec] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [data, setData] = useState([]);
  const [inputToken, setInputToken] = useState(null);
  const [outputToken, setOutputToken] = useState(null);
  const [hasErr, setHasError] = useState(false);

  // Get tokens price
  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTokens(data);
      });
  }, []);

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      const uniqueTokens = tokens.filter(
        (token, i, self) =>
          self.findIndex((m) => m.currency === token.currency) === i
      );
      const newTokens = uniqueTokens.map((token, index) => ({
        key: token.currency + index,
        label: token.currency,
        value: token.currency,
        price: token.price,
        image: token.currency + ".svg",
      }));

      setData(newTokens);
    }
  }, [tokens]);

  const handleSelectInput = (option) => {
    setInputToken(option);
  };

  const handleSelectOutput = (option) => {
    setOutputToken(option);
  };

  const validateInput = (amount) => {
    if (amount <= 0.0000001) {
      setAmount(0);
      setHasError(true);
    } else {
      setAmount(amount);
      setHasError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let exchange = ((inputToken?.price * amount) / outputToken?.price).toFixed(
      8
    );
    setAmountRec(exchange);
  };

  if (data && data.length <= 0) {
    return <h1>Can't get tokens price infomation</h1>;
  }

  return (
    <div className="max-w-[740px] mx-auto mt-4 p-4">
      <div className="w-full bg-gray-400 rounded-3xl px-6 py-12 relative">
        <div
          className="w-20 h-14 absolute top-4 left-4"
          style={{
            background:
              "url(https://www.99tech.co/assets/img/99Tech.png) 50% / cover",
          }}
        ></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 "
        >
          <h2
            className="text-5xl font-black uppercase 
           bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            Swap
          </h2>
          <label className="text-lg flex flex-row items-center mb-4">
            <span className="w-44 inline-block text-white">Amount to send</span>
            <div className="relative ml-4 black h-10 ">
              <input
                className="px-3 py-1 outline-none h-full text-right"
                type="number"
                name="input-amount"
                step={0.1}
                value={amount}
                onChange={(e) => validateInput(e.target.value)}
              />
              {hasErr && (
                <div className="w-full h-6 bg-red-200 text-[12px] text-red-600 flex justify-between items-center p-1">
                  <span>Min amount:</span>
                  <span>0.0000001</span>
                </div>
              )}
            </div>
            <Dropdown
              options={data}
              onSelect={handleSelectInput}
              selected="ETH"
            />
          </label>

          <label className="text-lg flex flex-row items-center">
            <span className="w-44 inline-block text-white">Amount to receive</span>
            <input
              className="ml-4 px-3 py-1 outline-none h-10 text-right"
              type="text"
              name="output-amount"
              value={amountRec}
              readOnly
            />
            <Dropdown
              options={data}
              onSelect={handleSelectOutput}
              selected="USD"
            />
          </label>

          <input
            type="submit"
            className="border border-white rounded-3xl text-white text-sm bg-green-500 px-8 py-2 cursor-pointer mt-2"
            value="CONFIRM SWAP"
          />
        </form>
      </div>
    </div>
  );
};

export default App;
