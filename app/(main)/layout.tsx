import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Metadata } from 'next';

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

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
