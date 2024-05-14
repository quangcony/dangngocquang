import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [tokens, setTokens] = useState([]);

  // Get tokens price
  useEffect(() => {
    fetch('https://interview.switcheo.com/prices.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTokens(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${amount}`);
  };

  if(tokens && tokens.length <= 0) {
    return <h1>Can't get tokens price infomation</h1>
  }

  return (
    <div className="max-w-[620px] mx-auto mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 w-full bg-gray-400 rounded-3xl px-6 py-12"
      >
        <h5 className="text-3xl font-black">Swap</h5>
        <label className="text-lg">
          <span className="w-44 inline-block">Amount to send</span>
          <input
            className="ml-4 black pl-3 py-1 outline-none h-10"
            type="number"
            name="input-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            id="input-tokens"
            class="ml-0.5 h-10 text-white text-sm focus:ring-blue-500 p-2.5 bg-gray-700"
          >
            
            {
              tokens.map((token, i) => (
                <option key={i} value={token.currency} selected = {token.currency === 'LUNA'}>{token.currency}</option>
              ))
            }

          </select>
        </label>
        <label className="text-lg">
        <span className="w-44 inline-block">Amount to receive</span>
          <input
            className="ml-4 pl-3 py-1 outline-none h-10"
            type="text"
            name="output-amount"
            readOnly
          />
          <select
            id="output-tokens"
            class="ml-0.5 h-10 text-white text-sm focus:ring-blue-500 p-2.5 bg-gray-700"
          >
            {
              tokens.map((token, i) => (
                <option key={i} value={token.currency} selected = {token.currency === 'ETH'}>{token.currency}</option>
              ))
            }
            
          </select>
        </label>

        <input
          type="submit"
          className="border border-white rounded-3xl text-white text-sm bg-green-500 px-6 py-2"
          value="CONFIRM SWAP"
        />
      </form>
    </div>
  );
};

export default App;
