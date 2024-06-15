import React, { useState } from 'react';

const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [cashFlows, setCashFlows] = useState(['', '', '']);
  const [discountRate, setDiscountRate] = useState('');
  const [roiResult, setRoiResult] = useState(null);
  const [piResult, setPiResult] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState(null);

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
    let presentValue = 0;
    let steps = [];

    cashFlows.forEach((val, index) => {
      const discountedValue = parseFloat(val.replace(/\./g, '')) / Math.pow(1 + discountRateDecimal, index + 1);
      presentValue += discountedValue;
      steps.push(`Year ${index + 1}: ${formatNumber(val)} / (1 + ${discountRateDecimal})^${index + 1} = ${formatNumber(discountedValue.toFixed(0))}`);
    });

    const pi = presentValue / parseFloat(investment.replace(/\./g, ''));
    setPiResult(pi.toFixed(2));
    steps.push(`Total Present Value: ${formatNumber(presentValue.toFixed(0))}`);
    steps.push(`PI: ${formatNumber(presentValue.toFixed(0))} / ${investment} = ${pi.toFixed(2)}`);
    setCalculationSteps(steps);
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
          Investment Amount (Rp):
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
        <label>Cash Flows</label>
        {cashFlows.map((flow, index) => (
          <div key={index}>
            <label>Year {index + 1} (Rp):</label>
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
      {calculationSteps !== null && (
        <div>
          <h2>Calculation Steps (PI)</h2>
          <ul>
            {calculationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      <div>Created by: Muhammad Fadhil Abidin (91123089), Robby Nugraha (91123122), Tegar Naufal Hanip (91123131)</div>
    </div>
  );
};

export default InvestmentCalculator;
