import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Minimalist header for trading app
class Header extends React.Component {
  render() {
    return (
      <header className="tr-header">
        <div className="tr-header__brand">Trading AI</div>
        <nav className="tr-header__nav">
          <Link className="tr-btn tr-btn--nav" to="/news">Новости</Link>
          <Link className="tr-btn tr-btn--nav" to="/">Главная</Link>
          <Link className="tr-btn tr-btn--nav" to="/profile">Профиль</Link>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
