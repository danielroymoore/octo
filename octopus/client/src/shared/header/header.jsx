import React from "react";

import Cart from "../../shared/cart/cart";

import logo from "../../assets/logo.svg";

import "./styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img
          className="header__container__logo"
          src={logo}
          alt="octopus energy logo"
        />
        <Cart />
      </div>
    </header>
  );
};

export default Header;
