import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Relax Map',
  description: 'Relax Map app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={montserrat.variable}>
         <TanStackProvider>
        <Header />
        {children}
        <Footer />
    </TanStackProvider>
      </body>
    </html>
  );
}
