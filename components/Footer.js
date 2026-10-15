export default function Footer() {
  return (
    <footer className="border-t hair">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-zinc-500 sm:flex-row">
        <span className="font-display tracking-[.25em] text-gold-400">AURUM</span>
        <span>© {new Date().getFullYear()} AURUM Toolkit. Seluruh pemrosesan terjadi di browser kamu.</span>
      </div>
    </footer>
  );
}
