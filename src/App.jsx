import React from 'react';
import Content from './components/content/content';
import Footer from './components/footer/footer';
import Header from './components/header/header';

const App = () => {
  return (
    <div className="page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
