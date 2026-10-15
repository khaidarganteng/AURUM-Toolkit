import Icon from './Icon';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b hair bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-300"><Icon name="gem" /></span>
          <span className="font-display text-xl tracking-[.28em] gold-text">AURUM</span>
          <span className="hidden text-[10px] uppercase tracking-[.3em] text-zinc-500 sm:block">Toolkit</span>
        </a>
        <a href="#alat" className="ghost !py-1.5">Buka alat</a>
      </div>
    </header>
  );
}
