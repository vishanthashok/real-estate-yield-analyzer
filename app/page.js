"use client"
import { useState } from "react"
import NewsTicker from "./components/NewsTicker"

function calculateIRR(cashFlows, guess = 0.1) {
  let x0 = guess
  for (let i = 0; i < 100; i++) {
    let f = 0
    let df = 0
    for (let t = 0; t < cashFlows.length; t++) {
      f += cashFlows[t] / Math.pow(1 + x0, t)
      df -= t * cashFlows[t] / Math.pow(1 + x0, t + 1)
    }
    const x1 = x0 - f / df
    if (Math.abs(x1 - x0) < 1e-6) return x1
    x0 = x1
  }
  return x0
}

export default function Home() {
  const [city, setCity] = useState("Austin")
  const [price, setPrice] = useState(500000)
  const [rent, setRent] = useState(3500)
  const [taxes, setTaxes] = useState(10000)
  const [vacancy, setVacancy] = useState(0.05)
  const [ltv, setLtv] = useState(0.75)
  const [rate, setRate] = useState(0.06)
  const [hold] = useState(5)
  const [exitCap, setExitCap] = useState(0.065)

  const loan = price * ltv
  const equity = price - loan

  const monthlyRate = rate / 12
  const n = 30 * 12
  const mortgage =
    loan *
    (monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)

  const annualDebt = mortgage * 12

  const noi = rent * 12 * (1 - vacancy) - taxes
  const capRate = noi / price
  const dscr = noi / annualDebt
  const annualCashFlow = noi - annualDebt

  const salePrice = noi / exitCap
  const exitEquity = salePrice - loan

  const cashFlows = [-equity]
  for (let i = 1; i <= hold; i++) {
    cashFlows.push(annualCashFlow)
  }
  cashFlows[hold] += exitEquity

  const irr = calculateIRR(cashFlows) * 100

  const presetCity = (c) => {
    setCity(c)
    if (c === "Austin") {
      setTaxes(price * 0.02)
    } else {
      setTaxes(price * 0.015)
    }
  }

  return (
    <>
      <NewsTicker />

      <div className="container">
        <h1 style={{ marginBottom: 30 }}>
          Institutional Real Estate Yield Analyzer
        </h1>

        <div style={{ marginBottom: 20 }}>
          <button onClick={() => presetCity("Austin")}>Austin Preset</button>
          <button onClick={() => presetCity("Chicago")} style={{ marginLeft: 10 }}>
            Chicago Preset
          </button>
        </div>

        <div className="grid">
          <div className="card">
            <h2>Inputs</h2>

            <label>Purchase Price ($)</label>
            <input className="input" type="number" value={price} onChange={e => setPrice(+e.target.value)} />

            <label>Monthly Rent ($)</label>
            <input className="input" type="number" value={rent} onChange={e => setRent(+e.target.value)} />

            <label>Annual Property Taxes ($)</label>
            <input className="input" type="number" value={taxes} onChange={e => setTaxes(+e.target.value)} />

            <label>Vacancy Rate (%)</label>
            <input className="input" type="number" step="0.01" value={vacancy} onChange={e => setVacancy(+e.target.value)} />

            <label>Loan to Value (%)</label>
            <input className="input" type="number" step="0.01" value={ltv} onChange={e => setLtv(+e.target.value)} />

            <label>Interest Rate (%)</label>
            <input className="input" type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} />

            <label>Exit Cap Rate (%)</label>
            <input className="input" type="number" step="0.01" value={exitCap} onChange={e => setExitCap(+e.target.value)} />
          </div>

          <div className="card">
            <h2>Investment Metrics</h2>

            <p>NOI: <span className="metric">${noi.toFixed(0)}</span></p>
            <p>Cap Rate: <span className="metric">{(capRate*100).toFixed(2)}%</span></p>
            <p>DSCR: <span className="metric">{dscr.toFixed(2)}</span></p>
            <p>Annual Cash Flow: <span className="metric">${annualCashFlow.toFixed(0)}</span></p>
            <p>Levered IRR: <span className="metric">{irr.toFixed(2)}%</span></p>
          </div>
        </div>
      </div>
    </>
  )
}
