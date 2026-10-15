'use client';
import { useMemo, useState } from 'react';
import { Row, Notice } from '../ui';

const toIp = (n) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.');
const bin = (n) => [24, 16, 8, 0].map((s) => ((n >>> s) & 255).toString(2).padStart(8, '0')).join('.');

function kind(o) {
  if (o[0] === 10) return 'Private (10.0.0.0/8)';
  if (o[0] === 172 && o[1] >= 16 && o[1] <= 31) return 'Private (172.16.0.0/12)';
  if (o[0] === 192 && o[1] === 168) return 'Private (192.168.0.0/16)';
  if (o[0] === 127) return 'Loopback';
  if (o[0] === 169 && o[1] === 254) return 'Link-local (APIPA)';
  if (o[0] >= 224 && o[0] <= 239) return 'Multicast';
  return 'Public';
}

function calc(input) {
  const m = input.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!m) return { error: 'Format harus seperti 192.168.1.10/24' };
  const o = m.slice(1, 5).map(Number), c = Number(m[5]);
  if (o.some((x) => x > 255) || c > 32) return { error: 'Setiap oktet 0–255 dan prefix 0–32.' };
  const ip = ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0;
  const mask = c === 0 ? 0 : (0xffffffff << (32 - c)) >>> 0;
  const net = (ip & mask) >>> 0;
  const bc = (net | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - c);
  const small = c >= 31;
  return {
    network: toIp(net), broadcast: toIp(bc), mask: toIp(mask), wildcard: toIp(~mask >>> 0), maskBin: bin(mask),
    first: toIp(small ? net : net + 1), last: toIp(small ? bc : bc - 1),
    total: total.toLocaleString('id-ID'), usable: (small ? total : total - 2).toLocaleString('id-ID'), type: kind(o),
  };
}

export default function Subnet() {
  const [v, setV] = useState('192.168.1.10/24');
  const r = useMemo(() => calc(v), [v]);
  return (
    <div className="space-y-5">
      <div><label className="lbl" htmlFor="cidr">Alamat IP / Prefix (CIDR)</label>
        <input id="cidr" className="input font-mono" value={v} onChange={(e) => setV(e.target.value)} placeholder="192.168.1.10/24" /></div>
      {r.error ? <Notice>{r.error}</Notice> : (
        <div className="rounded-2xl border border-white/5 bg-ink-900/60 px-5">
          <Row label="Network" value={r.network} />
          <Row label="Broadcast" value={r.broadcast} />
          <Row label="Subnet mask" value={r.mask} />
          <Row label="Wildcard mask" value={r.wildcard} />
          <Row label="Mask (biner)" value={r.maskBin} />
          <Row label="Host pertama" value={r.first} />
          <Row label="Host terakhir" value={r.last} />
          <Row label="Total alamat" value={r.total} />
          <Row label="Host yang bisa dipakai" value={r.usable} />
          <Row label="Jenis alamat" value={r.type} mono={false} />
        </div>
      )}
    </div>
  );
}
