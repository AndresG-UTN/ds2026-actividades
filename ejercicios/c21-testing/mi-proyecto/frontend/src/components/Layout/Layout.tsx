import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'rgb(221, 230, 231)' }}>
      <Header />
      <main className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: 'rgb(221, 230, 231)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
