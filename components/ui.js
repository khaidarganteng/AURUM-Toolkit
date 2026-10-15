'use client';
import { useState } from 'react';

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
}

export function CopyButton({ text, label = 'Salin' }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" disabled={!text} className="ghost !px-3 !py-1 text-xs disabled:opacity-40"
      onClick={async () => { await copyText(text); setOk(true); setTimeout(() => setOk(false), 1400); }}>
      {ok ? '✓ Tersalin' : label}
    </button>
  );
}

export function Row({ label, value, mono = true }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-3 last:border-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="flex min-w-0 items-center gap-3">
        <span className={`truncate text-right text-sm text-white ${mono ? 'font-mono' : ''}`}>{value}</span>
        <CopyButton text={String(value)} />
      </span>
    </div>
  );
}

export function Notice({ children, tone = 'error' }) {
  const c = tone === 'error' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  return <div className={`rounded-xl border px-4 py-3 text-sm ${c}`}>{children}</div>;
}

export function Tabs({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-full border border-gold-500/25 bg-ink-900/70 p-1">
      {options.map(([v, l]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`rounded-full px-4 py-1.5 text-sm transition ${value === v ? 'bg-gradient-to-b from-gold-300 to-gold-500 font-semibold text-ink-950' : 'text-zinc-400 hover:text-white'}`}>{l}</button>
      ))}
    </div>
  );
}
