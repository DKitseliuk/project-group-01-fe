import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { categoriesOptionsServer } from '@/lib/queries/categoriesServer';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(categoriesOptionsServer.locationTypes),
    queryClient.prefetchQuery(categoriesOptionsServer.regions),
  ]);

  return (
    <html lang="uk">
      <body className={montserrat.variable}>
        <TanStackProvider dehydratedState={dehydrate(queryClient)}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}