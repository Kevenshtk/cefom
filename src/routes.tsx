import { Routes, Route } from 'react-router-dom';

import Inscricao from './pages/inscricao/index.tsx';
import Territorios from './pages/territorios/home/index.tsx';
import Escolas from './pages/escolas/home/index.tsx';

import CadastroTerritorio from './pages/territorios/cadastrar/index.tsx';
import CadastroEscola from './pages/escolas/cadastrar/index.tsx';

import DetalhesTerritorio from './pages/territorios/detalhes/index.tsx';
import DetalhesEscola from './pages/escolas/detalhes/index.tsx';

import {
  AtualizarTerritorio,
  AtualizarBairros,
} from './pages/territorios/atualizar/index.tsx';
import AtualizarEscola from './pages/escolas/atualizar/index.tsx';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/inscricao" element={<Inscricao />} />
      <Route path="/territorios" element={<Territorios />} />
      <Route path="/escolas" element={<Escolas />} />

      <Route path="/territorios/cadastro" element={<CadastroTerritorio />} />
      <Route path="/escolas/cadastro" element={<CadastroEscola />} />
      
      <Route
        path="/territorios/detalhes/:id"
        element={<DetalhesTerritorio />}
      />
      <Route
        path="/escolas/detalhes/:id"
        element={<DetalhesEscola />}
      />

      <Route
        path="/territorios/atualizar/:id"
        element={<AtualizarTerritorio />}
      />
      <Route
        path="/escolas/atualizar/:id"
        element={<AtualizarEscola />}
      />
      <Route
        path="/territorios/atualizar/:id/bairro"
        element={<AtualizarBairros />}
      />
    </Routes>
  );
};

export default MainRoutes;
