import { useState, useEffect, useCallback, createContext } from 'react';

import escolaServices from '../services/escolas';

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

export const EscolasContext = createContext();

export const EscolasContextProvider = ({ children }) => {
  const [escolas, setEscolas] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [escola, setEscola] = useState(null);

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

  const loadEscolas = useCallback(async (pageCurrent) => {
    const result = await escolaServices.get(pageCurrent);

    if (result.success) {
      setEscolas(result.data.content);
      setTotalPages(result.data.totalPages);
    } else {
      showError(result.message);
    }
  }, []);

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

  const buscarEscolaPorId = async (id) => {
    const result = await escolaServices.getById(id);

    if (result.success) {
      setEscola(result.data);
    } else {
      showError(result.message);
    }
  };

  const adicionarEscola = (escola) => {
    return handleAction(
      () => escolaServices.add(escola),
      'Escola cadastrada com sucesso!',
      loadEscolas
    );
  };

  const atualizarEscola = (id, dados) => {
    return handleAction(
      () => escolaServices.put(id, dados),
      'Escola atualizada com sucesso!',
      loadEscolas
    );
  };

  const deletarEscola = (id) => {
    handleAction(
      () => escolaServices.del(id),
      'Escola removida com sucesso!',
      loadEscolas
    );
  };

  useEffect(() => {
    loadEscolas(page);
  }, [page]);

  return (
    <EscolasContext.Provider
      value={{
        escolas,
        escola,
        page,
        setPage,
        totalPages,
        loadEscolas,
        buscarEscolaPorId,
        adicionarEscola,
        atualizarEscola,
        deletarEscola,
      }}
    >
      {children}
    </EscolasContext.Provider>
  );
};
