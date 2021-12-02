import React from "react";

import CartContextProvider from "./context/CartContext";
import Header from "./shared/header/header";
import Details from "./pages/product/details";
import Footer from "./shared/footer/footer";

const App = () => {
  return (
    <CartContextProvider>
      <div className="main-content">
        <Header />
        <Details productId={1} />
      </div>
      <Footer />
    </CartContextProvider>
  );
};

export default App;
