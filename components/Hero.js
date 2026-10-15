export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-20 text-center">
      <span className="chip">✦ 8 alat · 100% berjalan di browser</span>
      <h1 className="mx-auto mt-6 max-w-3xl text-5xl leading-[1.08] text-white md:text-7xl">
        Perangkat IT <span className="gold-text">berkelas</span>, dalam satu tempat.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
        Hitung subnet, buat password kuat, rapikan JSON, dan banyak lagi. Data kamu diproses langsung di perangkat dan tidak pernah dikirim ke server.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href="#alat" className="btn-gold">Mulai sekarang</a>
        <a href="#privasi" className="ghost">Kenapa aman?</a>
      </div>
      <div id="privasi" className="mx-auto mt-14 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        {[['Privat', 'Tidak ada data yang dikirim keluar dari browser.'], ['Cepat', 'Hasil muncul seketika, tanpa loading.'], ['Gratis', 'Tanpa akun, tanpa iklan, tanpa langganan.']].map(([t, d]) => (
          <div key={t} className="panel p-5"><h3 className="text-lg text-gold-200">{t}</h3><p className="mt-1 text-sm text-zinc-400">{d}</p></div>
        ))}
      </div>
    </section>
  );
}
