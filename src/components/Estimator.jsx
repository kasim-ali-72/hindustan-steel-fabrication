import { useState, useMemo } from 'react'

const MATERIALS = [
  { key: '202_rf', label: 'SS 202 (running ft)', type: 'length', rate: 1500 },
  { key: '304_rf', label: 'SS 304 (running ft)', type: 'length', rate: 2200 },
  { key: 'any_sqft', label: 'Any Grade (sq.ft)', type: 'area', rate: 1100 },
]

export default function Estimator(){
  const [material, setMaterial] = useState('202_rf')
  const [length, setLength] = useState(10)
  const [width, setWidth] = useState(3)
  const [gst, setGst] = useState(18)
  const [transport, setTransport] = useState(1200)

  const result = useMemo(()=>{
    const m = MATERIALS.find(x=>x.key===material)
    const qty = m.type==='length' ? length : Math.max(1, Math.round(length*width*100)/100)
    const sub = qty * m.rate
    const totalBefore = sub + transport
    const gstAmt = Math.round((totalBefore*gst)/100)
    const grand = Math.round(totalBefore + gstAmt)
    return { qty, rate:m.rate, sub, gstAmt, grand, unit: m.type==='length'?'r.ft':'sq.ft' }
  },[material,length,width,gst,transport])

  const rupee = (n)=> new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n||0)

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400">Material</label>
          <select value={material} onChange={e=>setMaterial(e.target.value)} className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2">
            {MATERIALS.map(m=> <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-400">Length {MATERIALS.find(m=>m.key===material)?.type==='length'?'(running ft)':'(ft)'}</label>
          <input type="number" min="1" value={length} onChange={e=>setLength(parseFloat(e.target.value||'0'))} className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
        </div>
        <div>
          <label className="text-sm text-zinc-400">Width (ft)</label>
          <input type="number" min="1" value={width} onChange={e=>setWidth(parseFloat(e.target.value||'0'))} disabled={MATERIALS.find(m=>m.key===material)?.type==='length'} className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 disabled:opacity-50"/>
        </div>
        <div>
          <label className="text-sm text-zinc-400">Transport (₹)</label>
          <input type="number" min="0" value={transport} onChange={e=>setTransport(parseFloat(e.target.value||'0'))} className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
        </div>
        <div>
          <label className="text-sm text-zinc-400">GST (%)</label>
          <input type="number" min="0" value={gst} onChange={e=>setGst(parseFloat(e.target.value||'0'))} className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
        </div>
      </div>

      <div className="mt-2 p-4 rounded-xl bg-zinc-800/60 flex items-center justify-between">
        <div className="text-zinc-400 text-sm">Grand Total</div>
        <div className="text-2xl font-semibold text-white">{rupee(result.grand)}</div>
      </div>
      <div className="text-xs text-zinc-500">* Final quote after site visit & drawing.</div>
    </div>
  )
}
