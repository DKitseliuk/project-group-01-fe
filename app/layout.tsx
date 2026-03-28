import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
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
          <div className="container">{children}</div>
        </TanStackProvider>
      </body>
    </html>
  );
}
