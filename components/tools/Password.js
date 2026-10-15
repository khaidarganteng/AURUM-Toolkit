'use client';
import { useCallback, useEffect, useState } from 'react';
import { CopyButton, Tabs } from '../ui';

const SETS = { lower: 'abcdefghijklmnopqrstuvwxyz', upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', digits: '0123456789', symbols: '!@#$%^&*()-_=+[]{};:,.?' };
const AMBIG = /[Il1O0o]/g;

function rand(n) {
  const max = Math.floor(0xffffffff / n) * n; const a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= max);
  return a[0] % n;
}
function level(bits) {
  if (bits < 40) return ['Lemah', 'bg-red-500', 25];
  if (bits < 60) return ['Sedang', 'bg-amber-500', 50];
  if (bits < 80) return ['Kuat', 'bg-lime-500', 75];
  return ['Sangat kuat', 'bg-emerald-400', 100];
}
function Meter({ bits }) {
  const [l, c, w] = level(bits);
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full transition-all ${c}`} style={{ width: `${w}%` }} /></div>
      <div className="mt-2 flex justify-between text-xs text-zinc-400"><span>{l}</span><span>≈ {Math.round(bits)} bit entropi</span></div>
    </div>
  );
}

export default function Password() {
  const [mode, setMode] = useState('gen');
  const [len, setLen] = useState(20);
  const [opt, setOpt] = useState({ lower: true, upper: true, digits: true, symbols: true, noAmbig: false });
  const [pw, setPw] = useState('');
  const [own, setOwn] = useState('');

  const gen = useCallback(() => {
    const keys = ['lower', 'upper', 'digits', 'symbols'].filter((k) => opt[k]);
    if (!keys.length) { setPw(''); return; }
    const clean = (s) => (opt.noAmbig ? s.replace(AMBIG, '') : s);
    const pools = keys.map((k) => clean(SETS[k]));
    const all = pools.join('');
    const out = pools.map((p) => p[rand(p.length)]);
    while (out.length < len) out.push(all[rand(all.length)]);
    for (let i = out.length - 1; i > 0; i--) { const j = rand(i + 1); [out[i], out[j]] = [out[j], out[i]]; }
    setPw(out.slice(0, len).join(''));
  }, [len, opt]);
  useEffect(() => { gen(); }, [gen]);

  const poolSize = ['lower', 'upper', 'digits', 'symbols'].reduce((s, k) => s + (opt[k] ? (opt.noAmbig ? SETS[k].replace(AMBIG, '').length : SETS[k].length) : 0), 0);
  const bits = poolSize ? len * Math.log2(poolSize) : 0;
  const ownPool = (/[a-z]/.test(own) ? 26 : 0) + (/[A-Z]/.test(own) ? 26 : 0) + (/\d/.test(own) ? 10 : 0) + (/[^A-Za-z0-9]/.test(own) ? 33 : 0);
  const ownBits = ownPool ? own.length * Math.log2(ownPool) : 0;

  return (
    <div className="space-y-6">
      <Tabs value={mode} onChange={setMode} options={[['gen', 'Buat password'], ['check', 'Cek kekuatan']]} />
      {mode === 'gen' ? (
        <>
          <div className="rounded-2xl border border-gold-500/25 bg-ink-900/70 p-5">
            <div className="break-all font-mono text-xl text-gold-100">{pw || 'Pilih minimal satu jenis karakter'}</div>
            <div className="mt-4 flex gap-2"><CopyButton text={pw} label="Salin password" /><button type="button" className="ghost !px-3 !py-1 text-xs" onClick={gen}>↻ Buat ulang</button></div>
          </div>
          <Meter bits={bits} />
          <div>
            <label className="lbl" htmlFor="len">Panjang: {len} karakter</label>
            <input id="len" type="range" min="8" max="64" value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-[#c9a14a]" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[['lower', 'Huruf kecil'], ['upper', 'Huruf besar'], ['digits', 'Angka'], ['symbols', 'Simbol'], ['noAmbig', 'Hindari mirip (Il1O0)']].map(([k, l]) => (
              <label key={k} className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm">
                <input type="checkbox" checked={opt[k]} onChange={(e) => setOpt({ ...opt, [k]: e.target.checked })} className="accent-[#c9a14a]" />{l}
              </label>
            ))}
          </div>
        </>
      ) : (
        <>
          <div><label className="lbl" htmlFor="own">Ketik password untuk dicek</label>
            <input id="own" className="input font-mono" value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Diproses lokal, tidak dikirim ke mana pun" /></div>
          {own ? <Meter bits={ownBits} /> : null}
          <p className="text-xs text-zinc-500">Ini perkiraan berdasarkan panjang dan variasi karakter. Hindari kata umum, nama, atau tanggal lahir meski skornya tinggi.</p>
        </>
      )}
    </div>
  );
}
