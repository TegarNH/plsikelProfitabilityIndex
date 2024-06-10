import React, { useState } from 'react';

const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [cashFlows, setCashFlows] = useState(['', '', '']);
  const [discountRate, setDiscountRate] = useState('');
  const [roiResult, setRoiResult] = useState(null);
  const [piResult, setPiResult] = useState(null);

  const handleCashFlowChange = (index, value) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const calculateROI = () => {
    const totalCashFlows = cashFlows.reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const roi = ((totalCashFlows - parseFloat(investment)) / parseFloat(investment)) * 100;
    setRoiResult(roi.toFixed(2));
  };

  const calculatePI = () => {
    const discountRateDecimal = parseFloat(discountRate) / 100;
    const presentValue = cashFlows.reduce((acc, val, index) => {
      const discountedValue = parseFloat(val) / Math.pow(1 + discountRateDecimal, index + 1);
      return acc + discountedValue;
    }, 0);
    const pi = presentValue / parseFloat(investment);
    setPiResult(pi.toFixed(2));
  };

  const handleCalculate = () => {
    calculateROI();
    calculatePI();
  };

  return (
    <div>
      <h1>Investment Calculator</h1>
      <div>
        <label>
          Investment Amount:
          <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Discount Rate (%):
          <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Cash Flows:
          {cashFlows.map((flow, index) => (
            <input
              key={index}
              type="number"
              value={flow}
              onChange={(e) => handleCashFlowChange(index, e.target.value)}
            />
          ))}
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {roiResult !== null && <div>ROI: {roiResult}%</div>}
      {piResult !== null && <div>PI: {piResult}</div>}
    </div>
  );
};

export default InvestmentCalculator;
