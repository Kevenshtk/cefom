import { useState, useEffect } from 'react';

import alert from '../utils/alert';

export const useCrud = (service) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const load = async (pageCurrent) => {
    const result = await service.get(pageCurrent);

    if (result.success) {
      setItems(result.data.content);
      setTotalPages(result.data.totalPages);
    } else {
      alert.error(result.message);
    }
  };

  const getById = async (id) => {
    const result = await service.getById(id);

    if (result.success) {
      setItem(result.data);
    } else {
      alert.error(result.message);
    }
  };

  const handleAction = async (action, msg, onSuccess = load) => {
    const result = await action();

    if (result.success) {
      alert.success(msg);
      if (onSuccess) await onSuccess(page);
      return true;
    } else {
      alert.error(result.message);
      return false;
    }
  };

  const add = (escola) => {
    return handleAction(
      () => service.add(escola),
      'Cadastro realizado com sucesso'
    );
  };

  const update = (id, dados) => {
    return handleAction(
      () => service.put(id, dados),
      'Atualização realizada com sucesso'
    );
  };

  const remove = (id) => {
    handleAction(
      () => service.del(id),
      'Removido com sucesso'
    );
  };

  useEffect(() => {
    load(page);
  }, [page]);

  return {
    items,
    item,
    page,
    totalPages,
    setPage,
    load,
    getById,
    add,
    update,
    remove,
    handleAction
  };
};
