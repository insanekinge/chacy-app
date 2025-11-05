import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Placeholder pages
const Home = () => (
  <div className="tr-page tr-page--home">
    <div className="tr-card">
      <h2 className="tr-title">Торговое приложение с AI-помощником</h2>
      <p className="tr-text">Помогает трейдерам улучшать результаты и следовать стратегии.</p>
      <div className="tr-grid tr-grid--2">
        <div className="tr-pill">Контроль риска</div>
        <div className="tr-pill">Рутины и напоминания</div>
        <div className="tr-pill">Аналитика сделок</div>
        <div className="tr-pill">Подсказки от AI</div>
      </div>
    </div>
  </div>
);

const News = () => (
  <div className="tr-page tr-page--news">
    <div className="tr-card">
      <h2 className="tr-title">Лента новостей</h2>
      <p className="tr-muted">Зона для пула новостей (парсер). Пока заглушка.</p>
      <div className="tr-news-pool">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="tr-news-card">
            <div className="tr-news-badge">NEWS</div>
            <div className="tr-news-title">Заголовок новости #{i}</div>
            <div className="tr-news-snippet">Короткое описание новости. Текст-заглушка для визуала.</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div className="tr-page tr-page--profile">
    <div className="tr-card">
      <h2 className="tr-title">Профиль</h2>
      <p className="tr-muted">Страница профиля. Функционал не реализуется на этом этапе.</p>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className="tr-app">
      <Header />
      <main className="tr-main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/news" component={News} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
