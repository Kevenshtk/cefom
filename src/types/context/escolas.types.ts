import type { Dispatch, SetStateAction } from 'react';
import type { ServiceResponseWithoutData } from './global.types';

export interface EscolasContextType<TItems, TItem, TFormData> {
  items: TItems[];
  item: TItem | null;
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  load: (pageCurrent: number) => Promise<void>;
  getById: (id: string) => Promise<void>;
  add: (data: TFormData) => Promise<boolean>;
  update: (id: string, data: TFormData) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  handleAction: (
    action: () => Promise<ServiceResponseWithoutData>,
    msg: string,
    onSuccess?: (page: number) => Promise<void>
  ) => Promise<boolean>;
}
