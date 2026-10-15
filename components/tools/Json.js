'use client';
import { useState } from 'react';
import { CopyButton, Notice } from '../ui';

export default function Json() {
  const [src, setSrc] = useState('{"nama":"AURUM","fitur":["subnet","password","json"],"aktif":true}');
  const [out, setOut] = useState('');
  const [msg, setMsg] = useState(null);
  function run(kind) {
    try {
      const o = JSON.parse(src);
      if (kind === 'format') { setOut(JSON.stringify(o, null, 2)); setMsg({ ok: true, t: 'JSON valid, sudah dirapikan.' }); }
      else if (kind === 'min') { setOut(JSON.stringify(o)); setMsg({ ok: true, t: 'JSON valid, sudah diringkas.' }); }
      else { setMsg({ ok: true, t: 'JSON valid ✓' }); }
    } catch (e) { setOut(''); setMsg({ ok: false, t: 'JSON tidak valid: ' + e.message }); }
  }
  return (
    <div className="space-y-5">
      <div><label className="lbl" htmlFor="js">JSON</label><textarea id="js" rows={8} className="input font-mono" value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} /></div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-gold" onClick={() => run('format')}>Rapikan</button>
        <button type="button" className="ghost" onClick={() => run('min')}>Ringkas</button>
        <button type="button" className="ghost" onClick={() => run('check')}>Validasi</button>
      </div>
      {msg && <Notice tone={msg.ok ? 'ok' : 'error'}>{msg.t}</Notice>}
      {out && (
        <div><div className="mb-1.5 flex items-center justify-between"><span className="lbl !mb-0">Hasil</span><CopyButton text={out} /></div>
          <textarea readOnly rows={10} className="input font-mono text-gold-100" value={out} /></div>
      )}
    </div>
  );
}
