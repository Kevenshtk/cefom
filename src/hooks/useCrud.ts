import { useState, useEffect, useCallback } from 'react';

import alert from '../utils/alert';

import type {
  CrudService,
  ServiceResponseWithoutData,
} from '../types/context/global.types';
import type { EscolasContextType } from '../types/context/escolas.types';

export const useCrud = <TItems, TItem, TFormData>(
  service: CrudService<TItems, TItem, TFormData>
): EscolasContextType<TItems, TItem, TFormData> => {
  const [items, setItems] = useState<TItems[]>([]);
  const [item, setItem] = useState<TItem | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const load = useCallback(
    async (pageCurrent: number) => {
      const result = await service.get(pageCurrent);

      if (result.success) {
        setItems(result.data.content);
        setTotalPages(result.data.totalPages);
      } else {
        alert.error(result.message);
      }
    },
    [service]
  );

  const getById = async (id: string) => {
    const result = await service.getById(id);

    if (result.success) {
      setItem(result.data);
    } else {
      alert.error(result.message);
    }
  };

  const handleAction = async (
    action: () => Promise<ServiceResponseWithoutData>,
    msg: string,
    onSuccess?: (page: number) => Promise<void>
  ): Promise<boolean> => {
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

  const add = (data: TFormData) => {
    return handleAction(
      () => service.add(data),
      'Cadastro realizado com sucesso',
      () => load(page)
    );
  };

  const update = (id: string, data: TFormData) => {
    return handleAction(
      () => service.put(id, data),
      'Atualização realizada com sucesso',
      () => load(page)
    );
  };

  const remove = (id: number) => {
    return handleAction(
      () => service.del(id),
      'Removido com sucesso',
      () => load(page)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await load(page);
    };

    fetchData();
  }, [page, load]);

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
    handleAction,
  };
};
