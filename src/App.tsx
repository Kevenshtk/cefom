import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './routes.tsx';

import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <MainRoutes />
      </Router>
    </>
  );
}

export default App;
