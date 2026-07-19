import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { ScrollToTop } from '@components/ScrollToTop';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
