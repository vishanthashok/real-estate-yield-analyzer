"use client"
import { useState } from "react"

export default function Home() {
  const [price, setPrice] = useState(500000)
  const [rent, setRent] = useState(3500)
  const [taxes, setTaxes] = useState(8000)
  const [vacancy, setVacancy] = useState(0.05)
  const [ltv, setLtv] = useState(0.75)
  const [rate, setRate] = useState(0.06)
  const [hold] = useState(5)
  const [exitCap, setExitCap] = useState(0.065)

  const loan = price * ltv
  const equity = price - loan

  const noi = rent * 12 * (1 - vacancy) - taxes
  const capRate = noi / price

  const annualDebt = loan * rate
  const dscr = noi / annualDebt

  // Simple Levered IRR (5-year hold)
  const annualCashFlow = noi - annualDebt
  const salePrice = noi / exitCap
  const exitEquity = salePrice - loan

  const irr =
    ((annualCashFlow * hold + exitEquity - equity) / equity / hold) * 100

  return (
    <main style={{ fontFamily: "Arial", padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>Real Estate Yield Analyzer</h1>

      <input type="number" value={price} onChange={e => setPrice(+e.target.value)} placeholder="Purchase Price" /><br/><br/>
      <input type="number" value={rent} onChange={e => setRent(+e.target.value)} placeholder="Monthly Rent" /><br/><br/>
      <input type="number" value={taxes} onChange={e => setTaxes(+e.target.value)} placeholder="Annual Taxes" /><br/><br/>
      <input type="number" step="0.01" value={vacancy} onChange={e => setVacancy(+e.target.value)} placeholder="Vacancy Rate" /><br/><br/>
      <input type="number" step="0.01" value={ltv} onChange={e => setLtv(+e.target.value)} placeholder="Loan to Value" /><br/><br/>
      <input type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} placeholder="Interest Rate" /><br/><br/>
      <input type="number" step="0.01" value={exitCap} onChange={e => setExitCap(+e.target.value)} placeholder="Exit Cap Rate" /><br/><br/>

      <hr/>

      <h2>Outputs</h2>
      <p><strong>NOI:</strong> ${noi.toFixed(0)}</p>
      <p><strong>Cap Rate:</strong> {(capRate * 100).toFixed(2)}%</p>
      <p><strong>DSCR:</strong> {dscr.toFixed(2)}</p>
      <p><strong>Estimated Levered IRR:</strong> {irr.toFixed(2)}%</p>
    </main>
  )
}
