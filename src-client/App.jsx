import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

// Placeholder pages
const Home = () => (
  <div className="app__page app__page--home">
    <div className="app__card">
      <h2 className="app__title">Торговое приложение с AI-помощником</h2>
      <p className="app__text">Помогает трейдерам улучшать результаты и следовать стратегии.</p>
      <div className="app__grid app__grid--2">
        <div className="app__pill">Контроль риска</div>
        <div className="app__pill">Рутины и напоминания</div>
        <div className="app__pill">Аналитика сделок</div>
        <div className="app__pill">Подсказки от AI</div>
      </div>
    </div>
  </div>
);

const News = () => (
  <div className="app__page app__page--news">
    <div className="app__card">
      <h2 className="app__title">Лента новостей</h2>
      <p className="app__muted">Зона для пула новостей (парсер). Пока заглушка.</p>
      <div className="app__news-pool">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="app__news-card">
            <div className="app__news-badge">NEWS</div>
            <div className="app__news-title">Заголовок новости #{i}</div>
            <div className="app__news-snippet">Короткое описание новости. Текст-заглушка для визуала.</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div className="app__page app__page--profile">
    <div className="app__card">
      <h2 className="app__title">Профиль</h2>
      <p className="app__muted">Страница профиля. Функционал не реализуется на этом этапе.</p>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <main className="app__main">
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
