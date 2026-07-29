import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './routes.jsx';
import { TerritoriosContextProvider } from './context/territorios.jsx';
import { EscolasContextProvider } from './context/escolas.jsx';

import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <TerritoriosContextProvider>
          <EscolasContextProvider>
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <MainRoutes />
            </main>
          </EscolasContextProvider>
        </TerritoriosContextProvider>
      </Router>
    </div>
  );
}

export default App;
