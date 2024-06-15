import React, { useState } from 'react';

const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [cashFlows, setCashFlows] = useState(['', '', '']);
  const [discountRate, setDiscountRate] = useState('');
  const [roiResult, setRoiResult] = useState(null);
  const [piResult, setPiResult] = useState(null);

  const formatNumber = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInvestmentChange = (value) => {
    setInvestment(formatNumber(value));
  };

  const handleCashFlowChange = (index, value) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = formatNumber(value);
    setCashFlows(newCashFlows);
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, '']);
  };

  const removeCashFlow = () => {
    if (cashFlows.length > 1) {
      setCashFlows(cashFlows.slice(0, -1));
    }
  };

  const calculateROI = () => {
    const totalCashFlows = cashFlows.reduce((acc, val) => acc + parseFloat(val.replace(/\./g, '') || 0), 0);
    const roi = ((totalCashFlows - parseFloat(investment.replace(/\./g, ''))) / parseFloat(investment.replace(/\./g, ''))) * 100;
    setRoiResult(roi.toFixed(2));
  };

  const calculatePI = () => {
    const discountRateDecimal = parseFloat(discountRate) / 100;
    const presentValue = cashFlows.reduce((acc, val, index) => {
      const discountedValue = parseFloat(val.replace(/\./g, '')) / Math.pow(1 + discountRateDecimal, index + 1);
      return acc + discountedValue;
    }, 0);
    const pi = presentValue / parseFloat(investment.replace(/\./g, ''));
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
          <input
            type="text"
            value={investment}
            onChange={(e) => handleInvestmentChange(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Discount Rate (%):
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>Cash Flows:</label>
        {cashFlows.map((flow, index) => (
          <div key={index}>
            <label>Year {index + 1}</label>
            <input
              type="text"
              value={flow}
              onChange={(e) => handleCashFlowChange(index, e.target.value)}
            />
          </div>
        ))}
        <div>
          <button onClick={addCashFlow}>Add Cash Flow</button>
          <button onClick={removeCashFlow}>Remove Cash Flow</button>
        </div>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {roiResult !== null && <div>ROI: {roiResult}%</div>}
      {piResult !== null && <div>PI: {piResult}</div>}

      <div>Created by: Muhammad Fadhil Abidin, Robby Nugraha, Tegar Naufal Hanip</div>
    </div>
  );
};

export default InvestmentCalculator;
