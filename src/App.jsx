import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div>
      {!showProductList ? (
        <div className="landing-page">
          <div>
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <AboutUs />
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
