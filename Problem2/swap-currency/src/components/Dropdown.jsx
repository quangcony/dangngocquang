import React, { useEffect, useState } from "react";
import { DropdownIcon } from "../assets/icons";

const Dropdown = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (options && options.length > 0) {
      const selectedItem = options.find((option) => option.value === selected);
      setSelectedOption(selectedItem);
      onSelect(selectedItem);
    }
  }, [options, selected]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
    <div className="flex flex-row relative ml-1 z-10">
      <div
        className="bg-white h-10 flex items-center w-44 px-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <>
            <div className="w-10 h-full border-r-2 mr-2 p-2">
              <img
                src={`./tokens/${selectedOption.image}`}
                alt={selectedOption.label}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="flex-1">{selectedOption.label}</span>
          </>
        ) : (
          <>
            <div className="w-10 h-full border-r-2 mr-2 p-2">
              <img
                src={`./tokens/${selected}.svg`}
                alt={selected}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="flex-1">{selected}</span>
          </>
        )}
        <img
          src={DropdownIcon}
          alt="dropdown"
          className="w-4 h-4 object-contain ml-2"
        />
      </div>
      {isOpen && (
        <div className="max-h-60 overflow-y-auto absolute top-[110%] left-0 bg-white p-4 w-60 z-11">
          <h3 class="text-sm font-light">All cryptocurrencies</h3>
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="flex gap-2 items-center mt-2"
              >
                <img
                  src={`./tokens/${option.image}`}
                  alt={option.label}
                  className="w-6 h-6 object-contain"
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="w-full h-screen bg-black/20 absolute left-0 top-0 z-9" onClick={() => console.log(isOpen)}></div>
    </div>
  );
};

export default Dropdown;
