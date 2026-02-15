import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './routes.jsx';
import { TerritoriosContextProvider } from './context/territorios.jsx';

import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <TerritoriosContextProvider>
          <Header />
          <MainRoutes />
        </TerritoriosContextProvider>
      </Router>
    </>
  );
}

export default App;
