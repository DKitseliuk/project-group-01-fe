import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

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
