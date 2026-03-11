import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './routes.jsx';
import { TerritoriosContextProvider } from './context/territorios.jsx';
import { EscolasContextProvider } from './context/escolas.jsx';

import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <TerritoriosContextProvider>
          <EscolasContextProvider>
            <Header />
            <MainRoutes />
          </EscolasContextProvider>
        </TerritoriosContextProvider>
      </Router>
    </>
  );
}

export default App;
