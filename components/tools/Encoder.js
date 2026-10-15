'use client';
import { useMemo, useState } from 'react';
import { CopyButton, Notice, Tabs } from '../ui';

function b64enc(s) { const b = new TextEncoder().encode(s); let bin = ''; b.forEach((x) => (bin += String.fromCharCode(x))); return btoa(bin); }
function b64dec(s) { const bin = atob(s.trim()); return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))); }

export default function Encoder() {
  const [kind, setKind] = useState('base64');
  const [dir, setDir] = useState('encode');
  const [text, setText] = useState('Halo AURUM 👑');
  const r = useMemo(() => {
    try {
      if (kind === 'base64') return { out: dir === 'encode' ? b64enc(text) : b64dec(text) };
      return { out: dir === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text) };
    } catch { return { error: 'Input tidak valid untuk proses ini.' }; }
  }, [kind, dir, text]);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Tabs value={kind} onChange={setKind} options={[['base64', 'Base64'], ['url', 'URL']]} />
        <Tabs value={dir} onChange={setDir} options={[['encode', 'Encode'], ['decode', 'Decode']]} />
      </div>
      <div><label className="lbl" htmlFor="in">Input</label><textarea id="in" rows={5} className="input font-mono" value={text} onChange={(e) => setText(e.target.value)} /></div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="lbl !mb-0">Hasil</span><CopyButton text={r.out || ''} /></div>
        {r.error ? <Notice>{r.error}</Notice> : <textarea readOnly rows={5} className="input font-mono text-gold-100" value={r.out} />}
      </div>
    </div>
  );
}
