import { Routes, Route } from 'react-router-dom';

import Inscricao from './pages/inscricao';
import Territorios from './pages/territorios';

const MainRoutes = () => {
    return(
        <Routes>
            <Route path="/inscricao" element={<Inscricao />} />
            <Route path="/territorios" element={<Territorios />} />
        </Routes>
    );
};

export default MainRoutes;
