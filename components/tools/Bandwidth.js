'use client';
import { useMemo, useState } from 'react';
import { Row } from '../ui';

const SIZE = { KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
const SPEED = { Kbps: 1e3, Mbps: 1e6, Gbps: 1e9 };

function fmt(sec) {
  if (!isFinite(sec) || sec <= 0) return '-';
  if (sec < 1) return '< 1 detik';
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60), s = Math.round(sec % 60);
  return [d && `${d} hari`, h && `${h} jam`, m && `${m} menit`, s && `${s} detik`].filter(Boolean).join(' ');
}

export default function Bandwidth() {
  const [size, setSize] = useState('4');
  const [su, setSu] = useState('GB');
  const [speed, setSpeed] = useState('50');
  const [spu, setSpu] = useState('Mbps');
  const [eff, setEff] = useState(90);
  const r = useMemo(() => {
    const bits = parseFloat(size) * SIZE[su] * 8;
    const bps = parseFloat(speed) * SPEED[spu] * (eff / 100);
    return { time: fmt(bits / bps), mbs: isFinite(bps) ? (bps / 8 / 1024 ** 2).toFixed(2) + ' MB/s' : '-' };
  }, [size, su, speed, spu, eff]);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="lbl" htmlFor="sz">Ukuran file</label>
          <div className="flex gap-2"><input id="sz" type="number" min="0" className="input" value={size} onChange={(e) => setSize(e.target.value)} />
            <select className="input !w-28" value={su} onChange={(e) => setSu(e.target.value)}>{Object.keys(SIZE).map((u) => <option key={u}>{u}</option>)}</select></div></div>
        <div><label className="lbl" htmlFor="sp">Kecepatan internet</label>
          <div className="flex gap-2"><input id="sp" type="number" min="0" className="input" value={speed} onChange={(e) => setSpeed(e.target.value)} />
            <select className="input !w-28" value={spu} onChange={(e) => setSpu(e.target.value)}>{Object.keys(SPEED).map((u) => <option key={u}>{u}</option>)}</select></div></div>
      </div>
      <div><label className="lbl" htmlFor="ef">Efisiensi jaringan: {eff}%</label>
        <input id="ef" type="range" min="40" max="100" value={eff} onChange={(e) => setEff(+e.target.value)} className="w-full accent-[#c9a14a]" />
        <p className="mt-1 text-xs text-zinc-500">Di dunia nyata kecepatan jarang mencapai 100% karena overhead jaringan.</p></div>
      <div className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
        <Row label="Estimasi waktu unduh" value={r.time} mono={false} />
        <Row label="Kecepatan efektif" value={r.mbs} />
      </div>
    </div>
  );
}
