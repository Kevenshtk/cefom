import { Routes, Route } from 'react-router-dom';

import Inscricao from './pages/inscricao';
import Territorios from './pages/territorios/home';
import CadastroTerritorio from './pages/territorios/cadastrar';
import DetalhesTerritorio from './pages/territorios/detalhes';
import {AtualizarTerritorio, AtualizarBairros} from './pages/territorios/atualizar';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/inscricao" element={<Inscricao />} />
        <Route path="/territorios" element={<Territorios />} />
        <Route path="/territorios/cadastro" element={<CadastroTerritorio />} />
        <Route
          path="/territorios/detalhes/:id"
          element={<DetalhesTerritorio />}
        />
        <Route
          path="/territorios/atualizar/:id"
          element={<AtualizarTerritorio />}
        />
        <Route
          path="/territorios/atualizar/bairro/:id"
          element={<AtualizarBairros />}
        />
    </Routes>
  );
};

export default MainRoutes;
