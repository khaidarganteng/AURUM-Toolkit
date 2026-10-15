import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'AURUM Toolkit — Perangkat IT Premium di Browser',
  description: 'Kalkulator subnet, generator password, JSON formatter, hash, UUID, dan lainnya. Semua berjalan di browser, tanpa mengirim data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
