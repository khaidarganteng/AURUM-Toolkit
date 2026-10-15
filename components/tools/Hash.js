'use client';
import { useEffect, useState } from 'react';
import { Row, Notice } from '../ui';

const ALGS = [['SHA-1', 'SHA-1'], ['SHA-256', 'SHA-256'], ['SHA-384', 'SHA-384'], ['SHA-512', 'SHA-512']];

export default function Hash() {
  const [text, setText] = useState('AURUM');
  const [res, setRes] = useState({});
  const [err, setErr] = useState('');
  useEffect(() => {
    let live = true;
    (async () => {
      if (!globalThis.crypto?.subtle) { setErr('Fitur ini butuh HTTPS atau localhost.'); return; }
      setErr('');
      const data = new TextEncoder().encode(text);
      const out = {};
      for (const [k, a] of ALGS) {
        const buf = await crypto.subtle.digest(a, data);
        out[k] = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
      }
      if (live) setRes(out);
    })();
    return () => { live = false; };
  }, [text]);
  return (
    <div className="space-y-5">
      <div><label className="lbl" htmlFor="ht">Teks</label><textarea id="ht" rows={4} className="input font-mono" value={text} onChange={(e) => setText(e.target.value)} /></div>
      {err ? <Notice>{err}</Notice> : (
        <div className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
          {ALGS.map(([k]) => <Row key={k} label={k} value={res[k] || '…'} />)}
        </div>
      )}
      <p className="text-xs text-zinc-500">Hash dihitung di browser lewat Web Crypto API. MD5 sengaja tidak disediakan karena sudah tidak aman.</p>
    </div>
  );
}
