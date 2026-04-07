import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'modern-normalize/modern-normalize.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { categoriesOptionsServer } from '@/lib/queries/categoriesServer';
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://project-group-01-fe.vercel.app'),
  title: {
    default: 'Relax Map',
    template: '%s | Relax Map',
  },
  description: 'Знайди ідеальне місце для відпочинку в Україні.',
  openGraph: {
    siteName: 'Relax Map',
    locale: 'uk_UA',
    images: [{ url: '/img/banner.webp', width: 1200, height: 630 }],
  },
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
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
