import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Toolkit from '@/components/Toolkit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Toolkit />
      </main>
      <Footer />
    </>
  );
}
