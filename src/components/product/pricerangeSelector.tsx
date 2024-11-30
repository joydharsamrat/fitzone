import { useState, useEffect } from "react";

interface PriceRangeSelectorProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const PriceRangeSelector = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeSelectorProps) => {
  const [minRange, setMinRange] = useState(minPrice || 0);
  const [maxRange, setMaxRange] = useState(maxPrice || 100000);
  const gap = 100;

  useEffect(() => {
    const progress = document.querySelector(".progress") as HTMLElement;
    if (progress) {
      progress.style.left = (minRange / 100000) * 100 + "%";
      progress.style.right = 100 - (maxRange / 100000) * 100 + "%";
    }
  }, [minRange, maxRange]);

  // Debounced  min and max range
  useEffect(() => {
    const timer = setTimeout(() => {
      onMinPriceChange(minRange);
    }, 500);
    return () => clearTimeout(timer); // Clear  timer
  }, [minRange, onMinPriceChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onMaxPriceChange(maxRange);
    }, 500);
    return () => clearTimeout(timer); // Clear timer
  }, [maxRange, onMaxPriceChange]);

  const handleMinChange = (value: number) => {
    if (value + gap <= maxRange) {
      setMinRange(value);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value - gap >= minRange) {
      setMaxRange(value);
    }
  };

  return (
    <div className="price-range-container my-5">
      <h4 className="block text-sm font-medium mb-2">Price</h4>
      <div className="flex justify-between items-center mb-2 text-xs">
        <div className="flex justify-center items-center">
          <p>Min $</p>
          <input
            className="w-14 text-center border-none p-1 rounded font-semibold border"
            type="number"
            value={minRange}
            readOnly
          />
        </div>

        <div className="flex justify-center items-center">
          <p>Max $</p>
          <input
            className="w-14 text-center border-none p-1 rounded font-semibold border"
            type="number"
            value={maxRange}
            readOnly
          />
        </div>
      </div>

      <div className="h-12 flex items-center mx-1.5 px-1.5 rounded border">
        <div className="range-slider flex relative w-full h-1.5 rounded bg-neutral-300">
          <div className="progress"></div>
          <input
            type="range"
            className="min-range cursor-pointer"
            min="0"
            max="100000"
            value={minRange}
            onChange={(e) => handleMinChange(Number(e.target.value))}
          />
          <input
            type="range"
            className="max-range cursor-pointer"
            min="0"
            max="100000"
            value={maxRange}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
