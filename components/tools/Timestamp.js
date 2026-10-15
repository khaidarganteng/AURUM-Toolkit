'use client';
import { useEffect, useMemo, useState } from 'react';
import { Row, Notice } from '../ui';

function relative(date) {
  const diff = (date.getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
  const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
  for (const [u, s] of units) if (Math.abs(diff) >= s || u === 'second') return rtf.format(Math.round(diff / s), u);
}

export default function Timestamp() {
  const [ts, setTs] = useState('');
  const [dt, setDt] = useState('');
  useEffect(() => { setTs(String(Math.floor(Date.now() / 1000))); }, []);
  const r = useMemo(() => {
    if (!/^-?\d+$/.test(ts.trim())) return ts ? { error: 'Masukkan angka (detik atau milidetik).' } : null;
    const n = Number(ts.trim());
    const ms = Math.abs(n) > 1e11 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return { error: 'Timestamp di luar rentang.' };
    return {
      unit: Math.abs(n) > 1e11 ? 'milidetik' : 'detik', iso: d.toISOString(), utc: d.toUTCString(),
      local: d.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' }), rel: relative(d),
    };
  }, [ts]);
  const fromDt = dt ? new Date(dt) : null;
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1"><label className="lbl" htmlFor="ts">Unix timestamp → tanggal</label>
            <input id="ts" className="input font-mono" value={ts} onChange={(e) => setTs(e.target.value)} /></div>
          <button type="button" className="ghost self-end" onClick={() => setTs(String(Math.floor(Date.now() / 1000)))}>Sekarang</button>
        </div>
        {r?.error && <Notice>{r.error}</Notice>}
        {r && !r.error && (
          <div className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
            <Row label="Terdeteksi sebagai" value={r.unit} mono={false} />
            <Row label="Waktu lokal" value={r.local} mono={false} />
            <Row label="ISO 8601" value={r.iso} />
            <Row label="UTC" value={r.utc} />
            <Row label="Relatif" value={r.rel} mono={false} />
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div><label className="lbl" htmlFor="dt">Tanggal → Unix timestamp</label>
          <input id="dt" type="datetime-local" className="input [color-scheme:dark]" value={dt} onChange={(e) => setDt(e.target.value)} /></div>
        {fromDt && !isNaN(fromDt) && (
          <div className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
            <Row label="Detik" value={Math.floor(fromDt.getTime() / 1000)} />
            <Row label="Milidetik" value={fromDt.getTime()} />
          </div>
        )}
      </section>
    </div>
  );
}
