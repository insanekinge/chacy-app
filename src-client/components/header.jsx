import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Minimalist header for trading app
class Header extends React.Component {
  render() {
    return (
      <header className="app__header">
        <div className="app__header-brand">Chacy</div>
        <nav className="app__header-nav">
          <Link className="app__btn app__btn--nav" to="/news">Новости</Link>
          <Link className="app__btn app__btn--nav" to="/">Главная</Link>
          <Link className="app__btn app__btn--nav" to="/profile">Профиль</Link>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
