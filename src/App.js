import React from 'react';
import logo from './logo.svg';
import {ArticleList} from "./ArticleList";
import './App.css';

function App() {
  const apiUri = `https://api.nytimes.com/svc/news/v3/content/all/world.json?api-key=${process.env.REACT_APP_NYT_KEY}`;
  return (
    <div className="App">
      <header className="App-header">
        NYT World Feed
      </header>
      <section>

        <ArticleList uri={apiUri} />
      </section>
    </div>
  );
}

export default App;
