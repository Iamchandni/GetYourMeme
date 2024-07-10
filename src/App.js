import React from 'react';
import Header from "./components/Header"
import Meme from "./components/Meme"
import './App.css';

function App() {
  return (
    <div className="App">
      <Header class="italic hover:not-italic"/>
      <Meme/>
    </div>
  );
}

export default App;
