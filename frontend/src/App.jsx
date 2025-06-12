import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PredictForm from './components/PredictForm';
import Sobre from './components/Sobre';
import './styles/App.css';

function App() {
  const [page, setPage] = useState('predict');

  return (
    <>
      <Navbar setPage={setPage} page={page} />
      <main className="home">
        {page === 'predict' ? (
          <div className="hero">
            <h1>Bem-vindo ao <strong>PathToVictory</strong></h1>
            <p>Descubra a probabilidade de vitória com base no campeão e posição.</p>
            <PredictForm />
          </div>
        ) : (
          <Sobre />
        )}
      </main>
    </>
  );
}

export default App;
