'use client';
import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import Subnet from './tools/Subnet';
import Password from './tools/Password';
import Encoder from './tools/Encoder';
import Json from './tools/Json';
import Hash from './tools/Hash';
import Uuid from './tools/Uuid';
import Bandwidth from './tools/Bandwidth';
import Timestamp from './tools/Timestamp';

const TOOLS = [
  { id: 'subnet', name: 'Kalkulator Subnet', desc: 'Network, broadcast, mask, dan jumlah host dari notasi CIDR.', icon: 'subnet', C: Subnet },
  { id: 'password', name: 'Password', desc: 'Buat password acak yang kuat dan ukur kekuatannya.', icon: 'password', C: Password },
  { id: 'encoder', name: 'Base64 & URL', desc: 'Encode dan decode teks dengan dukungan Unicode penuh.', icon: 'encode', C: Encoder },
  { id: 'json', name: 'JSON Formatter', desc: 'Rapikan, ringkas, dan validasi JSON dengan pesan error jelas.', icon: 'json', C: Json },
  { id: 'hash', name: 'Hash Generator', desc: 'SHA-1, SHA-256, SHA-384, dan SHA-512 secara langsung.', icon: 'hash', C: Hash },
  { id: 'uuid', name: 'UUID & Token', desc: 'UUID v4 dan token acak heksadesimal yang aman.', icon: 'uuid', C: Uuid },
  { id: 'bandwidth', name: 'Waktu Unduh', desc: 'Hitung estimasi waktu unduh dari ukuran file dan kecepatan.', icon: 'speed', C: Bandwidth },
  { id: 'timestamp', name: 'Unix Timestamp', desc: 'Konversi timestamp dan tanggal dua arah.', icon: 'time', C: Timestamp },
];

export default function Toolkit() {
  const [active, setActive] = useState(TOOLS[0].id);
  const [q, setQ] = useState('');

  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (TOOLS.some((t) => t.id === h)) setActive(h);
  }, []);

  function pick(id) {
    setActive(id);
    window.history.replaceState(null, '', '#' + id);
  }

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? TOOLS.filter((t) => (t.name + ' ' + t.desc).toLowerCase().includes(s)) : TOOLS;
  }, [q]);

  const tool = TOOLS.find((t) => t.id === active) || TOOLS[0];
  const C = tool.C;

  return (
    <section id="alat" className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 lg:grid-cols-[290px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <input className="input" placeholder="Cari alat..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Cari alat" />
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Daftar alat">
          {list.map((t) => (
            <button key={t.id} type="button" onClick={() => pick(t.id)} aria-current={t.id === active}
              className={`flex flex-none items-center gap-3 rounded-2xl border px-4 py-3 text-left transition lg:flex-auto ${t.id === active ? 'border-gold-500/60 bg-gold-500/10 text-white' : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:border-gold-500/30 hover:text-white'}`}>
              <span className={`grid h-9 w-9 flex-none place-items-center rounded-xl ${t.id === active ? 'bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950' : 'bg-white/5 text-gold-400'}`}><Icon name={t.icon} size={18} /></span>
              <span className="whitespace-nowrap text-sm font-medium lg:whitespace-normal">{t.name}</span>
            </button>
          ))}
          {!list.length && <p className="px-2 py-4 text-sm text-zinc-500">Tidak ada alat yang cocok.</p>}
        </nav>
      </aside>

      <div className="panel animate-rise p-6 md:p-9" key={tool.id}>
        <div className="mb-7 flex items-start gap-4 border-b hair pb-6">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl border border-gold-500/40 bg-gold-500/10 text-gold-300"><Icon name={tool.icon} size={24} /></span>
          <div><h2 className="text-3xl text-white">{tool.name}</h2><p className="mt-1 text-zinc-400">{tool.desc}</p></div>
        </div>
        <C />
      </div>
    </section>
  );
}
