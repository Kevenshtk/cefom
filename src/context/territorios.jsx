import { useState, useEffect, createContext } from 'react';

import territorioServices from '../services/territorios';

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [territorio, setTerritorio] = useState({});

  const showSuccess = (msg) => {
    Toast.fire({
      icon: 'success',
      title: msg,
    });
  };

  const showError = (msg) => {
    Toast.fire({
      icon: 'warning',
      title: msg,
    });
  };

  const loadTerritorios = async (pageCurrent) => {
    const result = await territorioServices.get(pageCurrent);

    if (result.success) {
      setTerritorios(result.data.content);
      setTotalPages(result.data.totalPages);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const buscarTerritorioPorId = async (id) => {
    const result = await territorioServices.getById(id);

    if (result.success) {
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

  const handleAction = async (action, msg, onSuccess) => {
    const result = await action();

    if (result.success) {
      showSuccess(msg);
      if (onSuccess) await onSuccess(page);
      return true;
    } else {
      showError(result.message);
      return false;
    }
  };

  const adicionarTerritorio = (territorio) => {
    handleAction(
      () => territorioServices.add(territorio),
      'Território cadastrado com sucesso!',
      loadTerritorios
    );
  };

  const atualizarTerritorio = (id, dados) => {
    handleAction(
      () => territorioServices.put(id, dados),
      'Território atualizado com sucesso!',
      loadTerritorios
    );
  };

  const deletarTerritorio = (id) => {
    handleAction(
      () => territorioServices.del(id),
      'Território removido com sucesso!',
      loadTerritorios
    );
  };

  const adicionarBairro = (id, bairro) => {
    handleAction(
      () => territorioServices.addBairro(id, bairro),
      'Bairro adicionado com sucesso!',
      () => buscarTerritorioPorId(id)
    );
  };

  const deletarBairro = (id, bairro) => {
    handleAction(
      () => territorioServices.delBairro(id, bairro),
      'Bairro removido com sucesso!',
      () => buscarTerritorioPorId(id)
    );
  };

  useEffect(() => {
    loadTerritorios(page);
  }, [page]);

  return (
    <TerritoriosContext.Provider
      value={{
        territorio,
        territorios,
        page,
        setPage,
        totalPages,
        loadTerritorios,
        buscarTerritorioPorId,
        deletarTerritorio,
        adicionarTerritorio,
        atualizarTerritorio,
        adicionarBairro,
        deletarBairro,
      }}
    >
      {children}
    </TerritoriosContext.Provider>
  );
};
