import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;