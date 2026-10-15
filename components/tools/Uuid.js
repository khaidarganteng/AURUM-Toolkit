'use client';
import { useCallback, useEffect, useState } from 'react';
import { CopyButton } from '../ui';

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16)); b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
const token = (n) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (x) => x.toString(16).padStart(2, '0')).join('');

export default function Uuid() {
  const [count, setCount] = useState(5);
  const [bytes, setBytes] = useState(32);
  const [ids, setIds] = useState([]);
  const [tok, setTok] = useState('');
  const genIds = useCallback(() => setIds(Array.from({ length: count }, uuid)), [count]);
  const genTok = useCallback(() => setTok(token(bytes)), [bytes]);
  useEffect(() => { genIds(); }, [genIds]);
  useEffect(() => { genTok(); }, [genTok]);
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><label className="lbl" htmlFor="cnt">UUID v4</label>
            <select id="cnt" className="input !w-auto" value={count} onChange={(e) => setCount(+e.target.value)}>{[1, 5, 10, 20].map((n) => <option key={n} value={n}>{n} buah</option>)}</select></div>
          <div className="flex gap-2"><button type="button" className="ghost" onClick={genIds}>↻ Buat ulang</button><CopyButton text={ids.join('\n')} label="Salin semua" /></div>
        </div>
        <ul className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
          {ids.map((id) => <li key={id} className="flex items-center justify-between gap-3 border-b border-white/5 py-2.5 last:border-0"><span className="truncate font-mono text-sm text-white">{id}</span><CopyButton text={id} /></li>)}
        </ul>
      </section>
      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><label className="lbl" htmlFor="byt">Token acak (hex)</label>
            <select id="byt" className="input !w-auto" value={bytes} onChange={(e) => setBytes(+e.target.value)}>{[16, 24, 32, 64].map((n) => <option key={n} value={n}>{n} byte ({n * 2} karakter)</option>)}</select></div>
          <div className="flex gap-2"><button type="button" className="ghost" onClick={genTok}>↻ Buat ulang</button><CopyButton text={tok} /></div>
        </div>
        <div className="break-all rounded-2xl border border-gold-500/25 bg-ink-900/70 p-5 font-mono text-sm text-gold-100">{tok}</div>
      </section>
    </div>
  );
}
