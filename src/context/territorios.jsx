import { useState, useEffect, createContext } from 'react';

import territirioServices from '../services/territorios';

import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const TerritoriosContext = createContext();

export const TerritoriosContextProvider = ({ children }) => {
  const [territorios, setTerritorios] = useState([]);
  const [territorio, setTerritorio] = useState({});

  const loadTerritorios = async () => {
    const result = await territirioServices.get();

    if (result.status === 200) {
      setTerritorios(result.data);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const buscarTerritorioPorId = async (id) => {
    const result = await territirioServices.getById(id);

    if (result.status === 200) {
      setTerritorio(result.data);
      return true;
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
      return false;
    }
  };

  const adicionarTerritorio = async (territorio) => {
    const result = await territirioServices.add(territorio);

    if (result.status === 201) {
      Toast.fire({
        icon: 'success',
        title: 'Território cadastrado com sucesso!',
      });
      loadTerritorios();

      return true;
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });

      return false;
    }
  };

  const atualizarTerritorio = async (id, dados) => {
    const result = await territirioServices.put(id, dados);

    if (result.status === 200) {
      Toast.fire({
        icon: 'success',
        title: 'Território atualizado com sucesso!',
      });
      loadTerritorios();

      return true;
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });

      return false;
    }
  };

  const deletarTerritorio = async (id) => {
    const result = await territirioServices.del(id);

    if (result.status === 204) {
      Toast.fire({
        icon: 'success',
        title: 'Território removido com sucesso!',
      });
      loadTerritorios();
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  useEffect(() => {
    loadTerritorios();
  }, []);

  return (
    <TerritoriosContext.Provider
      value={{
        territorio,
        territorios,
        loadTerritorios,
        buscarTerritorioPorId,
        deletarTerritorio,
        adicionarTerritorio,
        atualizarTerritorio,
      }}
    >
      {children}
    </TerritoriosContext.Provider>
  );
};
